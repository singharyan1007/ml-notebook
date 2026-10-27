import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';

const root = resolve('dist');
const [, repo = 'ml-notebook'] = (process.env.GITHUB_REPOSITORY || 'singharyan1007/ml-notebook').split('/');
const owner = (process.env.GITHUB_REPOSITORY || 'singharyan1007/ml-notebook').split('/')[0];
const base = (process.env.SITE_BASE ?? (repo === `${owner}.github.io` ? '/' : `/${repo}/`)).replace(/\/$/, '');
const origin = new URL(process.env.SITE_URL || `https://${owner}.github.io`).origin;
const files=[];
async function walk(dir){for(const item of await readdir(dir,{withFileTypes:true})){const path=join(dir,item.name);if(item.isDirectory())await walk(path);else if(path.endsWith('.html'))files.push(path)}}
await walk(root);
const cache=new Map();
async function exists(path){try{return (await stat(path)).isFile()}catch{return false}}
const errors=[];let checked=0;
for(const file of files){
 const html=(await readFile(file,'utf8')).replace(/<link[^>]+rel="canonical"[^>]*>/g,'');
 if(html.includes('[['))errors.push(`Unresolved wiki link in ${file}`);
 const route=file.slice(root.length).replace(/index\.html$/,'');
 const documentURL=new URL(base+route,origin);
 for(const match of html.matchAll(/\b(href|src)="([^"]+)"/g)){
  const value=match[2].replaceAll('&amp;','&');
  if(/^(data:|mailto:|tel:|javascript:|\/\/)/i.test(value))continue;
  const url=new URL(value,documentURL);
  if(url.origin!==origin)continue;
  if(base&&url.pathname!==base&&!url.pathname.startsWith(base+'/')){errors.push(`Missing base prefix: ${value} in ${file}`);continue}
  const local=decodeURIComponent(url.pathname.slice(base.length));
  let path=resolve(root,'.'+local);
  if(path!==root&&!path.startsWith(root+'/')){errors.push(`Path escapes output: ${value}`);continue}
  if(!await exists(path)){const index=join(path,'index.html');if(await exists(index))path=index;else{errors.push(`Broken internal URL: ${value} in ${file}`);continue}}
  checked++;
  if(match[1]==='href'&&url.hash&&path.endsWith('.html')){
   if(!cache.has(path))cache.set(path,await readFile(path,'utf8'));
   const target=decodeURIComponent(url.hash.slice(1));
   if(!cache.get(path).includes(`id="${target}"`))errors.push(`Missing heading: ${value} in ${file}`);
  }
 }
}
if(errors.length){console.error([...new Set(errors)].join('\n'));process.exit(1)}
console.log(`Checked ${files.length} HTML pages and ${checked} internal links/assets, including base paths and heading fragments.`);
