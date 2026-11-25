import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Quote, ArrowRight, Landmark, Building2, ShieldCheck, GraduationCap, Feather, Play, PhoneCall, Check } from 'lucide-react';
import { openEnquiry } from './Enquire';
import { LeadForm } from './LeadForm';
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

// One large, straight framed photo with a small mentor card overlapping its lower-left corner.
export const PhotoStack = ({ photo = PHOTOS.readingHall, tag = 'Kuvempunagar, Mysuru', mentor = true, eager = false }) => (
  <div className={`pstack${mentor ? ' has-m' : ''}`}>
    <figure className="frame f-main">
      <Photo p={photo} eager={eager} />
      {tag && <span className="ptag"><MapPin size={14} /> {tag}</span>}
    </figure>
    {mentor && (
      <div className="f-mentor">
        <img src={web('founder-360.webp')} alt={ACADEMY_INFO.founder} width="56" height="56" loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <span><b>{ACADEMY_INFO.founder}</b>Founder &amp; mentor</span>
      </div>
    )}
  </div>
);

// "Choose your exam" tiles: one per course landing page.
const EXAM_TILE = {
  UPSC: [Landmark, 'Civil Services: Prelims, Mains, Interview'],
  KAS: [Building2, 'KPSC Gazetted Probationers, Karnataka focus'],
  PSI: [ShieldCheck, 'Karnataka Police PSI and constable exams'],
  Foundation: [GraduationCap, 'Alongside your degree, over three years'],
  Optional: [Feather, 'Kannada Literature optional for Mains'],
};
export const ExamTiles = ({ items }) => (
  <div className="exams">
    {items.map(l => {
      const [Icon, d] = EXAM_TILE[l.exam] || [Landmark, ''];
      return (
        <Link key={l.slug} to={`/${l.slug}`} className="exam">
          <span className="exam-ic"><Icon size={22} /></span>
          <b>{l.short}</b>
          <small>{d}</small>
          <ArrowRight className="exam-go" size={18} />
        </Link>
      );
    })}
  </div>
);

// Achievers as straight portrait cards (shown exactly as listed in constants.js).
export const ResultsStrip = ({ items }) => (
  <div className="rstrip">
    {items.map(a => (
      <figure key={a.id} className="rcard">
        <img src={a.image} alt={a.name} width="300" height="375" loading="lazy" decoding="async" />
        <figcaption><b>{a.name}</b><span>{a.exam}</span>{a.batch && <small>{a.batch}</small>}</figcaption>
      </figure>
    ))}
  </div>
);

// Vertical academy videos: poster first, the video loads only after a tap.
export const VIDEOS = {
  tour: { k: 'campus-tour', t: 'A walk through the academy', d: 'Classrooms, library and study hall' },
  mentor: { k: 'mentor-talk', t: 'Sri Narasimha Murthy', d: 'Modern History and Polity' },
};
export const VideoCard = ({ v }) => {
  const [on, setOn] = useState(false);
  return (
    <figure className="vcard">
      <div className="vbox">
        {on ? (
          <video src={getAssetUrl(`/videos/${v.k}.mp4`)} poster={getAssetUrl(`/videos/${v.k}.webp`)} controls autoPlay playsInline preload="none" width="540" height="960" />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play video: ${v.t}`}>
            <img src={getAssetUrl(`/videos/${v.k}.webp`)} alt="" width="540" height="960" loading="lazy" decoding="async" />
            <span className="vplay"><Play size={24} fill="currentColor" /></span>
          </button>
        )}
      </div>
      <figcaption><b>{v.t}</b>{v.d}</figcaption>
    </figure>
  );
};
export const VideoPair = () => (
  <div className="vpair"><VideoCard v={VIDEOS.tour} /><VideoCard v={VIDEOS.mentor} /></div>
);

// Short "request a call back" card placed mid-page (same LeadForm, no popup).
export const CallbackCard = ({ course = '', form = 'callback', title = 'Prefer to talk first?' }) => (
  <div className="cbk">
    <div className="cbk-txt">
      <span className="cbk-ic"><PhoneCall size={22} /></span>
      <h2>{title}</h2>
      <p>Leave your name and number. A mentor will call you back to answer your questions about the course, batch and fees.</p>
      <ul>
        <li><Check size={16} /> Free, no obligation to join</li>
        <li><Check size={16} /> Kannada or English, as you prefer</li>
      </ul>
    </div>
    <div className="cbk-form"><LeadForm title="Request a call back" course={course} formName={form} /></div>
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
      <Link key={p.k} to="/gallery" className="gthumb" aria-label={`${p.alt}, open gallery`}>
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
