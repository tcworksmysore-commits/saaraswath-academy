import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://tcworksmysore-commits.github.io/saaraswath-academy'; // change to https://saaraswathmysore.in when the domain is live
export const SITE_NAME = 'Saaraswath IAS/KAS Academy';

// Filled during the static pre-render (scripts/prerender.mjs reads it after each route renders).
export const headStore = { current: null };

const ORG = { '@type': 'EducationalOrganization', name: SITE_NAME, url: `${SITE_URL}/` };

const crumbsLd = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [['Home', '/'], ...crumbs].map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: SITE_URL + path,
  })),
});

export const faqLd = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const courseLd = ({ name, description, path }) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name, description,
  url: SITE_URL + path,
  provider: ORG,
  inLanguage: ['en', 'kn'],
  hasCourseInstance: { '@type': 'CourseInstance', courseMode: ['Onsite', 'Blended'], location: 'Kuvempunagar, Mysuru, Karnataka' },
});

export const articleLd = ({ title, description, path, date, updated }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title, description,
  url: SITE_URL + path,
  mainEntityOfPage: SITE_URL + path,
  datePublished: date, dateModified: updated || date,
  author: ORG, publisher: { ...ORG, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/academy-logo.webp` } },
  image: `${SITE_URL}/images/logo/academy-logo.webp`,
});

const setMeta = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };

/**
 * title: page title (site name is appended); fullTitle overrides it entirely.
 * canonical: path to use as canonical (default: current path). crumbs: [['Courses','/courses'], ...].
 * jsonLd: object or array of schema.org objects. noindex: true for 404.
 */
export const SEO = ({ title, fullTitle, description, canonical, crumbs, jsonLd, noindex }) => {
  const { pathname } = useLocation();
  const t = fullTitle || (title ? `${title} | Saaraswath IAS/KAS Academy, Mysuru` : 'Saaraswath IAS/KAS Academy, Mysuru | IAS & KAS Coaching');
  const path = canonical || (pathname.length > 1 ? pathname.replace(/\/$/, '') : '/');
  const url = SITE_URL + path;
  const ld = [...(crumbs ? [crumbsLd(crumbs)] : []), ...(jsonLd ? [].concat(jsonLd) : [])];

  if (typeof window === 'undefined') headStore.current = { title: t, description, url, ld, noindex };

  useEffect(() => {
    document.title = t;
    setMeta('meta[property="og:title"]', 'content', t);
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [t, description, url]);
  return null;
};

export default SEO;
