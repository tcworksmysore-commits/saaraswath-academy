import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { openEnquiry } from './Enquire';
import { BrandIcon } from './Brand';
import { Photo } from './Visual';
import { headStore } from './SEO';
import { getWhatsAppLink } from '../../utils/constants';

// Small building blocks shared by the inner pages (styles in styles/site.css).

export const Crumbs = ({ items }) => (
  <nav className="crumbs" aria-label="Breadcrumb">
    <Link to="/">Home</Link>
    {items.map(([label, to]) => (
      <React.Fragment key={label}><ChevronRight size={14} aria-hidden="true" />{to ? <Link to={to}>{label}</Link> : <span>{label}</span>}</React.Fragment>
    ))}
  </nav>
);

// photo: one of PHOTOS from Visual.jsx; shown as a straight framed card beside the title.
const HERO_SIZES = '(min-width: 900px) 440px, 80vw';

export const PageHero = ({ title, text, crumbs, kn, photo, children }) => {
  // Static pre-render: the hero photo is the LCP image, so ask prerender.mjs to preload it (SEO renders first, so headStore is set).
  if (typeof window === 'undefined' && photo && headStore.current && !headStore.current.preload) {
    headStore.current.preload = { k: photo.k, sizes: HERO_SIZES };
  }
  return (
  <section className={`page-hero${photo ? ' ph-photo' : ''}`}>
    <span className="blob b1" aria-hidden="true" /><span className="blob b2" aria-hidden="true" />
    <div className="wrap">
      <div className="ph-text rise">
        {crumbs && <Crumbs items={crumbs} />}
        <h1>{title}</h1>
        <span className="orn" aria-hidden="true" />
        {kn && <p className="kn">{kn}</p>}
        {text && <p>{text}</p>}
        {children}
      </div>
      {photo && <figure className="frame ph-pic rise d1"><Photo p={photo} eager sizes={HERO_SIZES} /></figure>}
    </div>
  </section>
  );
};

export const SecHead = ({ tag, title, text }) => (
  <div className="sh">
    {tag && <span className="tag">{tag}</span>}
    <h2>{title}</h2>
    {text && <p>{text}</p>}
  </div>
);

export const CtaBand = ({ title = 'Start with a short call', text = 'Visit us at Kuvempunagar, Mysuru, or talk to us today. We will help you choose the right exam, course and batch.', course, form = 'cta-band', waMsg }) => (
  <section className="sec">
    <div className="wrap">
      <div className="band">
        <div><h2>{title}</h2><p>{text}</p></div>
        <div className="acts">
          <button className="b b-gold" onClick={() => openEnquiry({ course, form })}>Get a call back</button>
          <a className="b b-wa" href={getWhatsAppLink(waMsg)} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp us</a>
        </div>
      </div>
    </div>
  </section>
);

export const Faq = ({ items }) => (
  <div className="faq">
    {items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
  </div>
);

export const AchieverGrid = ({ items }) => (
  <div className="scroller">
    {items.map(a => (
      <figure key={a.id} className="card ach">
        <img src={a.image} alt={a.name} loading="lazy" decoding="async" width="300" height="375" />
        <h3>{a.name}</h3>
        <div className="ex">{a.exam}</div>
        {a.role && <div className="role-s">{a.role}</div>}
        <q>{a.quote}</q>
      </figure>
    ))}
  </div>
);
