import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Quote, ArrowRight } from 'lucide-react';
import { openEnquiry } from './Enquire';
import { getAssetUrl, ACADEMY_INFO, INITIAL_FACULTY } from '../../utils/constants';

// Visual building blocks for the premium layer (styles in styles/polish.css).
// All render the same on server and client (no window/document during render).

const web = (name) => getAssetUrl(`/images/web/${name}`);

// Named photos: 720px + 420px WebP versions live in public/images/web/
export const PHOTOS = {
  readingHall: { k: 'reading-hall', h: 540, alt: 'Reading hall with study desks at Saaraswath Academy, Kuvempunagar' },
  classroomA: { k: 'classroom-a', h: 540, alt: 'Classroom at Saaraswath IAS/KAS Academy, Mysuru' },
  studyHall: { k: 'study-hall', h: 540, alt: 'Self-study hall with individual desks' },
  classroomB: { k: 'classroom-b', h: 540, alt: 'Bright classroom with desks and whiteboard' },
  seminar: { k: 'seminar', h: 540, alt: 'Guidance seminar for aspirants in Mysuru' },
  front: { k: 'academy-front', h: 540, alt: 'Saaraswath Academy building, Panchamantra Road, Kuvempunagar' },
  group: { k: 'batch-group', h: 540, alt: 'Students and mentors of a Saaraswath batch' },
  stage: { k: 'event-stage', h: 617, alt: 'Academy programme on stage' },
  inauguration: { k: 'inauguration', h: 477, alt: 'Inauguration of a new batch' },
};

export const Photo = ({ p, sizes = '(min-width: 960px) 520px, 90vw', eager = false, className }) => (
  <img
    className={className}
    src={web(`${p.k}-720.webp`)}
    srcSet={`${web(`${p.k}-420.webp`)} 420w, ${web(`${p.k}-720.webp`)} 720w`}
    sizes={sizes}
    alt={p.alt}
    width="720"
    height={p.h}
    loading={eager ? 'eager' : 'lazy'}
    decoding="async"
  />
);

// Two framed, slightly tilted photo cards: a place photo + the mentor's portrait.
export const PhotoStack = ({ photo = PHOTOS.readingHall, tag = 'Kuvempunagar, Mysuru', mentor = true, eager = false }) => (
  <div className="pstack">
    <figure className="frame f-main"><Photo p={photo} eager={eager} /></figure>
    {mentor && (
      <figure className="frame f-mentor">
        <img src={web('founder-360.webp')} alt={ACADEMY_INFO.founder} width="360" height="360" loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <figcaption><b>{ACADEMY_INFO.founder}</b>Your mentor</figcaption>
      </figure>
    )}
    {tag && <span className="ptag"><MapPin size={14} /> {tag}</span>}
  </div>
);

// Numbered exam-stage timeline (vertical on phones, horizontal on desktop).
export const Timeline = ({ items, vertical = false, as: H = 'h3' }) => (
  <ol className={`tl${vertical ? ' tl-v' : ''}`} style={{ '--n': items.length }}>
    {items.map(([t, d], i) => (
      <li key={t}>
        <span className="tl-dot">{i + 1}</span>
        <div className="tl-body"><H className="h3">{t}</H><p>{d}</p></div>
      </li>
    ))}
  </ol>
);

// Icon steps strip ("how a batch runs").
export const Flow = ({ items }) => (
  <div className="flow">
    {items.map(({ Icon, t, d }, i) => (
      <div key={t} className="flow-i">
        <span className="flow-ic"><Icon size={22} /></span>
        <small>Step {i + 1}</small>
        <h3>{t}</h3>
        <p>{d}</p>
      </div>
    ))}
  </div>
);

// Round avatars of the teaching team.
export const FacultyRow = ({ items = INITIAL_FACULTY }) => (
  <div className="avrow">
    {items.map(f => {
      const file = f.image.split('/').pop();
      return (
        <figure key={f.id} className="av">
          <img src={web(`av-${file}`)} alt={f.name} width="128" height="128" loading="lazy" decoding="async" />
          <figcaption><b>{f.name}</b><span>{f.specialization}</span></figcaption>
        </figure>
      );
    })}
  </div>
);

// One large testimonial quote with a photo.
export const Testimonial = ({ a }) => (
  <figure className="testi">
    <Quote className="testi-q" size={40} aria-hidden="true" />
    <blockquote>{a.quote}</blockquote>
    <figcaption>
      <img src={a.image} alt={a.name} width="64" height="64" loading="lazy" decoding="async" />
      <span><b>{a.name}</b>{a.exam}{a.batch ? ` · ${a.batch}` : ''}</span>
    </figcaption>
  </figure>
);

// Thumbnail strip of academy photos linking to the gallery.
export const GalleryStrip = ({ items = [PHOTOS.front, PHOTOS.group, PHOTOS.readingHall, PHOTOS.stage] }) => (
  <div className="gstrip">
    {items.map((p, i) => (
      <Link key={p.k} to="/gallery" className={`gthumb t${i % 4}`} aria-label={`${p.alt}, open gallery`}>
        <Photo p={p} sizes="(min-width: 900px) 280px, 45vw" />
      </Link>
    ))}
  </div>
);

// Desktop-only slim call-to-action bar that slides in below the header after the hero.
export const StickyCta = ({ label, course, form }) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 640);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`scta${show ? ' on' : ''}`} aria-hidden={!show}>
      <div className="wrap">
        <b>{label}</b>
        <span className="scta-note">Free counselling call · Kuvempunagar, Mysuru</span>
        <button className="b b-line" tabIndex={show ? 0 : -1} onClick={() => openEnquiry({ course, form: `${form}-fees` })}>Get fee details</button>
        <button className="b b-gold" tabIndex={show ? 0 : -1} onClick={() => openEnquiry({ course, form: `${form}-call` })}>Book free counselling</button>
      </div>
    </div>
  );
};

export const MoreLink = ({ to, children }) => (
  <p className="more-link"><Link className="b b-line" to={to}>{children} <ArrowRight size={16} /></Link></p>
);
