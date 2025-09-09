import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-poppins font-bold text-xl">
              <Heart className="h-8 w-8 text-neon-pink" />
              <span className="text-neon-pink">Love</span>
              <span className="text-primary">Dance</span>
              <span className="text-accent">Live</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Where Passion Meets Performance — Live & Online. Join the global dance community!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/competitions" className="text-muted-foreground hover:text-accent transition-colors">Competitions</Link></li>
              <li><Link to="/workshops" className="text-muted-foreground hover:text-accent transition-colors">Workshops</Link></li>
              <li><Link to="/online-classes" className="text-muted-foreground hover:text-accent transition-colors">Online Classes</Link></li>
              <li><Link to="/judges" className="text-muted-foreground hover:text-accent transition-colors">Meet the Judges</Link></li>
              <li><Link to="/results-videos" className="text-muted-foreground hover:text-accent transition-colors">Results & Videos</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-foreground">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/community" className="text-muted-foreground hover:text-accent transition-colors">Forums</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-accent transition-colors">Dance Challenges</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-accent transition-colors">User Gallery</Link></li>
              <li><Link to="/live-chat" className="text-muted-foreground hover:text-accent transition-colors">Live Event Chat</Link></li>
              <li>
                <Link 
                  to="/coming-soon" 
                  state={{ pageTitle: "Shop" }}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Shop
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-foreground">Contact</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hello@lovedancelive.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-DANCE</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>Global HQ: Virtual<br />Live Events: 5 Cities Worldwide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2024 LoveDanceLive. All rights reserved. | 
            <Link 
              to="/coming-soon" 
              state={{ pageTitle: "Privacy Policy" }}
              className="hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link> | 
            <Link 
              to="/coming-soon" 
              state={{ pageTitle: "Terms of Service" }}
              className="hover:text-accent transition-colors"
            >
              Terms of Service
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;