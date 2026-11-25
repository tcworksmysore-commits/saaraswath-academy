import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://tcworksmysore-commits.github.io/saaraswath-academy'; // change to https://saaraswathmysore.in when the domain is live
export const SITE_NAME = 'Saaraswath IAS/KAS Academy';

// Filled during the static pre-render (scripts/prerender.mjs reads it after each route renders).
export const headStore = { current: null };

// The full organisation (NAP, founder, sameAs) is the JSON-LD block in index.html, on every page; these refer to it by @id.
export const ORG_ID = `${SITE_URL}/#org`;
export const FOUNDER_ID = `${SITE_URL}/#founder`;
const ORG = { '@type': 'EducationalOrganization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/` };
const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'No. 608, 1st Floor, P & T Block, Near Gnanaganga PU College, Panchamantra Road, Kuvempunagar',
  addressLocality: 'Mysuru', addressRegion: 'Karnataka', postalCode: '570023', addressCountry: 'IN',
};

export const founderLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Dr. Vasanth Kumar N',
  jobTitle: 'Founder and Director',
  image: `${SITE_URL}/images/founder/dr-vasanth-kumar.webp`,
  url: `${SITE_URL}/about`,
  worksFor: ORG,
});

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
  hasCourseInstance: {
    '@type': 'CourseInstance', courseMode: ['Onsite', 'Blended'],
    location: { '@type': 'Place', name: SITE_NAME, address: ADDRESS },
    instructor: { '@type': 'Person', '@id': FOUNDER_ID, name: 'Dr. Vasanth Kumar N' },
  },
});

export const articleLd = ({ title, description, path, date, updated, image = 'home' }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: title, description,
  url: SITE_URL + path,
  mainEntityOfPage: SITE_URL + path,
  datePublished: date, dateModified: updated || date,
  inLanguage: 'en-IN',
  author: ORG, publisher: { ...ORG, logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo/academy-logo-120.webp` } },
  image: { '@type': 'ImageObject', url: `${SITE_URL}/images/og/${image}.jpg`, width: 1200, height: 630 },
});

const setMeta = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };

/**
 * title: page title (site name is appended); fullTitle overrides it entirely.
 * canonical: path to use as canonical (default: current path). crumbs: [['Courses','/courses'], ...].
 * jsonLd: object or array of schema.org objects. noindex: true for 404.
 * image: share-image name in /images/og/ (default 'home'). preload: hero photo key in /images/web/ to preload
 * (inner pages need not pass it: PageHero registers its own photo). type: og:type ('article' on articles).
 */
export const SEO = ({ title, fullTitle, description, canonical, crumbs, jsonLd, noindex, image = 'home', preload, type = 'website' }) => {
  const { pathname } = useLocation();
  // Keep titles within ~65 characters so Google shows them whole: shorter brand suffix for long titles, none for very long ones.
  const t = fullTitle || (!title ? 'Saaraswath IAS/KAS Academy, Mysuru | IAS & KAS Coaching'
    : [`${title} | Saaraswath Academy Mysuru`, `${title} | Saaraswath Academy`].find(s => s.length <= 65) || title);
  const path = canonical || (pathname.length > 1 ? pathname.replace(/\/$/, '') : '/');
  const url = SITE_URL + path;
  const ld = [...(crumbs ? [crumbsLd(crumbs)] : []), ...(jsonLd ? [].concat(jsonLd) : [])];

  const img = `${SITE_URL}/images/og/${image}.jpg`;
  if (typeof window === 'undefined') {
    headStore.current = { title: t, description, url, ld, noindex, image: img, type, preload: preload && { k: preload, sizes: '(min-width: 960px) 520px, 90vw' } };
  }

  useEffect(() => {
    document.title = t;
    setMeta('meta[property="og:title"]', 'content', t);
    setMeta('meta[name="twitter:title"]', 'content', t);
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
      setMeta('meta[name="twitter:description"]', 'content', description);
    }
    setMeta('meta[name="twitter:image"]', 'content', img);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('meta[property="og:image"]', 'content', img);
  }, [t, description, url, img]);
  return null;
};

export default SEO;
