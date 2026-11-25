import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Phone, Sun, Moon, CalendarDays, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO, faqLd, courseLd } from '../components/common/SEO';
import { LeadForm, COURSE_OPTIONS } from '../components/common/LeadForm';
import { openEnquiry } from '../components/common/Enquire';
import { BrandIcon } from '../components/common/Brand';
import { Crumbs, SecHead, CtaBand, Faq, AchieverGrid } from '../components/common/Blocks';
import { LANDINGS, landingBySlug, landingByCourseId } from '../data/courses';
import { articleBySlug } from '../data/articles';
import { ACADEMY_INFO, INITIAL_ACHIEVERS, getWhatsAppLink, telLink } from '../utils/constants';
import NotFound from './NotFound';

const OPTION = { UPSC: 0, KAS: 1, PSI: 2, Foundation: 3, Optional: 4 };

export const CourseLanding = ({ slug }) => {
  const { id } = useParams();
  const l = slug ? landingBySlug(slug) : landingByCourseId(id);
  if (!l) return <NotFound />;
  const course = COURSE_OPTIONS[OPTION[l.exam]];
  const path = `/${l.slug}`;
  const achievers = l.achievers ? INITIAL_ACHIEVERS.filter(a => l.achievers.test(a.exam + ' ' + a.role)) : [];
  const related = l.articles.map(articleBySlug).filter(Boolean);

  return (
    <PageLayout whatsappMessage={l.waMsg}>
      <SEO
        fullTitle={l.seoTitle}
        description={l.description}
        canonical={path}
        crumbs={[['Courses', '/courses'], [l.short, path]]}
        jsonLd={[courseLd({ name: l.seoTitle.split(' | ')[0], description: l.description, path }), faqLd(l.faq)]}
      />

      <section className="hero">
        <div className="wrap hg">
          <div className="hg-intro">
            <Crumbs items={[['Courses', '/courses'], [l.short]]} />
            <span className="pill"><i /> Admissions open · Kuvempunagar, Mysuru</span>
            <h1>{l.h1} <em>{l.h1em}</em></h1>
            <p className="kn">{l.kn}</p>
            <p className="lead">{l.lead}</p>
          </div>
          <div className="hg-extra">
            <ul className="ticks">{l.ticks.map(t => <li key={t}><CheckCircle2 size={20} /> {t}</li>)}</ul>
            <div className="hero-actions">
              <button className="b b-navy" onClick={() => openEnquiry({ course, form: `${l.exam}-fees` })}>Get fee details</button>
              <a className="b b-wa" href={getWhatsAppLink(l.waMsg)} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
              <a className="b b-line" href={telLink(ACADEMY_INFO.phoneNumbers[0])}><Phone size={18} /> Call</a>
            </div>
          </div>
          <div className="lead-card hg-form" id="enquire">
            <LeadForm title="Talk to a mentor, free" subtitle="Get batch dates and fee details. We will call you back." course={course} formName={`${l.exam}-landing`} />
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <SecHead tag="Who it is for" title="Is this course right for you?" />
            <ul className="checks">{l.whoFor.map(w => <li key={w}><CheckCircle2 size={20} /> {w}</li>)}</ul>
            <p className="note">Not sure? In a free counselling call we will listen to your situation and give you an honest suggestion about the right exam and course.</p>
          </div>
          <div className="card batch">
            <h3>Batches and mode</h3>
            <ul>
              <li><Sun size={18} /> Morning batch</li>
              <li><Moon size={18} /> Evening batch</li>
              <li><CalendarDays size={18} /> Weekend batch</li>
              <li><MapPin size={18} /> Classroom in Kuvempunagar, Mysuru; ask us about online</li>
            </ul>
            <p>Batch dates and timings change through the year. Ask us for the next start date.</p>
            <button className="b b-gold b-block" onClick={() => openEnquiry({ course, form: `${l.exam}-batch` })}>Get next batch date &amp; fees</button>
          </div>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead tag="What you get" title="What the course covers" />
          <div className="grid g3">
            {l.youGet.map(([t, d]) => <div key={t} className="card feat"><span className="ic"><BookOpen size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead tag="The exam" title="Exam stages we prepare you for" />
          <div className="steps">
            {l.syllabus.map(([t, d], i) => <div key={t} className="card step"><b>{i + 1}</b><div><h3>{t}</h3><p>{d}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="sec sec-cream">
        <div className="wrap founder">
          <img src={ACADEMY_INFO.founderPhoto} alt={ACADEMY_INFO.founder} loading="lazy" decoding="async" width="420" height="525" />
          <div>
            <span className="sh" style={{ margin: 0, textAlign: 'left' }}><span className="tag">Your mentor</span></span>
            <h2>{ACADEMY_INFO.founder}</h2>
            <div className="role">{ACADEMY_INFO.founderTitle}, Saaraswath IAS/KAS Academy</div>
            <p>{ACADEMY_INFO.founderExperience}</p>
            <p>Every student meets him personally. He reviews your progress and answers, and helps you adjust your plan when something is not working.</p>
            <div className="hero-actions">
              <button className="b b-gold" onClick={() => openEnquiry({ course, form: `${l.exam}-mentor` })}>Talk to the mentor</button>
              <Link className="b b-line" to="/faculty">Meet the faculty</Link>
            </div>
          </div>
        </div>
      </section>

      {achievers.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead tag="Results" title="Students who prepared with us" />
            <AchieverGrid items={achievers} />
            <p style={{ textAlign: 'center', marginTop: 16 }}><Link className="b b-line" to="/achievements">See all results</Link></p>
          </div>
        </section>
      )}

      <section className="sec sec-alt">
        <div className="wrap">
          <SecHead tag="FAQ" title="Questions aspirants ask us" />
          <Faq items={l.faq} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec">
          <div className="wrap">
            <SecHead tag="Read" title="Guides and updates" />
            <div className="grid g3">
              {related.map(a => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="card art">
                  <span className="cat">{a.category}</span><h3>{a.title}</h3><p>{a.description}</p>
                  <span className="more">Read <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <SecHead tag="Other courses" title="Also at Saaraswath, Mysuru" />
          <div className="chips">
            {LANDINGS.filter(o => o.slug !== l.slug).map(o => <Link key={o.slug} to={`/${o.slug}`}>{o.seoTitle.split(' | ')[0]}</Link>)}
          </div>
        </div>
      </section>

      <CtaBand course={course} form={`${l.exam}-band`} waMsg={l.waMsg} />
    </PageLayout>
  );
};

export default CourseLanding;
