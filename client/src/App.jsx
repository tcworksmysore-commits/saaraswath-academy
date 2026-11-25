import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseLanding from './pages/CourseLanding';
import { Articles, Article } from './pages/Articles';
import Faculty from './pages/Faculty';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import FreeResources from './pages/FreeResources';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import { LANDINGS } from './data/courses';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {LANDINGS.map(l => <Route key={l.slug} path={`/${l.slug}`} element={<CourseLanding slug={l.slug} />} />)}
      {/* old URLs: same content, canonical points to the landing page */}
      <Route path="/courses/:id" element={<CourseLanding />} />
      <Route path="/upsc" element={<CourseLanding slug="ias-coaching-in-mysuru" />} />
      <Route path="/kas" element={<CourseLanding slug="kas-coaching-in-mysuru" />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:slug" element={<Article />} />
      <Route path="/about" element={<About />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/free-resources" element={<FreeResources />} />
      <Route path="/study-materials" element={<FreeResources />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
