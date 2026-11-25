import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Users, BookOpen, PenLine, Languages, CalendarClock, MessagesSquare, Download, Phone, ArrowRight } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO, faqLd } from '../components/common/SEO';
import { sortedArticles } from '../data/articles';
import { landingByCourseId, LANDINGS } from '../data/courses';
import { LeadForm } from '../components/common/LeadForm';
import { openEnquiry } from '../components/common/Enquire';
import { BrandIcon } from '../components/common/Brand';
import { PhotoStack, HeroCtaM, PHOTOS, Teachers, GalleryStrip, MoreLink, ExamTiles, ResultsStrip, VideoPair, CallbackCard } from '../components/common/Visual';
import { ACADEMY_INFO, INITIAL_COURSES, INITIAL_ACHIEVERS, getWhatsAppLink, telLink } from '../utils/constants';

const FEATURES = [
  [Users, 'Personal mentorship', `Small batches and one-to-one guidance from ${ACADEMY_INFO.founder} and subject experts.`],
  [PenLine, 'Weekly answer writing', 'Mains answers evaluated line by line, plus regular Prelims mock tests.'],
  [Languages, 'Kannada & English', 'Bilingual classes and notes, with special focus on Karnataka GK for KAS.'],
  [BookOpen, 'NCERT to advanced', 'Concept-first teaching from NCERTs and standard reference books.'],
  [MessagesSquare, 'Daily current affairs', 'National and Karnataka current affairs, editorials and budget analysis.'],
  [CalendarClock, 'Flexible batches', 'Morning, evening and weekend batches; classroom in Mysuru or online.'],
];

const FAQS = [
  ['Which courses do you offer?', 'UPSC Civil Services (IAS/IPS), KPSC KAS, Karnataka Police PSI/PC, a 3-year Degree + IAS/KAS foundation programme and Kannada Literature optional.'],
  ['Are classes in Kannada or English?', 'Both. Teaching and notes are bilingual, so Kannada-medium and English-medium aspirants learn together comfortably.'],
  ['Can I attend online?', 'Yes. Most programmes run in the classroom at Kuvempunagar, Mysuru, with online / hybrid options. Ask us for the current online batch.'],
  ['What are the fees?', 'Fees depend on the batch and mode. We tell you the exact fee on the first call, so no visit is needed.'],
  ['Can I see a class before I join?', 'Ask on your call. We will tell you plainly what is possible for your batch and how classes run.'],
  ['I am still in my degree. Is it too early?', 'No. The 3-year Degree + IAS/KAS foundation runs on weekends and evenings, so it never clashes with college.'],
];

