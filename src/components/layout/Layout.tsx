import React from 'react';
import Header from './Header';
import CountryBanner from './CountryBanner';
import StickyCTA from './StickyCTA';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showStickyCTA?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showStickyCTA = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <CountryBanner />
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
      
      {showStickyCTA && <StickyCTA />}
    </div>
  );
};

export default Layout;