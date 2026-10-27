import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { unified } from '@astrojs/markdown-remark';
import notebookMarkdown from './plugins/notebook-markdown.mjs';

// The GitHub workflow supplies the real owner and repository automatically.
// These defaults are used for local builds and the proposed project site.
const [owner = 'singharyan1007', repository = 'ml-notebook'] =
  (process.env.GITHUB_REPOSITORY || 'singharyan1007/ml-notebook').split('/');
const base = process.env.SITE_BASE ?? (repository === `${owner}.github.io` ? '/' : `/${repository}/`);

export default defineConfig({
  site: process.env.SITE_URL || `https://${owner}.github.io`,
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  markdown: { processor: unified({ remarkPlugins: [[notebookMarkdown, { base }]] }) },
  integrations: [
    starlight({
      title: 'ML Notebook',
      description: 'Concise machine-learning notes by Aryan Singh.',
      favicon: '/favicon.svg',
      sidebar: [
        { label: 'Start here', slug: '' },
        { label: 'Foundations', items: [{ autogenerate: { directory: 'foundations' } }] },
        { label: 'Neural networks', items: [{ autogenerate: { directory: 'neural-networks' } }] },
      ],
      customCss: ['./src/styles/custom.css'],
      tableOfContents: { minHeadingLevel: 2, maxHeadingLevel: 2 },
      expressiveCode: false,
      credits: true,
      lastUpdated: false,
    }),
  ],
});
