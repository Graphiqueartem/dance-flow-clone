
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Competitions from '@/pages/Competitions';
import HowToEnter from '@/pages/HowToEnter';
import Workshops from '@/pages/Workshops';
import OnlineClasses from '@/pages/OnlineClasses';
import ResultsVideos from '@/pages/ResultsVideos';
import News from '@/pages/News';
import Contact from '@/pages/Contact';
import Community from '@/pages/Community';
import LiveChat from '@/pages/LiveChat';
import Challenges from '@/pages/Challenges';
import Gallery from '@/pages/Gallery';
import PerformanceReviewForm from '@/pages/PerformanceReviewForm';
import NotFound from '@/pages/NotFound';
import { initializeDemoData } from '@/services/demoData';

// Competition Pages
import RoyalAcademyDanceGala from '@/pages/competitions/RoyalAcademyDanceGala';
import RoyalTourRAD from '@/pages/competitions/RoyalTourRAD';
import Ibiza2023Gala from '@/pages/competitions/Ibiza2023Gala';
import Masterclasses from '@/pages/competitions/Masterclasses';
import LoveDanceSummerCamp2023 from '@/pages/competitions/LoveDanceSummerCamp2023';
import SadlersWellsFeb from '@/pages/competitions/SadlersWellsFeb';
import SadlersWellsNov from '@/pages/competitions/SadlersWellsNov';
import LoveDanceSummerCamp2022 from '@/pages/competitions/LoveDanceSummerCamp2022';
import ConventionSummerPicnic2022 from '@/pages/competitions/ConventionSummerPicnic2022';
import UpcomingCompetitions from '@/pages/competitions/UpcomingCompetitions';

// Page titles mapping
const pageTitles: { [key: string]: string } = {
  '/': 'LoveDanceLive - Global Dance Competition Platform',
  '/about': 'About LoveDanceLive - Our Story & Mission',
  '/competitions': 'Competitions - Regional & Grand Final Events',
  '/how-to-enter': 'How to Enter - Live & Online Submission',
  '/workshops': 'Workshops - Learn From the Best',
  '/online-classes': 'Online Classes Portal - Dance Anytime',
  '/results-videos': 'Results & Videos - Winners & Highlights',
  '/judges': 'Meet the Judges - Expert Panel',
  '/sponsors': 'Sponsors - Partner with LoveDanceLive',
  '/shop': 'Shop - Merchandise & Downloads',
  '/community': 'Community - Forums & Challenges',
  '/live-chat': 'Live Event Chat - Join the Conversation',
  '/challenges': 'Dance Challenges - Win Prizes',
  '/gallery': 'User Gallery - Share Your Moves',
  '/contact': 'Contact Us - Help & Support',
  '/account': 'Your Dashboard - Manage Entries & Purchases',
};

function App() {
  useEffect(() => {
    // Initialize demo data on app start with a delay to ensure API is ready
    const initData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
        await initializeDemoData();
      } catch (error) {
        console.error('Failed to initialize demo data:', error);
      }
    };
    
    initData();
  }, []);

  // Update page title based on route
  useEffect(() => {
    const currentPath = window.location.pathname;
    const title = pageTitles[currentPath] || 'LoveDanceLive - Global Dance Competition Platform';
    document.title = title;
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/competitions" element={<Competitions />} />
          <Route path="/how-to-enter" element={<HowToEnter />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/online-classes" element={<OnlineClasses />} />
          <Route path="/results-videos" element={<ResultsVideos />} />
          <Route path="/judges" element={<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Meet the Judges</h1><p className="text-base sm:text-lg text-muted-foreground">Expert Panel - Coming Soon!</p></div>} />
          <Route path="/sponsors" element={<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Sponsors</h1><p className="text-base sm:text-lg text-muted-foreground">Partner with LoveDanceLive - Coming Soon!</p></div>} />
          <Route path="/shop" element={<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Shop</h1><p className="text-base sm:text-lg text-muted-foreground">Merchandise & Downloads - Coming Soon!</p></div>} />
          <Route path="/community" element={<Community />} />
          <Route path="/live-chat" element={<LiveChat />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Your Dashboard</h1><p className="text-base sm:text-lg text-muted-foreground">Manage Entries & Purchases - Coming Soon!</p></div>} />
          <Route path="/performance-review-form" element={<PerformanceReviewForm />} />
          
          {/* Competition Pages */}
          <Route path="/competitions/royal-academy-dance-gala" element={<RoyalAcademyDanceGala />} />
          <Route path="/competitions/ibiza-2023-gala" element={<Ibiza2023Gala />} />
          <Route path="/competitions/lovedance-summer-camp-2023" element={<LoveDanceSummerCamp2023 />} />
          <Route path="/competitions/sadlers-wells-feb" element={<SadlersWellsFeb />} />
          <Route path="/competitions/sadlers-wells-nov" element={<SadlersWellsNov />} />
          <Route path="/competitions/lovedance-summer-camp-2022" element={<LoveDanceSummerCamp2022 />} />
          <Route path="/competitions/convention-summer-picnic-2022" element={<ConventionSummerPicnic2022 />} />
          <Route path="/competitions/upcoming" element={<UpcomingCompetitions />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
