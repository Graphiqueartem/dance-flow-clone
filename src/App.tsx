import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
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
import PerformerRegistration from '@/components/PerformerRegistration';
import NotFound from '@/pages/NotFound';
import Auth from '@/pages/Auth';
import AdminDashboard from '@/pages/AdminDashboard';
import AdminLogin from '@/pages/AdminLogin';
import UserDashboard from '@/pages/UserDashboard';
import JudgeDashboardPage from '@/pages/JudgeDashboardPage';
import Judges from '@/pages/Judges';
import Events from '@/pages/Events';
import PaymentSuccess from '@/pages/PaymentSuccess';
import ComingSoon from '@/pages/ComingSoon';
import { AuthProvider } from '@/contexts/AuthContext';
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

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Auth routes (no layout) */}
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/judge-dashboard" element={<JudgeDashboardPage />} />
              
              {/* Main app routes (with layout) */}
              <Route path="/" element={<Layout><Home /></Layout>} />
              <Route path="/about" element={<Layout><About /></Layout>} />
              <Route path="/competitions" element={<Layout><Competitions /></Layout>} />
              <Route path="/how-to-enter" element={<Layout><HowToEnter /></Layout>} />
              <Route path="/workshops" element={<Layout><Workshops /></Layout>} />
              <Route path="/online-classes" element={<Layout><OnlineClasses /></Layout>} />
              <Route path="/results-videos" element={<Layout><ResultsVideos /></Layout>} />
              <Route path="/judges" element={<Layout><Judges /></Layout>} />
              <Route path="/sponsors" element={<Layout><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Sponsors</h1><p className="text-base sm:text-lg text-muted-foreground">Partner with LoveDanceLive - Coming Soon!</p></div></Layout>} />
              <Route path="/shop" element={<Layout><div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"><h1 className="text-3xl sm:text-4xl font-poppins font-bold mb-4 sm:mb-6">Shop</h1><p className="text-base sm:text-lg text-muted-foreground">Merchandise & Downloads - Coming Soon!</p></div></Layout>} />
              <Route path="/community" element={<Layout><Community /></Layout>} />
              <Route path="/live-chat" element={<Layout><LiveChat /></Layout>} />
              <Route path="/challenges" element={<Layout><Challenges /></Layout>} />
              <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
              <Route path="/news" element={<Layout><News /></Layout>} />
              <Route path="/contact" element={<Layout><Contact /></Layout>} />
              <Route path="/events" element={<Layout><Events /></Layout>} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/coming-soon" element={<Layout><ComingSoon /></Layout>} />
              <Route path="/account" element={<Layout><UserDashboard /></Layout>} />
              <Route path="/user-dashboard" element={<Layout><UserDashboard /></Layout>} />
              <Route path="/performance-review-form" element={<Layout><PerformanceReviewForm /></Layout>} />
              <Route path="/submit-performance" element={<Layout><PerformanceReviewForm /></Layout>} />
              <Route path="/registration" element={<PerformerRegistration />} />
              
              {/* Competition Pages */}
              <Route path="/competitions/royal-academy-dance-gala" element={<Layout><RoyalAcademyDanceGala /></Layout>} />
              <Route path="/competitions/ibiza-2023-gala" element={<Layout><Ibiza2023Gala /></Layout>} />
              <Route path="/competitions/lovedance-summer-camp-2023" element={<Layout><LoveDanceSummerCamp2023 /></Layout>} />
              <Route path="/competitions/sadlers-wells-feb" element={<Layout><SadlersWellsFeb /></Layout>} />
              <Route path="/competitions/sadlers-wells-nov" element={<Layout><SadlersWellsNov /></Layout>} />
              <Route path="/competitions/lovedance-summer-camp-2022" element={<Layout><LoveDanceSummerCamp2022 /></Layout>} />
              <Route path="/competitions/convention-summer-picnic-2022" element={<Layout><ConventionSummerPicnic2022 /></Layout>} />
              <Route path="/competitions/upcoming" element={<Layout><UpcomingCompetitions /></Layout>} />
              
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;