import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero, SecHead, CtaBand } from '../components/common/Blocks';
import { PHOTOS } from '../components/common/Visual';
import { BrandIcon } from '../components/common/Brand';
import { ACADEMY_INFO } from '../utils/constants';
import { sortedArticles } from '../data/articles';

// Honest list of free, official sources. Previous papers and syllabus are always taken from the official sites.
const OFFICIAL = [
  ['UPSC previous question papers', 'Official papers of past Civil Services examinations.', 'https://upsc.gov.in/examinations/previous-question-papers'],
  ['UPSC examination notices', 'Notifications, the annual calendar and results.', 'https://upsc.gov.in/examinations/active-exams'],
  ['KPSC official website', 'KAS notifications, syllabus, answer keys and results.', 'https://kpsc.kar.nic.in'],
  ['NCERT textbooks (free PDF)', 'Class 6–12 books, the foundation for UPSC and KAS.', 'https://ncert.nic.in/textbook.php'],
  ['Karnataka Textbook Society', 'State textbooks, useful for Karnataka history and geography.', 'https://textbooks.karnataka.gov.in'],
  ['PIB (Press Information Bureau)', 'Official government press releases for current affairs.', 'https://pib.gov.in'],
];

export const FreeResources = () => (
  <PageLayout>
    <SEO
      title="Free Resources for UPSC and KAS"
      description="Free, official resources for UPSC and KPSC KAS preparation: previous question papers, syllabus, NCERT books and current affairs sources, plus our free guides."
      canonical="/free-resources"
      crumbs={[['Free resources', '/free-resources']]}
    />
    <PageHero photo={PHOTOS.readingHall} crumbs={[['Free resources']]} title="Free resources" text="Official sources for previous papers, syllabus and books. Always download papers from the official websites." />
    <section className="sec">
      <div className="wrap">
        <div className="grid g3">
          {OFFICIAL.map(([t, d, url]) => (
            <a key={t} className="card art" href={url} target="_blank" rel="noopener noreferrer">
              <h2 className="h3">{t}</h2><p>{d}</p><span className="more">Open official site <ExternalLink size={15} /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
    <section className="sec sec-alt">
      <div className="wrap">
        <SecHead tag="From us" title="Free guides and class videos" text="Strategy articles written by our team, and class recordings on YouTube and Telegram." />
        <div className="grid g3">
          {sortedArticles().slice(0, 3).map(a => (
            <Link key={a.slug} className="card art" to={`/articles/${a.slug}`}><span className="cat">{a.category}</span><h3>{a.title}</h3><p>{a.description}</p><span className="more">Read <ArrowRight size={15} /></span></Link>
          ))}
        </div>
        <div className="hero-actions" style={{ justifyContent: 'center' }}>
          <Link className="b b-navy" to="/articles">All articles</Link>
          <a className="b b-line" href={ACADEMY_INFO.socials.youtube} target="_blank" rel="noopener noreferrer"><BrandIcon name="youtube" /> YouTube</a>
          <a className="b b-line" href={ACADEMY_INFO.socials.telegram} target="_blank" rel="noopener noreferrer"><BrandIcon name="telegram" /> Telegram</a>
        </div>
      </div>
    </section>
    <CtaBand />
  </PageLayout>
);

export default FreeResources;
