import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Users, BookOpen, PenLine, Languages, CalendarClock, MessagesSquare, Download, Phone } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { LeadForm } from '../components/common/LeadForm';
import { openEnquiry } from '../components/common/Enquire';
import { BrandIcon } from '../components/common/Brand';
import { ACADEMY_INFO, INITIAL_COURSES, INITIAL_ACHIEVERS, getWhatsAppLink, telLink } from '../utils/constants';

const YT_UPLOADS = 'UUOMaPN30n6XB7h34Kac75oA'; // uploads playlist of @Saaraswath.Mysore

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
  ['What are the fees?', 'Fees depend on the course, batch and mode. Book a free counselling call or WhatsApp us and we will share the exact fee and any scholarship or instalment option.'],
  ['Can I attend a demo class first?', 'Yes. Book free counselling and we will arrange a demo class so you can see the teaching before you join.'],
  ['I am still in my degree. Is it too early?', 'No. The 3-year Degree + IAS/KAS foundation runs on weekends and evenings, so it never clashes with college.'],
];

const YouTube = () => {
  const [on, setOn] = useState(false);
  return (
    <div className="yt">
      {on ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/videoseries?list=${YT_UPLOADS}&autoplay=1`} title="Saaraswath Academy on YouTube"
          allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
      ) : (
        <button onClick={() => setOn(true)} aria-label="Play latest Saaraswath videos">
          <span className="play"><svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></span>
          Watch our latest classes &amp; strategy videos
        </button>
      )}
    </div>
  );
};

export const Home = () => (
  <PageLayout>
    <SEO
      title="Best IAS & KAS Coaching in Mysuru"
      description="Saaraswath IAS/KAS Academy, Kuvempunagar, Mysuru: UPSC Civil Services, KPSC KAS, PSI/PC coaching in Kannada & English. Book a free counselling call and demo class."
    />

    {/* Hero with the enquiry form above the fold */}
    <section className="hero">
      <div className="wrap hg">
        <div className="hg-intro">
          <span className="pill"><i /> Admissions open · New batches in Mysuru</span>
          <h1>Become an <em>IAS / KAS</em> officer, guided from Mysuru.</h1>
          <p className="kn">ನಿಮ್ಮ ಐಎಎಸ್ / ಕೆಎಎಸ್ ಕನಸಿಗೆ ಸರಿಯಾದ ಮಾರ್ಗದರ್ಶನ</p>
          <p className="lead">UPSC, KPSC KAS and PSI coaching with personal mentorship by {ACADEMY_INFO.founder}, weekly answer evaluation and bilingual classes.</p>
        </div>
        <div className="hg-extra">
          <ul className="ticks">
            <li><CheckCircle2 size={20} /> Free counselling + demo class before you join</li>
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
        <div className="lead-card hg-form" id="enquire">
          <LeadForm title="Book your free counselling" subtitle="Get course, batch and fee details. We call you back." formName="hero" />
        </div>
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
            <article key={c.id} className="card course">
              <div className="top"><span className="cat">{c.category}</span><span className="bdg">{c.badge}</span></div>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <div className="meta">
                <span><Clock size={15} /> {c.duration}</span>
                <span><MapPin size={15} /> {c.mode}</span>
              </div>
              <div className="acts">
                <Link className="b b-line" to={`/courses/${c.id}`}>Details</Link>
                <button className="b b-gold" onClick={() => openEnquiry({ course: c.title, form: 'course-card' })}>Get fees</button>
              </div>
            </article>
          ))}
          <article className="card course" style={{ background: 'var(--gold-soft)', borderColor: '#f0dca5' }}>
            <h3>Not sure which course fits you?</h3>
            <p>Tell us your education and goal. Our mentor will suggest the right exam, course and batch, free.</p>
            <div className="acts" style={{ gridTemplateColumns: '1fr' }}>
              <button className="b b-navy" onClick={() => openEnquiry({ course: 'Not sure, need counselling', form: 'course-help' })}>Talk to a mentor</button>
              <button className="b b-line" onClick={() => openEnquiry({ variant: 'brochure', form: 'home-brochure' })}><Download size={17} /> Download brochure</button>
            </div>
          </article>
        </div>
      </div>
    </section>

    {/* Results */}
    <section className="sec sec-alt">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Results</span>
          <h2>Our students in service</h2>
          <p>Selections from Saaraswath classrooms in Mysuru.</p>
        </div>
        <div className="scroller">
          {INITIAL_ACHIEVERS.map(a => (
            <figure key={a.id} className="card ach">
              <img src={a.image} alt={a.name} loading="lazy" decoding="async" width="300" height="375" />
              <h3>{a.name}</h3>
              <div className="ex">{a.exam}</div>
              <q>{a.quote}</q>
            </figure>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: 16 }}><Link className="b b-line" to="/achievements">See all results</Link></p>
      </div>
    </section>

    {/* Why */}
    <section className="sec">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Why Saaraswath</span>
          <h2>Serious preparation, personal attention</h2>
        </div>
        <div className="grid g3">
          {FEATURES.map(([Icon, t, d]) => (
            <div key={t} className="card feat"><span className="ic"><Icon size={22} /></span><div><h3>{t}</h3><p>{d}</p></div></div>
          ))}
        </div>
      </div>
    </section>

    {/* Founder */}
    <section className="sec sec-cream">
      <div className="wrap founder">
        <img src={ACADEMY_INFO.founderPhoto} alt={ACADEMY_INFO.founder} loading="lazy" decoding="async" width="420" height="525" />
        <div>
          <span className="sh" style={{ margin: 0, textAlign: 'left' }}><span className="tag">Meet the founder</span></span>
          <h2>{ACADEMY_INFO.founder}</h2>
          <div className="role">{ACADEMY_INFO.founderTitle}, Saaraswath IAS/KAS Academy</div>
          <p>{ACADEMY_INFO.founderExperience}</p>
          <p>{ACADEMY_INFO.founderBio}</p>
          <div className="hero-actions">
            <button className="b b-gold" onClick={() => openEnquiry({ form: 'founder' })}>Talk to the founder</button>
            <Link className="b b-line" to="/about">About the academy</Link>
          </div>
        </div>
      </div>
    </section>

    {/* YouTube */}
    <section className="sec">
      <div className="wrap">
        <div className="sh">
          <span className="tag">Free learning</span>
          <h2>Learn with us on YouTube</h2>
          <p>Strategy sessions, current affairs and class recordings from Saaraswath.</p>
        </div>
        <div style={{ maxWidth: 880, margin: '0 auto' }}><YouTube /></div>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <a className="b b-line" href={ACADEMY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer"><BrandIcon name="youtube" /> Subscribe</a>
          <a className="b b-line" href={ACADEMY_INFO.socials.telegram} target="_blank" rel="noopener noreferrer"><BrandIcon name="telegram" /> Join Telegram</a>
        </div>
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
    <section className="sec">
      <div className="wrap">
        <div className="band">
          <div>
            <h2>Start with a free counselling call</h2>
            <p>Visit us at Kuvempunagar, Mysuru, or talk to us today. We help you pick the right exam, course and batch.</p>
          </div>
          <div className="acts">
            <button className="b b-gold" onClick={() => openEnquiry({ form: 'cta-band' })}>Book free counselling</button>
            <a className="b b-wa" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp us</a>
          </div>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Home;
