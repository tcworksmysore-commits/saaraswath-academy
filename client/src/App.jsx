import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import UPSC from './pages/UPSC';
import KAS from './pages/KAS';
import Faculty from './pages/Faculty';
import Achievements from './pages/Achievements';
import Gallery from './pages/Gallery';
import Admissions from './pages/Admissions';
import Contact from './pages/Contact';
import StudyMaterials from './pages/StudyMaterials';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/study-materials" element={<StudyMaterials />} />
      <Route path="/upsc" element={<UPSC />} />
      <Route path="/kas" element={<KAS />} />
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/admissions" element={<Admissions />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
