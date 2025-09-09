// Update this page (the content is just a fallback if you fail to update the page)

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import GlobalCommunity from "@/components/GlobalCommunity";
import UpcomingEvents from "@/components/UpcomingEvents";
import MasterCraft from "@/components/MasterCraft";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <GlobalCommunity />
      <UpcomingEvents />
      <MasterCraft />
      <Footer />
    </div>
  );
};

export default Index;
