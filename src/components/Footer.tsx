import { Heart, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        "Competitions",
        "Workshops", 
        "Online Classes",
        "Live Events",
        "Results & Videos"
      ]
    },
    {
      title: "Community",
      links: [
        "Dancers",
        "Judges",
        "Instructors",
        "Live Chat",
        "Gallery"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Technical Support",
        "Community Guidelines",
        "Safety"
      ]
    },
    {
      title: "Company",
      links: [
        "About Us",
        "Careers",
        "Press",
        "Sponsors",
        "Partners"
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Heart className="h-8 w-8 text-dance-pink mr-2" />
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold">Love</span>
                <span className="text-xl font-bold text-dance-teal">Dance</span>
                <span className="text-xl font-bold text-dance-pink">Live</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting dancers worldwide through live competitions, online submissions, 
              and expert mentorship. Your stage awaits.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-dance-pink">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-dance-pink">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-dance-pink">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-dance-pink">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-gray-300 hover:text-dance-teal transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-600 pt-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-white mb-2">Stay in the Loop</h3>
            <p className="text-gray-300 mb-4">
              Get updates on competitions, workshops, and exclusive events.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-dance-teal"
              />
              <Button variant="dance">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © 2024 LoveDanceLive. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-dance-teal">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-dance-teal">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-dance-teal">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;