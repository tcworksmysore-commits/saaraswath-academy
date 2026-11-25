import React from 'react';
import { Link } from 'react-router-dom';
import { Users, PenLine, Languages, MapPin } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { openEnquiry } from '../components/common/Enquire';
import { PageHero, SecHead, CtaBand } from '../components/common/Blocks';
import { ACADEMY_INFO } from '../utils/constants';

const VALUES = [
  [Users, 'Personal attention', 'Batches are kept small enough that mentors know each student and their progress.'],
  [PenLine, 'Writing every week', 'Answers are written, evaluated and discussed regularly, because the Mains is a writing exam.'],
  [Languages, 'Kannada and English', 'Kannada-medium and English-medium aspirants learn together, with notes in both languages.'],
  [MapPin, 'Close to home', 'Serious preparation in Mysuru, so aspirants from the region need not move to Bengaluru or Delhi.'],
];

export const About = () => (
  <PageLayout>
    <SEO
      title="About the Academy and Founder"
      description="Saaraswath IAS/KAS Academy in Kuvempunagar, Mysuru was started in 2019 by Dr. Vasanth Kumar N to offer careful, personal coaching for UPSC, KAS and PSI aspirants."
      crumbs={[['About', '/about']]}
    />
    <PageHero crumbs={[['About']]} title="About Saaraswath Academy" text="A civil services academy in Kuvempunagar, Mysuru, started in 2019." />

    <section className="sec">
      <div className="wrap split">
        <div className="prose">
          <h2>Why we started</h2>
          <p>Saaraswath IAS/KAS Academy was started in <strong>2019</strong> so that aspirants from Mysuru, Mandya, Hassan, Chamarajanagar, Kodagu and nearby districts could prepare for the civil services close to home, with a mentor who knows them personally.</p>
          <p>We teach for the UPSC Civil Services Examination, the KPSC KAS examination, Karnataka Police PSI and Constable recruitment, a three-year foundation for degree students, and the Kannada Literature optional.</p>
          <p>Our classroom is at {ACADEMY_INFO.address}.</p>
          <div className="hero-actions">
            <Link className="b b-navy" to="/courses">See the courses</Link>
            <button className="b b-line" onClick={() => openEnquiry({ form: 'about' })}>Book free counselling</button>
          </div>
        </div>
        <div className="card logo-card">
          <img src={ACADEMY_INFO.logoTight} alt="Saaraswath IAS/KAS Academy emblem" width="320" height="320" loading="lazy" />
          <b>SAARASWATH IAS / KAS ACADEMY</b><small>Mysuru · since 2019</small>
        </div>
      </div>
    </section>

    <section className="sec sec-cream">
      <div className="wrap founder">
        <img src={ACADEMY_INFO.founderPhoto} alt={ACADEMY_INFO.founder} loading="lazy" decoding="async" width="420" height="525" />
        <div>
          <span className="sh" style={{ margin: 0, textAlign: 'left' }}><span className="tag">Founder</span></span>
          <h2>{ACADEMY_INFO.founder}</h2>
          <div className="role">{ACADEMY_INFO.founderTitle}</div>
          <p>{ACADEMY_INFO.founderExperience}</p>
          <p>{ACADEMY_INFO.founderBio}</p>
          <blockquote className="quote">“Every aspirant has potential. What helps most is a clear plan: knowing what to study, what to leave out, and writing answers that are reviewed honestly.”</blockquote>
          <button className="b b-gold" onClick={() => openEnquiry({ form: 'about-founder' })}>Talk to the founder</button>
        </div>
      </div>
    </section>

    <section className="sec">
      <div className="wrap">
        <SecHead tag="How we teach" title="What we care about" />
        <div className="grid g4">
          {VALUES.map(([Icon, t, d]) => <div key={t} className="card feat"><span className="ic"><Icon size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></div>)}
        </div>
      </div>
    </section>

    <CtaBand />
  </PageLayout>
);

export default About;
