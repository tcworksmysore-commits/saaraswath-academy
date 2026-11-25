import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO, articleLd } from '../components/common/SEO';
import { LeadForm } from '../components/common/LeadForm';
import { Markdown } from '../components/common/Markdown';
import { PageHero, Crumbs, CtaBand } from '../components/common/Blocks';
import { sortedArticles, articleBySlug } from '../data/articles';
import { LANDINGS } from '../data/courses';
import NotFound from './NotFound';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const fmt = (d) => { const [y, m, day] = d.split('-'); return `${+day} ${MONTHS[+m - 1]} ${y}`; };

const Card = ({ a }) => (
  <Link to={`/articles/${a.slug}`} className="card art">
    <span className="cat">{a.category} · {a.exam}</span>
    <h3>{a.title}</h3>
    <p>{a.description}</p>
    <span className="more"><CalendarDays size={14} /> {fmt(a.date)} <span style={{ marginLeft: 'auto' }}>Read <ArrowRight size={15} /></span></span>
  </Link>
);

export const Articles = () => {
  const list = sortedArticles();
  return (
    <PageLayout>
      <SEO
        title="UPSC & KAS Exam Updates and Strategy Guides"
        description="UPSC, KPSC KAS and Karnataka PSI exam updates, dates, syllabus and simple strategy guides from Saaraswath IAS/KAS Academy, Mysuru."
        crumbs={[['Articles', '/articles']]}
      />
      <PageHero crumbs={[['Articles']]} title="Exam updates and guides" text="Dates, syllabus and simple strategy for UPSC, KAS and PSI aspirants. We check facts against the official notifications." />
      <section className="sec">
        <div className="wrap">
          <div className="grid g3">{list.map(a => <Card key={a.slug} a={a} />)}</div>
        </div>
      </section>
      <CtaBand />
    </PageLayout>
  );
};

export const Article = () => {
  const { slug } = useParams();
  const a = articleBySlug(slug);
  if (!a) return <NotFound />;
  const path = `/articles/${a.slug}`;
  const course = LANDINGS.find(l => l.exam === a.exam);
  const more = sortedArticles().filter(x => x.slug !== a.slug).slice(0, 3);
  return (
    <PageLayout>
      <SEO
        title={a.title}
        description={a.description}
        crumbs={[['Articles', '/articles'], [a.title, path]]}
        jsonLd={articleLd({ title: a.title, description: a.description, path, date: a.date, updated: a.updated })}
      />
      <article className="sec art-page">
        <div className="wrap art-grid">
          <div className="prose">
            <Crumbs items={[['Articles', '/articles'], [a.category]]} />
            <h1>{a.title}</h1>
            <p className="meta"><CalendarDays size={15} /> {fmt(a.date)}{a.updated ? ` · updated ${fmt(a.updated)}` : ''} · Saaraswath IAS/KAS Academy</p>
            <Markdown text={a.body} />
          </div>
          <aside className="art-side">
            <div className="lead-card">
              <LeadForm title="Have a question about your preparation?" subtitle="Talk to a mentor, free. We will call you back." formName={`article-${a.slug}`} />
            </div>
            {course && <Link className="b b-line b-block" style={{ marginTop: 12 }} to={`/${course.slug}`}>{course.seoTitle.split(' | ')[0]}</Link>}
          </aside>
        </div>
      </article>
      <section className="sec sec-alt">
        <div className="wrap">
          <div className="sh"><span className="tag">More to read</span><h2>Other guides and updates</h2></div>
          <div className="grid g3">{more.map(x => <Card key={x.slug} a={x} />)}</div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Articles;
