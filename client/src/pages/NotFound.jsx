import React from 'react';
import { Link } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { LANDINGS } from '../data/courses';

export const NotFound = () => (
  <PageLayout>
    <SEO title="Page not found" noindex />
    <section className="page-hero" style={{ padding: '64px 0' }}>
      <div className="wrap">
        <h1>Page not found</h1>
        <p>This page does not exist or has moved. These pages may help:</p>
        <div className="chips" style={{ justifyContent: 'center', marginTop: 20 }}>
          <Link to="/">Home</Link>
          {LANDINGS.map(l => <Link key={l.slug} to={`/${l.slug}`}>{l.short}</Link>)}
          <Link to="/articles">Articles</Link>
          <Link to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default NotFound;
