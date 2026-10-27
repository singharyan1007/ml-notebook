import { readdirSync } from 'node:fs';
import { join, relative, basename } from 'node:path';

/** Keep simple Obsidian [[note|label]] links usable without a custom app. */
export default function notebookMarkdown({ base = '/' } = {}) {
  const root = join(process.cwd(), 'src/content/docs');
  const routes = new Map();
  function scan(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (/\.mdx?$/.test(file) && !entry.name.startsWith('_')) {
        const route = relative(root, file).replaceAll('\\', '/').replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '');
        const name = basename(file).replace(/\.mdx?$/, '');
        routes.set(route, route);
        routes.set(name, routes.has(name) ? null : route);
      }
    }
  }
  scan(root);
  const prefix = base.replace(/\/$/, '');
  const escape = text => text.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  return function transform(tree, file) {
    function walk(node) {
      if (!Array.isArray(node.children)) return;
      const children = [];
      for (const child of node.children) {
        if (child.type === 'code' && child.lang === 'formula') {
          children.push({ type: 'html', value: `<pre class="formula"><code>${escape(child.value)}</code></pre>` });
        } else if (child.type === 'text' && node.type !== 'link') {
          const pattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
          let cursor = 0, match;
          while ((match = pattern.exec(child.value))) {
            if (match.index > cursor) children.push({ type: 'text', value: child.value.slice(cursor, match.index) });
            const [target, heading] = match[1].replace(/\.md$/, '').split('#');
            const route = routes.get(target);
            if (route === undefined || route === null) file.fail(`Unknown or ambiguous wiki link: ${target}. Use its full content path.`);
            const url = `${prefix}/${route}/`.replace(/\/+/g, '/') + (heading ? '#' + heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : '');
            children.push({ type: 'link', url, children: [{ type: 'text', value: match[2] || target }] });
            cursor = pattern.lastIndex;
          }
          if (cursor < child.value.length) children.push({ type: 'text', value: child.value.slice(cursor) });
          if (cursor === 0 && child.value.length === 0) children.push(child);
        } else { walk(child); children.push(child); }
      }
      node.children = children;
    }
    walk(tree);
  };
}
