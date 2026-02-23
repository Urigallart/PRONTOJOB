import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { PostJobPage } from './pages/PostJob';
import { JobDetailsPage } from './pages/JobDetails';
import { WalletPage } from './pages/Wallet';
import { ProfilePage } from './pages/Profile';
import { HowItWorksPage } from './pages/HowItWorks';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="job/:id" element={<JobDetailsPage />} />
          <Route path="wallet" element={<WalletPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="how-it-works" element={<HowItWorksPage />} />
          <Route path="security" element={<div className="p-20 text-center font-display font-black uppercase">Seguridad (Próximamente)</div>} />
          <Route path="help" element={<div className="p-20 text-center font-display font-black uppercase">Ayuda (Próximamente)</div>} />
        </Route>
      </Routes>
    </Router>
  );
}
