import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, GraduationCap } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { openEnquiry } from '../components/common/Enquire';
import { PageHero, CtaBand } from '../components/common/Blocks';
import { INITIAL_COURSES } from '../utils/constants';
import { landingByCourseId } from '../data/courses';

export const Courses = () => (
  <PageLayout>
    <SEO
      title="Courses: UPSC, KAS, PSI, Degree Foundation, Kannada Optional"
      description="Courses at Saaraswath IAS/KAS Academy, Mysuru: UPSC Civil Services, KPSC KAS, Karnataka PSI/PC, a 3-year degree foundation and Kannada Literature optional."
      crumbs={[['Courses', '/courses']]}
    />
    <PageHero crumbs={[['Courses']]} title="Courses" text="Choose the course that fits your exam and your stage of preparation. Ask us for fees and the next batch date." />
    <section className="sec">
      <div className="wrap">
        <div className="grid g3">
          {INITIAL_COURSES.map(c => {
            const l = landingByCourseId(c.id);
            return (
              <article key={c.id} className="card course">
                <div className="top"><span className="cat">{c.category}</span><span className="bdg">{c.badge}</span></div>
                <h2 className="h3"><Link to={`/${l.slug}`}>{c.title}</Link></h2>
                <p>{c.description}</p>
                <div className="meta">
                  <span><Clock size={15} /> {c.duration}</span>
                  <span><MapPin size={15} /> {c.mode}</span>
                  <span><GraduationCap size={15} /> {c.eligibility}</span>
                </div>
                <div className="acts">
                  <Link className="b b-line" to={`/${l.slug}`}>Details</Link>
                  <button className="b b-gold" onClick={() => openEnquiry({ course: c.title, form: 'courses-page' })}>Get fee details</button>
                </div>
              </article>
            );
          })}
          <article className="card course" style={{ background: 'var(--gold-soft)', borderColor: '#f0dca5' }}>
            <h2 className="h3">Not sure which course fits you?</h2>
            <p>Tell us your education and goal. A mentor will suggest the right exam, course and batch, free of cost.</p>
            <div className="acts" style={{ gridTemplateColumns: '1fr' }}>
              <button className="b b-navy" onClick={() => openEnquiry({ course: 'Not sure, need counselling', form: 'courses-help' })}>Talk to a mentor</button>
            </div>
          </article>
        </div>
      </div>
    </section>
    <CtaBand />
  </PageLayout>
);

export default Courses;
