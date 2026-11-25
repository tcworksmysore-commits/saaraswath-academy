import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://tcworksmysore-commits.github.io/saaraswath-academy'; // change to https://saaraswathmysore.in when the domain is live

const setMeta = (sel, attr, val) => { const el = document.querySelector(sel); if (el) el.setAttribute(attr, val); };

export const SEO = ({ title, description }) => {
  const { pathname } = useLocation();
  useEffect(() => {
    const t = title ? `${title} | Saaraswath IAS/KAS Academy Mysuru` : 'Saaraswath IAS/KAS Academy Mysuru | IAS & KAS Coaching';
    document.title = t;
    setMeta('meta[property="og:title"]', 'content', t);
    if (description) {
      setMeta('meta[name="description"]', 'content', description);
      setMeta('meta[property="og:description"]', 'content', description);
    }
    const url = SITE_URL + (pathname === '/' ? '/' : pathname);
    setMeta('link[rel="canonical"]', 'href', url);
    setMeta('meta[property="og:url"]', 'content', url);
  }, [title, description, pathname]);
  return null;
};
