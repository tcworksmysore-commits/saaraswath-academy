import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero, CtaBand } from '../components/common/Blocks';
import { PHOTOS, VideoPair } from '../components/common/Visual';
import { INITIAL_GALLERY } from '../utils/constants';

const CATS = ['All', 'Classroom', 'Workshops', 'Achievements', 'Students'];

export const Gallery = () => {
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (!open) return;
    const esc = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);
  const items = cat === 'All' ? INITIAL_GALLERY : INITIAL_GALLERY.filter(g => g.category === cat);
  return (
    <PageLayout>
      <SEO title="Gallery: Classrooms and Events in Mysuru" description="Classrooms, workshops and felicitations at Saaraswath IAS/KAS Academy, Kuvempunagar, Mysuru." crumbs={[['Gallery', '/gallery']]} />
      <PageHero photo={PHOTOS.group} crumbs={[['Gallery']]} title="Gallery" text="Classes, workshops and student felicitations at the academy." />
      <section className="sec sec-alt">
        <div className="wrap vids-split">
          <div className="sh"><span className="tag">Videos</span><h2>See the academy</h2><p>A short walk through the classrooms and study hall, and a few words from one of our teachers.</p></div>
          <VideoPair />
        </div>
      </section>
      <section className="sec">
        <div className="wrap">
          <div className="chips" style={{ justifyContent: 'center', marginBottom: 20 }}>
            {CATS.map(c => <button key={c} className={cat === c ? 'on' : ''} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="grid g3">
            {items.map(g => (
              <figure key={g.id} className="card pic">
                <button onClick={() => setOpen(g)} aria-label={`Open ${g.title}`}><img src={g.image} alt={g.title} loading="lazy" decoding="async" width="600" height="400" /></button>
                <figcaption><b>{g.title}</b>{g.description}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <div className="modal-bg lb" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={open.title}>
          <button className="x" onClick={() => setOpen(null)} aria-label="Close"><X size={20} /></button>
          <img src={open.image} alt={open.title} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
      <CtaBand />
    </PageLayout>
  );
};

export default Gallery;
