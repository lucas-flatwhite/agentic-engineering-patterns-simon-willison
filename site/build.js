#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { Marked } = require('marked');
const hljs = require('highlight.js');

// ── Config ──────────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const TOC_PATH = path.join(ROOT, 'toc.yml');
const DOCS_DIR = path.join(ROOT, 'docs');
const TEMPLATE_DIR = path.join(__dirname, 'templates');
const ASSETS_DIR = path.join(__dirname, 'assets');
const OUT_DIR = path.join(ROOT, '_site');

const LANG_LABELS = { en: 'English', ko: '한국어' };
const LANG_HOME_TITLE = { en: 'Table of Contents', ko: '목차' };
const LANG_NAV_PREV = { en: 'Previous', ko: '이전' };
const LANG_NAV_NEXT = { en: 'Next', ko: '다음' };
const LANG_SOURCE = { en: 'Original source', ko: '원문 출처' };
const LANG_INTRO_TITLE = { en: 'Introduction', ko: '소개' };

// ── Markdown setup ──────────────────────────────────────────────────────────
const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
      const highlighted = hljs.highlight(text, { language }).value;
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
    },
    image({ href, title, text }) {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<figure><img src="${href}" alt="${text}" loading="lazy"${titleAttr}><figcaption>${text}</figcaption></figure>`;
    }
  }
});

// ── Helpers ─────────────────────────────────────────────────────────────────
function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readTemplate(name) {
  return fs.readFileSync(path.join(TEMPLATE_DIR, name), 'utf-8');
}

function renderTemplate(template, vars) {
  let result = template;
  for (const [key, value] of Object.entries(vars)) {
    result = result.replaceAll(`{{${key}}}`, value ?? '');
  }
  return result;
}

function slugToUrl(sectionId, chapterId) {
  return `${sectionId}/${chapterId}/`;
}

// ── Load TOC ────────────────────────────────────────────────────────────────
const toc = yaml.load(fs.readFileSync(TOC_PATH, 'utf-8'));

// Build flat chapter list per language for prev/next navigation
function buildFlatChapters(lang) {
  const chapters = [];
  for (const section of toc.items) {
    for (const child of section.children) {
      chapters.push({
        sectionId: section.id,
        sectionTitle: section.title[lang],
        id: child.id,
        title: child.title[lang],
        url: `/${lang}/${slugToUrl(section.id, child.id)}`,
        path: child.path[lang],
        sourceUrl: child.source?.url
      });
    }
  }
  return chapters;
}

// ── Build sidebar HTML ──────────────────────────────────────────────────────
function buildSidebar(lang, activeChapterId) {
  let html = '<nav class="sidebar-nav" role="navigation" aria-label="Documentation">\n';
  html += `<a class="sidebar-home" href="/${lang}/">${toc.title}</a>\n`;

  for (const section of toc.items) {
    const isActiveSection = section.children.some(c => c.id === activeChapterId);
    html += `<div class="sidebar-section${isActiveSection ? ' active' : ''}">\n`;
    html += `  <button class="sidebar-section-title" aria-expanded="${isActiveSection}">${section.title[lang]}</button>\n`;
    html += '  <ul class="sidebar-section-items">\n';
    for (const child of section.children) {
      const isActive = child.id === activeChapterId;
      const url = `/${lang}/${slugToUrl(section.id, child.id)}`;
      html += `    <li><a href="${url}"${isActive ? ' class="active" aria-current="page"' : ''}>${child.title[lang]}</a></li>\n`;
    }
    html += '  </ul>\n</div>\n';
  }
  html += '</nav>';
  return html;
}

// ── Build prev/next navigation ──────────────────────────────────────────────
function buildPrevNext(lang, chapters, currentIndex) {
  const prev = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const next = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  let html = '<nav class="prev-next" aria-label="Chapter navigation">\n';
  if (prev) {
    html += `  <a class="prev-next-link prev" href="${prev.url}"><span class="prev-next-label">${LANG_NAV_PREV[lang]}</span><span class="prev-next-title">${prev.title}</span></a>\n`;
  } else {
    html += '  <span></span>\n';
  }
  if (next) {
    html += `  <a class="prev-next-link next" href="${next.url}"><span class="prev-next-label">${LANG_NAV_NEXT[lang]}</span><span class="prev-next-title">${next.title}</span></a>\n`;
  } else {
    html += '  <span></span>\n';
  }
  html += '</nav>';
  return html;
}

// ── Build language switcher ─────────────────────────────────────────────────
function buildLangSwitcher(currentLang, currentPath) {
  const otherLang = currentLang === 'en' ? 'ko' : 'en';
  const otherPath = currentPath.replace(`/${currentLang}/`, `/${otherLang}/`);
  return `<a class="lang-switch" href="${otherPath}" title="${LANG_LABELS[otherLang]}">${LANG_LABELS[otherLang]}</a>`;
}

// ── Main build ──────────────────────────────────────────────────────────────
function build() {
  console.log('Building site...');

  // Clean output
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true });
  }
  ensureDir(OUT_DIR);

  // Copy assets
  const assetsOut = path.join(OUT_DIR, 'assets');
  ensureDir(assetsOut);
  for (const file of fs.readdirSync(ASSETS_DIR)) {
    fs.copyFileSync(path.join(ASSETS_DIR, file), path.join(assetsOut, file));
  }

  // Copy highlight.js CSS
  const hljsCss = path.join(ROOT, 'node_modules', 'highlight.js', 'styles', 'github.min.css');
  if (fs.existsSync(hljsCss)) {
    fs.copyFileSync(hljsCss, path.join(assetsOut, 'hljs.css'));
  }

  const layoutTemplate = readTemplate('layout.html');
  const homeTemplate = readTemplate('home.html');

  // Build for each language
  for (const lang of toc.languages) {
    const chapters = buildFlatChapters(lang);

    // ── Home page ─────────────────────────────────────────────────────────
    const homePath = `/${lang}/`;
    const homeSidebar = buildSidebar(lang, null);
    const langSwitcher = buildLangSwitcher(lang, homePath);

    // Build home content from TOC
    let homeContent = `<h1>${toc.title}</h1>\n`;

    // Check for intro file
    const introPath = path.join(DOCS_DIR, lang, '00-agentic-engineering-patterns-intro.md');
    if (fs.existsSync(introPath)) {
      homeContent += `<p class="intro-link"><a href="/${lang}/intro/">${LANG_INTRO_TITLE[lang]}</a></p>\n`;
    }

    homeContent += '<div class="toc-grid">\n';
    for (const section of toc.items) {
      homeContent += `<div class="toc-section">\n`;
      homeContent += `  <h2 class="toc-section-title">${section.title[lang]}</h2>\n`;
      homeContent += '  <ul class="toc-chapter-list">\n';
      for (const child of section.children) {
        const url = `/${lang}/${slugToUrl(section.id, child.id)}`;
        homeContent += `    <li><a href="${url}">${child.title[lang]}</a></li>\n`;
      }
      homeContent += '  </ul>\n</div>\n';
    }
    homeContent += '</div>';

    const homeHtml = renderTemplate(layoutTemplate, {
      title: `${toc.title} — ${LANG_LABELS[lang]}`,
      sidebar: homeSidebar,
      content: renderTemplate(homeTemplate, { content: homeContent }),
      lang_switcher: langSwitcher,
      lang: lang,
      body_class: 'home-page'
    });

    const homeOutDir = path.join(OUT_DIR, lang);
    ensureDir(homeOutDir);
    fs.writeFileSync(path.join(homeOutDir, 'index.html'), homeHtml);

    // ── Intro page (if exists) ────────────────────────────────────────────
    if (fs.existsSync(introPath)) {
      const introMd = fs.readFileSync(introPath, 'utf-8');
      const introHtml = marked.parse(introMd);
      const introSidebar = buildSidebar(lang, null);
      const introLangSwitcher = buildLangSwitcher(lang, `/${lang}/intro/`);

      const introPageHtml = renderTemplate(layoutTemplate, {
        title: `${LANG_INTRO_TITLE[lang]} — ${toc.title}`,
        sidebar: introSidebar,
        content: `<article class="chapter-content">${introHtml}</article>`,
        lang_switcher: introLangSwitcher,
        lang: lang,
        body_class: 'chapter-page'
      });

      const introOutDir = path.join(OUT_DIR, lang, 'intro');
      ensureDir(introOutDir);
      fs.writeFileSync(path.join(introOutDir, 'index.html'), introPageHtml);
    }

    // ── Chapter pages ─────────────────────────────────────────────────────
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const mdPath = path.join(ROOT, chapter.path);

      if (!fs.existsSync(mdPath)) {
        console.warn(`Warning: ${mdPath} not found, skipping.`);
        continue;
      }

      let mdContent = fs.readFileSync(mdPath, 'utf-8');

      // Remove YAML front matter (---...---) if present
      mdContent = mdContent.replace(/^---\n[\s\S]*?\n---\n/, '');

      // Remove the Source footer line from markdown (we'll add it in template)
      mdContent = mdContent.replace(/\n---\nSource:.*$/s, '');

      const htmlContent = marked.parse(mdContent);
      const sidebar = buildSidebar(lang, chapter.id);
      const prevNext = buildPrevNext(lang, chapters, i);
      const langSwitcher = buildLangSwitcher(lang, chapter.url);

      // Source link
      let sourceLink = '';
      if (chapter.sourceUrl) {
        sourceLink = `<div class="source-link"><a href="${chapter.sourceUrl}" target="_blank" rel="noopener">${LANG_SOURCE[lang]}: simonwillison.net</a></div>`;
      }

      // Section breadcrumb
      const breadcrumb = `<div class="breadcrumb"><a href="/${lang}/">${toc.title}</a> <span class="breadcrumb-sep">/</span> <span>${chapter.sectionTitle}</span></div>`;

      const pageContent = `${breadcrumb}<article class="chapter-content">${htmlContent}</article>${sourceLink}${prevNext}`;

      const pageHtml = renderTemplate(layoutTemplate, {
        title: `${chapter.title} — ${toc.title}`,
        sidebar: sidebar,
        content: pageContent,
        lang_switcher: langSwitcher,
        lang: lang,
        body_class: 'chapter-page'
      });

      const chapterOutDir = path.join(OUT_DIR, lang, chapter.sectionId, chapter.id);
      ensureDir(chapterOutDir);
      fs.writeFileSync(path.join(chapterOutDir, 'index.html'), pageHtml);
    }

    console.log(`  Built ${chapters.length} chapters for ${lang}`);
  }

  // ── Root index.html (redirect to /en/) ──────────────────────────────────
  const rootHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=./en/">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="./en/">English version</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(OUT_DIR, 'index.html'), rootHtml);

  // ── .nojekyll for GitHub Pages ──────────────────────────────────────────
  fs.writeFileSync(path.join(OUT_DIR, '.nojekyll'), '');

  console.log('Build complete!');
}

build();
