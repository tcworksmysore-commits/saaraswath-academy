import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';
import { headStore } from './components/common/SEO';
import { LANDINGS } from './data/courses';
import { ARTICLES } from './data/articles';

// Every URL that gets its own static HTML file. [path, inSitemap, priority]
export const ROUTES = [
  ['/', true, '1.0'],
  ...LANDINGS.map(l => [`/${l.slug}`, true, '0.9']),
  ['/courses', true, '0.8'],
  ['/articles', true, '0.8'],
  ...ARTICLES.map(a => [`/articles/${a.slug}`, true, '0.7']),
  ['/about', true, '0.6'], ['/faculty', true, '0.6'], ['/achievements', true, '0.6'],
  ['/gallery', true, '0.5'], ['/admissions', true, '0.7'], ['/contact', true, '0.7'],
  ['/free-resources', true, '0.6'],
  ['/privacy-policy', false], ['/terms', false],
  // old URLs kept alive; their canonical points to the new page
  ['/upsc', false], ['/kas', false], ['/study-materials', false],
  ...LANDINGS.filter(l => l.courseId).map(l => [`/courses/${l.courseId}`, false]),
];

export const ARTICLE_DATES = Object.fromEntries(ARTICLES.map(a => [`/articles/${a.slug}`, a.updated || a.date]));

export function render(url, basename) {
  headStore.current = null;
  const html = renderToString(
    <StaticRouter location={url} basename={basename}>
      <App />
    </StaticRouter>
  );
  return { html, head: headStore.current };
}
