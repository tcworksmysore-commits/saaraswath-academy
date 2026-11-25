import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero, CtaBand } from '../components/common/Blocks';
import { INITIAL_ACHIEVERS, INITIAL_GALLERY } from '../utils/constants';

export const Achievements = () => (
  <PageLayout>
    <SEO
      title="Results: Our Students in Service"
      description="Students of Saaraswath IAS/KAS Academy, Mysuru selected in UPSC, PSI, CAR and teacher recruitment, in their own words."
      crumbs={[['Results', '/achievements']]}
    />
    <PageHero crumbs={[['Results']]} title="Our students in service" text="Students who prepared with us in Mysuru, in their own words. We are grateful to have been part of their journey." />
    <section className="sec">
      <div className="wrap">
        <div className="grid g3">
          {INITIAL_ACHIEVERS.map(a => (
            <figure key={a.id} className="card ach">
              <img src={a.image} alt={a.name} loading="lazy" decoding="async" width="300" height="375" />
              <h2 className="h3">{a.name}</h2>
              <div className="ex">{a.exam}</div>
              <div className="role-s">{a.role} · {a.batch}</div>
              <q>{a.quote}</q>
            </figure>
          ))}
        </div>
      </div>
    </section>
    <section className="sec sec-alt">
      <div className="wrap">
        <div className="sh"><span className="tag">Moments</span><h2>Felicitations</h2></div>
        <div className="grid g2">
          {INITIAL_GALLERY.filter(g => g.category === 'Achievements').map(g => (
            <figure key={g.id} className="card pic"><img src={g.image} alt={g.title} loading="lazy" decoding="async" width="600" height="400" /><figcaption>{g.description}</figcaption></figure>
          ))}
        </div>
      </div>
    </section>
    <CtaBand />
  </PageLayout>
);

export default Achievements;
