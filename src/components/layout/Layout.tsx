import React from 'react';
import Header from './Header';
import CountryBanner from './CountryBanner';
import StickyCTA from './StickyCTA';
import Footer from './Footer';
import ChatBot from '@/components/chatbot/ChatBot';

interface LayoutProps {
  children: React.ReactNode;
  showStickyCTA?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showStickyCTA = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CountryBanner />
      <Header />
      
      <main className="flex-1" style={{ paddingBottom: showStickyCTA ? '88px' : '0' }}>
        {children}
      </main>
      
      <Footer />
      
      {showStickyCTA && <StickyCTA />}
      <ChatBot />
    </div>
  );
};

export default Layout;