import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Play, Heart, ChevronDown } from 'lucide-react';

const competitionLinks = [
  { name: 'How to Enter', path: '/how-to-enter' },
  { name: 'Royal Academy Dance Gala and Masterclass', path: '/competitions/royal-academy-dance-gala' },
  { name: 'Royal Tour RAD Flights Hotels', path: '/competitions/royal-tour-rad' },
  { name: 'Ibiza 2023 Gala/Masterclass', path: '/competitions/ibiza-2023-gala' },
  { name: 'Masterclasses', path: '/competitions/masterclasses' },
  { name: 'LoveDance Summer Camp 2023', path: '/competitions/lovedance-summer-camp-2023' },
  { name: 'Sadlers Wells Competition FEB', path: '/competitions/sadlers-wells-feb' },
  { name: 'Sadlers Wells Competition NOV', path: '/competitions/sadlers-wells-nov' },
  { name: 'LoveDance Summer Camp 2022', path: '/competitions/lovedance-summer-camp-2022' },
  { name: 'LoveDanceLive Convention Summer Picnic 2022', path: '/competitions/convention-summer-picnic-2022' },
  { name: 'Upcoming Events', path: '/competitions/upcoming' },
];

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Competitions', path: '/competitions', hasDropdown: true },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Online Classes', path: '/online-classes' },
  { name: 'Results & Videos', path: '/results-videos' },
  { name: 'Judges', path: '/judges' },
  { name: 'Sponsors', path: '/sponsors' },
  { name: 'Shop', path: '/shop' },
  { name: 'Community', path: '/community' },
  { name: 'Live Chat', path: '/live-chat' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
  { name: 'Account', path: '/account' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-poppins font-bold text-xl">
            <Heart className="h-8 w-8 text-neon-pink" />
            <span className="text-neon-pink">Love</span>
            <span className="text-primary">Dance</span>
            <span className="text-accent">Live</span>
          </Link>

          {/* Desktop Navigation - Two Row Layout */}
          <nav className="hidden lg:flex flex-col items-center space-y-3">
            {/* Row 1: Home | About | Competitions | Workshops | Online Classes | Results | Judges */}
            <div className="flex items-center space-x-8">
              {navigationLinks.slice(0, 7).map((link) => (
                link.hasDropdown ? (
                  <div key={link.path} className="relative group">
                    <Link
                      to={link.path}
                      className={`flex items-center px-4 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
                        location.pathname === link.path || location.pathname.startsWith('/competitions/')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/10'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </Link>
                    <div className="absolute top-full left-0 mt-1 w-80 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-2">
                        {competitionLinks.map((compLink) => (
                          <Link
                            key={compLink.path}
                            to={compLink.path}
                            className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {compLink.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
                      location.pathname === link.path
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/10'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>
            
            {/* Row 2: Sponsors | Shop | Community | Live Chat | Challenges | Gallery | Contact | Account */}
            <div className="flex items-center space-x-8">
              {navigationLinks.slice(7).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
                    location.pathname === link.path
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/10'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="outline" size="sm" asChild>
              <Link to="/performance-review-form">
                <Play className="h-4 w-4 mr-2" />
                Enter Competition
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                      location.pathname === link.path || (link.hasDropdown && location.pathname.startsWith('/competitions/'))
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 mt-2 space-y-1">
                      {competitionLinks.map((compLink) => (
                        <Link
                          key={compLink.path}
                          to={compLink.path}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors rounded-md"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {compLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="mt-4 space-y-2">
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/performance-review-form" onClick={() => setIsMenuOpen(false)}>
                  <Play className="h-4 w-4 mr-2" />
                  Enter Competition
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;