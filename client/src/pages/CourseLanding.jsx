import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2, Phone, Sun, Moon, CalendarDays, MapPin, ArrowRight, BookOpen, Landmark, Calculator, PenLine, Newspaper,
  Compass, Mic, Languages, ClipboardCheck, Brain, Timer, Dumbbell, ScrollText, Library, Lightbulb, MessagesSquare,
  UserCheck, Presentation, RefreshCw, Feather, Target, Users, Info,
} from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO, faqLd, courseLd } from '../components/common/SEO';
import { LeadForm, COURSE_OPTIONS } from '../components/common/LeadForm';
import { openEnquiry } from '../components/common/Enquire';
import { BrandIcon } from '../components/common/Brand';
import { Crumbs, SecHead, CtaBand, Faq, AchieverGrid } from '../components/common/Blocks';
import { PhotoStack, HeroCtaM, PHOTOS, Timeline, Flow, FacultyRow, Testimonial, GalleryStrip, StickyCta, MoreLink, VideoPair, CallbackCard } from '../components/common/Visual';
import { LANDINGS, landingBySlug, landingByCourseId } from '../data/courses';
import { articleBySlug } from '../data/articles';
import { ACADEMY_INFO, INITIAL_ACHIEVERS, getWhatsAppLink, telLink } from '../utils/constants';
import NotFound from './NotFound';

const OPTION = { UPSC: 0, KAS: 1, PSI: 2, Foundation: 3, Optional: 4 };
const OG = { UPSC: 'ias', KAS: 'kas', PSI: 'psi', Foundation: 'foundation', Optional: 'optional' };
const HERO_PHOTO = { UPSC: PHOTOS.readingHall, KAS: PHOTOS.classroomA, PSI: PHOTOS.studyHall, Foundation: PHOTOS.classroomB, Optional: PHOTOS.seminar };

// A distinct icon for each "what you get" card, picked from its title.
const ICONS = [
  [/CSAT|mental ability/i, Calculator], [/answer|writing|descriptive/i, PenLine], [/current|newspaper/i, Newspaper],
  [/optional/i, Compass], [/interview|speaking/i, Mic], [/history/i, ScrollText], [/kannada & english|language/i, Languages],
  [/physical/i, Dumbbell], [/mock|practice|test/i, ClipboardCheck], [/karnataka/i, Landmark], [/prelims|general studies|GS/i, Library],
  [/ncert/i, BookOpen], [/text/i, Feather], [/previous/i, Target], [/mentor/i, UserCheck],
];
const FALLBACK = [Lightbulb, Brain, Timer, MessagesSquare, BookOpen, Target];
const iconsFor = (items) => {
  const used = new Set();
  return items.map(([t], i) => {
    let I = (ICONS.find(([re]) => re.test(t)) || [])[1];
    if (!I || used.has(I)) I = FALLBACK.find(f => !used.has(f)) || FALLBACK[i % FALLBACK.length];
    used.add(I);
    return I;
  });
};

// "How a batch runs": generic steps, built only from what the course pages already say.
const flowFor = (exam) => [
  { Icon: Presentation, t: 'Classroom teaching', d: 'Topic by topic, in Kannada and English, with notes you can revise from.' },
  { Icon: ClipboardCheck, t: 'Regular tests', d: exam === 'PSI' ? 'Objective and descriptive tests, then full mocks closer to the exam.' : 'Topic tests as the syllabus moves, then full-length mocks.' },
  { Icon: PenLine, t: exam === 'PSI' ? 'Practice and feedback' : 'Answer writing', d: exam === 'PSI' ? 'Your answers and test mistakes are discussed, so the same errors do not repeat.' : 'Written answers, evaluated with comments you can act on.' },
  { Icon: UserCheck, t: 'Mentor review', d: 'The mentor looks at your progress and helps you adjust the plan when something is not working.' },
  { Icon: RefreshCw, t: 'Revision before the exam', d: 'Focused revision and doubt clearing in the final weeks.' },
];