export const Home = () => (
  <PageLayout>
    <SEO
      fullTitle="IAS & KAS Coaching in Mysuru | Saaraswath IAS/KAS Academy"
      description="Saaraswath IAS/KAS Academy, Kuvempunagar, Mysuru: UPSC Civil Services, KPSC KAS, PSI/PC coaching in Kannada and English. Get a free call back. ಮೈಸೂರಿನಲ್ಲಿ ಐಎಎಸ್, ಕೆಎಎಸ್ ತರಬೇತಿ."
      jsonLd={faqLd(FAQS)}
      preload="academy-front"
    />

    {/* Hero with the enquiry form above the fold */}
    <section className="hero hero-lp">
      <span className="blob b1" aria-hidden="true" /><span className="blob b2" aria-hidden="true" />
      <div className="wrap hg hg-lp">
        <div className="hg-intro rise">
          <span className="pill"><i /> Admissions open · New batches in Mysuru</span>
          <h1>IAS &amp; KAS coaching in Mysuru, <em>with a mentor who knows you.</em></h1>
          <p className="kn">ನಿಮ್ಮ ಐಎಎಸ್ / ಕೆಎಎಸ್ ಕನಸಿಗೆ ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನ</p>
          <p className="lead">UPSC, KPSC KAS and PSI coaching with personal mentorship by {ACADEMY_INFO.founder}, weekly answer evaluation and bilingual classes.</p>
          <HeroCtaM />
        </div>
        <div className="hg-photo rise d1"><PhotoStack photo={PHOTOS.front} tag="Panchamantra Road, Kuvempunagar" eager /></div>
        <div className="hg-extra">
          <ul className="ticks">
            <li><CheckCircle2 size={20} /> A free call with a mentor before you join</li>
            <li><CheckCircle2 size={20} /> Classroom in Kuvempunagar, Mysuru · online option</li>
            <li><CheckCircle2 size={20} /> Morning, evening &amp; weekend batches</li>
          </ul>
          <div className="hero-actions">
            <a className="b b-navy" href={telLink(ACADEMY_INFO.phoneNumbers[0])}><Phone size={18} /> Call {ACADEMY_INFO.phoneNumbers[0]}</a>
            <a className="b b-wa" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
          </div>
          <div className="stats">
            <div><b>2019</b><span>Since</span></div>
            <div><b>15+ yrs</b><span>Mentoring</span></div>
            <div><b>10+</b><span>Expert faculty</span></div>
          </div>
        </div>
        <div className="lead-card hg-form rise d2" id="enquire">
          <LeadForm title="Get a call back" subtitle="A short call with a mentor about the right course, batch and fee for you." formName="hero" />
        </div>
      </div>
    </section>

    {/* Choose your exam */}
    <section className="sec exam-sec">
      <div className="wrap">
        <h2 className="mini-h">Which exam are you preparing for?</h2>
        <ExamTiles items={LANDINGS} />
      </div>
    </section>

    {/* Results, kept high on the page */}
    <section className="sec sec-alt">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Results</span>
          <h2>Our students in service</h2>
          <p>Selections from Saaraswath classrooms in Mysuru.</p>
        </div>
        <ResultsStrip items={INITIAL_ACHIEVERS} />
        <MoreLink to="/achievements">See all results</MoreLink>
      </div>
    </section>

    {/* Your teachers, right after the students */}
    <section className="sec sec-cream">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Your teachers</span>
          <h2>The people who will teach you</h2>
          <p>A mentor who knows you by name, and a teacher for every subject: history, polity, geography, economy, science, current affairs and aptitude.</p>
        </div>
        <Teachers />
        <MoreLink to="/faculty">Meet the faculty</MoreLink>
      </div>
    </section>

    {/* Courses */}
    <section className="sec">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Programmes</span>
          <h2>Courses for every stage of your preparation</h2>
          <p>From degree students to serious final-attempt aspirants. Ask us for fees and the next batch date.</p>
        </div>
        <div className="grid g3">
          {INITIAL_COURSES.map(c => (
            <article key={c.id} className="card course course-x rv">
              <div className="top"><span className="cat">{c.category}</span><span className="bdg">{c.badge}</span></div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <div className="meta">
                <span><Clock size={15} /> {c.duration}</span>
                <span><MapPin size={15} /> {c.mode}</span>
              </div>
              <div className="acts">
                <Link className="b b-line" to={`/${landingByCourseId(c.id).slug}`}>Details</Link>
                <button className="b b-gold" onClick={() => openEnquiry({ course: c.title, form: 'course-card' })}>Get fee details</button>
              </div>
            </article>
          ))}
          <article className="card course" style={{ background: 'var(--gold-soft)', borderColor: '#f0dca5' }}>
            <h3>Not sure which course fits you?</h3>
            <p>Tell us your education and goal. Our mentor will suggest the right exam, course and batch, free.</p>
            <div className="acts" style={{ gridTemplateColumns: '1fr' }}>
              <button className="b b-navy" onClick={() => openEnquiry({ course: 'Not sure, need counselling', form: 'course-help' })}>Get a call back</button>
              <button className="b b-line" onClick={() => openEnquiry({ variant: 'brochure', form: 'home-brochure' })}><Download size={17} /> Download brochure</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    {/* Why */}
    <section className="sec sec-alt">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Why Saaraswath</span>
          <h2>Serious preparation, personal attention</h2>
        </div>
        <div className="grid g3">
          {FEATURES.map(([Icon, t, d], i) => (
            <div key={t} className={`card feat feat-x rv c${i % 3}`}><span className="ic"><Icon size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></div>
          ))}
        </div>
      </div>
    </section>

    {/* Call back */}
    <section className="sec sec-tight">
      <div className="wrap"><CallbackCard form="home-callback" /></div>
    </section>

    {/* Inside the academy: videos, photos, YouTube + Telegram in one place */}
    <section className="sec sec-deco">
      <div className="wrap">
        <div className="vids-split">
          <div className="sh"><span className="tag">Inside the academy</span><h2>A quiet place to study in Mysuru</h2><p>Take a short walk through the classrooms and study hall, and hear from one of our teachers.</p></div>
          <VideoPair />
        </div>
        <div style={{ marginTop: 36 }}><GalleryStrip /></div>
        <div className="home-follow">
          <Link className="b b-line" to="/gallery">Open the gallery <ArrowRight size={16} /></Link>
          <a className="b b-line" href={ACADEMY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer"><BrandIcon name="youtube" /> Free classes on YouTube</a>
          <a className="b b-line" href={ACADEMY_INFO.socials.telegram} target="_blank" rel="noopener noreferrer"><BrandIcon name="telegram" /> Join Telegram</a>
        </div>
      </div>
    </section>

    {/* Articles */}
    <section className="sec">
      <div className="wrap">
        <div className="sh"><span className="tag">Updates</span><h2>Exam updates and guides</h2><p>Dates, syllabus and simple strategy, checked against official notifications.</p></div>
        <div className="grid g3">
          {sortedArticles().slice(0, 3).map(a => (
            <Link key={a.slug} to={`/articles/${a.slug}`} className="card art rv"><span className="cat">{a.category} · {a.exam}</span><h3>{a.title}</h3><p>{a.description}</p><span className="more">Read more</span></Link>
          ))}
        </div>
        <MoreLink to="/articles">All articles</MoreLink>
      </div>
    </section>

    {/* FAQ */}
    <section className="sec sec-alt">
      <div className="wrap">
        <div className="sh"><span className="tag">FAQ</span><h2>Questions aspirants ask us</h2></div>
        <div className="faq">
          {FAQS.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
        </div>
      </div>
    </section>

    {/* Final CTA */}
    <section className="sec sec-tight">
      <div className="wrap">
        <div className="band">
          <div>
            <h2>Start with a short call</h2>
            <p>Visit us at Kuvempunagar, Mysuru, or talk to us today. We help you pick the right exam, course and batch.</p>
          </div>
          <div className="acts">
            <button className="b b-gold" onClick={() => openEnquiry({ form: 'cta-band' })}>Get a call back</button>
            <a className="b b-wa" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Home;
