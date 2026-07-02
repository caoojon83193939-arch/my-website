#!/usr/bin/env node
import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const TAGS = ['技术', '备赛', '生活', '随想'];
const postsDir = path.join(process.cwd(), 'src', 'content', 'posts');

const today = () => {
  const date = new Date();
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const slugify = (value) => value
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 60);

const exists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const uniqueSlug = async (base) => {
  let slug = base;
  let index = 2;
  while (await exists(path.join(postsDir, `${slug}.md`))) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
};

const ask = async (rl, label, fallback = '') => {
  const suffix = fallback ? ` (${fallback})` : '';
  const answer = (await rl.question(`${label}${suffix}: `)).trim();
  return answer || fallback;
};

const formatList = (raw) => raw
  .split(/[，,]/)
  .map((item) => item.trim())
  .filter(Boolean);

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: npm run new-post');
  console.log('Interactively creates a Markdown post in src/content/posts/.');
  process.exit(0);
}

await mkdir(postsDir, { recursive: true });

const rl = createInterface({ input, output });
try {
  const title = await ask(rl, '标题');
  if (!title) throw new Error('标题不能为空');

  const date = await ask(rl, '日期 YYYY-MM-DD', today());
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error('日期必须是 YYYY-MM-DD 格式');

  const tagInput = await ask(rl, `分类 ${TAGS.join('/')}`, '生活');
  if (!TAGS.includes(tagInput)) throw new Error(`分类只能是：${TAGS.join(' / ')}`);

  const series = await ask(rl, '系列，可留空');
  const topics = formatList(await ask(rl, '主题，可留空，用逗号分隔'));
  const excerpt = await ask(rl, '摘要', title);

  const fallbackSlug = slugify(title) || `${date}-post`;
  const slugInput = await ask(rl, '文件名 slug', fallbackSlug);
  const slug = await uniqueSlug(slugify(slugInput) || fallbackSlug);
  const filePath = path.join(postsDir, `${slug}.md`);

  const frontmatter = [
    '---',
    `title: ${title}`,
    `date: ${date}`,
    `tag: ${tagInput}`,
    series ? `series: ${series}` : null,
    topics.length ? `topics: [${topics.join(', ')}]` : null,
    `excerpt: ${excerpt}`,
    'featured: false',
    'draft: true',
    '---',
  ].filter(Boolean).join('\n');

  const body = `${frontmatter}\n\n这里开始写正文。\n\n## 小标题\n\n继续写内容。\n`;
  await writeFile(filePath, body, { encoding: 'utf8', flag: 'wx' });

  console.log(`\n已创建：${path.relative(process.cwd(), filePath)}`);
  console.log('写完后把 draft: true 改成 draft: false，再运行 npm run build。');
} finally {
  rl.close();
}