export const CourseLanding = ({ slug }) => {
  const { id } = useParams();
  const l = slug ? landingBySlug(slug) : landingByCourseId(id);
  if (!l) return <NotFound />;
  const course = COURSE_OPTIONS[OPTION[l.exam]];
  const path = `/${l.slug}`;
  const achievers = l.achievers ? INITIAL_ACHIEVERS.filter(a => l.achievers.test(a.exam + ' ' + a.role)) : [];
  const voice = achievers[0] || INITIAL_ACHIEVERS[0];
  const related = l.articles.map(articleBySlug).filter(Boolean);
  const icons = iconsFor(l.youGet);

  return (
    <PageLayout whatsappMessage={l.waMsg}>
      <SEO
        fullTitle={l.seoTitle}
        description={l.description}
        canonical={path}
        crumbs={[['Courses', '/courses'], [l.short, path]]}
        jsonLd={[courseLd({ name: l.seoTitle.split(' | ')[0], description: l.description, path }), faqLd(l.faq)]}
        image={OG[l.exam]}
        preload={HERO_PHOTO[l.exam].k}
      />
      <StickyCta label={l.seoTitle.split(' | ')[0]} course={course} form={l.exam} />

      <section className="hero hero-lp">
        <span className="blob b1" aria-hidden="true" /><span className="blob b2" aria-hidden="true" />
        <div className="wrap hg hg-lp">
          <div className="hg-intro rise">
            <Crumbs items={[['Courses', '/courses'], [l.short]]} />
            <span className="pill"><i /> Admissions open · Kuvempunagar, Mysuru</span>
            <h1>{l.h1} <em>{l.h1em}</em></h1>
            <p className="kn">{l.kn}</p>
            <p className="lead">{l.lead}</p>
            <HeroCtaM waMsg={l.waMsg} />
          </div>
          <div className="hg-photo rise d1"><PhotoStack photo={HERO_PHOTO[l.exam]} eager /></div>
          <div className="lead-card hg-form rise d2" id="enquire">
            <LeadForm title="Get a call back" subtitle="A short call with a mentor about batch dates, timings and the fee." course={course} formName={`${l.exam}-landing`} />
          </div>
          <div className="hg-extra">
            <ul className="ticks">{l.ticks.map(t => <li key={t}><CheckCircle2 size={20} /> {t}</li>)}</ul>
            <div className="hero-actions">
              <button className="b b-navy" onClick={() => openEnquiry({ course, form: `${l.exam}-fees` })}>Get fee details</button>
              <a className="b b-wa" href={getWhatsAppLink(l.waMsg)} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
              <a className="b b-line" href={telLink(ACADEMY_INFO.phoneNumbers[0])}><Phone size={18} /> Call</a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div className="rv">
            <SecHead tag="Who it is for" title="Is this course right for you?" />
            <p className="fit-h">Right for you if</p>
            <ul className="checks checks-card">{l.whoFor.map(w => <li key={w}><CheckCircle2 size={20} /> {w}</li>)}</ul>
            {l.waitIf && <>
              <p className="fit-h">You may want to wait if</p>
              <ul className="waits">{l.waitIf.map(w => <li key={w}><Info size={18} /> {w}</li>)}</ul>
            </>}
            <p className="note"><Users size={18} /> Not sure? In a free counselling call we will listen to your situation and give you an honest suggestion about the right exam and course.</p>
          </div>
          <div className="card batch batch-x rv">
            <h3>Batches and mode</h3>
            <ul>
              <li><span><Sun size={18} /></span> Morning batch</li>
              <li><span><Moon size={18} /></span> Evening batch</li>
              <li><span><CalendarDays size={18} /></span> Weekend batch</li>
              <li><span><MapPin size={18} /></span> Classroom in Kuvempunagar, Mysuru; ask us about online</li>
            </ul>
            <p>Batch dates and timings change through the year. Ask us for the next start date.</p>
            <button className="b b-gold b-block" onClick={() => openEnquiry({ course, form: `${l.exam}-batch` })}>Get next batch date &amp; fees</button>
          </div>
        </div>
      </section>

      <section className="sec sec-alt sec-deco">
        <div className="wrap">
          <SecHead tag="What you get" title="What the course covers" />
          <div className="grid g3">
            {l.youGet.map(([t, d], i) => {
              const Icon = icons[i];
              return <div key={t} className={`card feat feat-x rv c${i % 3}`}><span className="ic"><Icon size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></div>;
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead tag="The exam" title={l.exam === 'Foundation' ? 'How the three years build up' : 'Exam stages we prepare you for'} />
          <Timeline items={l.syllabus} />
        </div>
      </section>

      <section className="sec sec-navy">
        <div className="wrap">
          <SecHead tag="How a batch runs" title="A steady routine, week after week" text="No shortcuts: regular classes, regular tests and honest feedback, with a mentor who keeps an eye on your progress." />
          <Flow items={flowFor(l.exam)} />
        </div>
      </section>

      <section className="sec">
        <div className="wrap"><CallbackCard course={course} form={`${l.exam}-callback`} /></div>
      </section>

      <section className="sec sec-cream">
        <div className="wrap founder founder-x">
          <figure className="frame f-portrait rv">
            <img src={ACADEMY_INFO.founderPhoto} alt={ACADEMY_INFO.founder} loading="lazy" decoding="async" width="420" height="420" />
          </figure>
          <div className="rv">
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
        <div className="wrap" style={{ marginTop: 44 }}>
          <h3 className="mini-h">The teaching team</h3>
          <FacultyRow />
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead tag="Results" title={achievers.length ? 'Students who prepared with us' : 'In a student’s words'} />
          <Testimonial a={voice} />
          {achievers.length > 1 && <div style={{ marginTop: 28 }}><AchieverGrid items={achievers} /></div>}
          <MoreLink to="/achievements">See all results</MoreLink>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <div className="vids-split">
            <SecHead tag="Inside the academy" title="Where you will study" text="Classrooms, a quiet study hall and the programmes we hold through the year, at Kuvempunagar, Mysuru. Take a short video walk through, or hear from one of our teachers." />
            <VideoPair />
          </div>
          <div style={{ marginTop: 36 }}><GalleryStrip /></div>
          <MoreLink to="/gallery">Open the gallery</MoreLink>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <SecHead tag="FAQ" title="Questions aspirants ask us" />
          <Faq items={l.faq} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="sec sec-alt">
          <div className="wrap">
            <SecHead tag="Read" title="Guides and updates" />
            <div className="grid g3">
              {related.map(a => (
                <Link key={a.slug} to={`/articles/${a.slug}`} className="card art rv">
                  <span className="cat">{a.category}</span><h3>{a.title}</h3><p>{a.description}</p>
                  <span className="more">Read <ArrowRight size={15} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="sec sec-tight">
        <div className="wrap">
          <SecHead tag="Other courses" title="Also at Saaraswath, Mysuru" />
          <div className="chips">
            {LANDINGS.filter(o => o.slug !== l.slug).map(o => <Link key={o.slug} to={`/${o.slug}`}>{o.seoTitle.split(' | ')[0]} <ArrowRight size={14} /></Link>)}
          </div>
        </div>
      </section>

      <CtaBand course={course} form={`${l.exam}-band`} waMsg={l.waMsg} />
    </PageLayout>
  );
};

export default CourseLanding;
