#!/usr/bin/env node
import { access, readdir, readFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const TAGS = ['技术', '备赛', '生活', '随想'];
const root = process.cwd();
const postsDir = path.join(root, 'src', 'content', 'posts');
const publicDir = path.join(root, 'public');
const imagePattern = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

const isRemote = (value) => /^(https?:|data:|mailto:|#)/i.test(value);
const isWindowsAbsolute = (value) => /^[a-zA-Z]:[\\/]/.test(value) || value.startsWith('\\\\');

const fileExists = async (filePath) => {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    if (entry.isFile() && /\.(md|mdx)$/i.test(entry.name) && !entry.name.startsWith('_')) files.push(full);
  }
  return files;
};

const parseValue = (raw = '') => {
  const value = raw.trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value.startsWith('[') && value.endsWith(']')) {
    return value.slice(1, -1).split(/[，,]/).map((item) => item.trim()).filter(Boolean);
  }
  return value;
};

const parseFrontmatter = (content) => {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: null, body: content };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).replace(/\s+#.*$/, '');
    data[key] = parseValue(value);
  }
  return { data, body: content.slice(match[0].length) };
};

const checkPost = async (filePath) => {
  const rel = path.relative(root, filePath).replace(/\\/g, '/');
  const content = await readFile(filePath, 'utf8');
  const { data, body } = parseFrontmatter(content);
  const errors = [];
  const warnings = [];

  if (!data) {
    errors.push('缺少 frontmatter：文件开头需要 ---');
    return { rel, errors, warnings };
  }

  for (const key of ['title', 'date', 'tag', 'excerpt']) {
    if (!data[key]) errors.push(`缺少必填字段：${key}`);
  }

  if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(String(data.date))) {
    errors.push('date 必须使用 YYYY-MM-DD 格式');
  }

  if (data.tag && !TAGS.includes(String(data.tag))) {
    errors.push(`tag 只能是：${TAGS.join(' / ')}`);
  }

  if ('featured' in data && typeof data.featured !== 'boolean') {
    errors.push('featured 必须是 true 或 false');
  }

  if ('draft' in data && typeof data.draft !== 'boolean') {
    errors.push('draft 必须是 true 或 false');
  }

  if (data.draft === true) {
    warnings.push('仍是草稿：draft: true，不会发布');
  }

  if ('topics' in data && !Array.isArray(data.topics)) {
    errors.push('topics 必须写成数组格式，例如：[期末, 复盘]');
  }

  for (const match of body.matchAll(imagePattern)) {
    const rawSrc = decodeURI(match[1].trim());
    if (!rawSrc || isRemote(rawSrc)) continue;

    if (isWindowsAbsolute(rawSrc)) {
      errors.push(`图片不能使用本机绝对路径：${rawSrc}`);
      continue;
    }

    let imagePath;
    if (rawSrc.startsWith('/')) {
      imagePath = path.join(publicDir, rawSrc.slice(1));
      if (!rawSrc.startsWith('/images/')) {
        warnings.push(`建议把站内图片放在 /images/ 下：${rawSrc}`);
      }
    } else {
      imagePath = path.resolve(path.dirname(filePath), rawSrc);
      warnings.push(`建议使用从 public 开始的绝对路径，例如 /images/posts/...：${rawSrc}`);
    }

    if (!await fileExists(imagePath)) {
      errors.push(`图片文件不存在：${rawSrc}`);
    }
  }

  return { rel, errors, warnings };
};

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: npm run check-posts');
  console.log('Checks Markdown frontmatter, draft state, and local image references.');
  process.exit(0);
}

const posts = await walk(postsDir);
const results = await Promise.all(posts.map(checkPost));
const errors = results.flatMap((result) => result.errors.map((message) => ({ file: result.rel, message })));
const warnings = results.flatMap((result) => result.warnings.map((message) => ({ file: result.rel, message })));

for (const warning of warnings) {
  console.warn(`[warn] ${warning.file}: ${warning.message}`);
}

for (const error of errors) {
  console.error(`[error] ${error.file}: ${error.message}`);
}

if (errors.length > 0) {
  console.error(`\n检查失败：${errors.length} 个错误，${warnings.length} 个警告。`);
  process.exit(1);
}

console.log(`文章检查通过：${posts.length} 篇文章，${warnings.length} 个警告。`);
