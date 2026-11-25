import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero, CtaBand } from '../components/common/Blocks';
import { PHOTOS } from '../components/common/Visual';
import { ACADEMY_INFO, INITIAL_FACULTY } from '../utils/constants';

export const Faculty = () => (
  <PageLayout>
    <SEO
      title="Faculty"
      description={`Meet the faculty of Saaraswath IAS/KAS Academy, Mysuru: ${ACADEMY_INFO.founder} and subject teachers for history, polity, geography, economy, current affairs and CSAT.`}
      crumbs={[['Faculty', '/faculty']]}
    />
    <PageHero photo={PHOTOS.seminar} crumbs={[['Faculty']]} title="Our faculty" text="Subject teachers who teach in Kannada and English, led by the founder." />
    <section className="sec">
      <div className="wrap">
        <div className="card fac fac-lead">
          <img src={ACADEMY_INFO.founderPhoto} alt={ACADEMY_INFO.founder} width="160" height="200" loading="lazy" />
          <div>
            <h2 className="h3">{ACADEMY_INFO.founder}</h2>
            <div className="spec">{ACADEMY_INFO.founderTitle}</div>
            <p>{ACADEMY_INFO.founderExperience}</p>
          </div>
        </div>
        <div className="grid g3" style={{ marginTop: 16 }}>
          {INITIAL_FACULTY.map(f => (
            <article key={f.id} className="card fac">
              <img src={f.image.replace('/images/faculty/', '/images/web/tc-')} alt={f.name} width="96" height="96" loading="lazy" decoding="async" />
              <div>
                <h2 className="h3">{f.name}</h2>
                <div className="spec">{f.specialization}</div>
                <small>{f.role} · {f.experience}</small>
                <p>{f.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    <CtaBand title="Meet the teachers in person" text="Come for a free counselling session at Kuvempunagar, Mysuru, and ask any question about your preparation." />
  </PageLayout>
);

export default Faculty;
