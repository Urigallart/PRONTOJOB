import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/Home';
import { ExplorePage } from './pages/Explore';
import { PostJobPage } from './pages/PostJob';
import { JobDetailsPage } from './pages/JobDetails';
import { WalletPage } from './pages/Wallet';
import { ProfilePage } from './pages/Profile';
import { PublicProfilePage } from './pages/PublicProfile';
import { HowItWorksPage } from './pages/HowItWorks';
import { SecurityPage } from './pages/Security';
import { HelpPage } from './pages/Help';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { ProPlansPage } from './pages/ProPlans';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="post-job" element={<PostJobPage />} />
            <Route path="job/:id" element={<JobDetailsPage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/:id" element={<PublicProfilePage />} />
            <Route path="pro-plans" element={<ProPlansPage />} />
            <Route path="how-it-works" element={<HowItWorksPage />} />
            <Route path="security" element={<SecurityPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
