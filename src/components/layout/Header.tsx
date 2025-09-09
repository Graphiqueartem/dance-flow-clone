import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Play, Heart, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const competitionLinks = [
  { name: 'How to Enter', path: '/how-to-enter' },
  { name: 'Royal Academy Dance Gala and Masterclass', path: '/competitions/royal-academy-dance-gala' },
  { name: 'Ibiza 2023 Gala/Masterclass', path: '/competitions/ibiza-2023-gala' },
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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { profile, signOut } = useAuth();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4 min-h-[88px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-poppins font-bold text-xl">
            <Heart className="h-8 w-8 text-neon-pink" />
            <span className="text-neon-pink">Love</span>
            <span className="text-primary">Dance</span>
            <span className="text-accent">Live</span>
          </Link>

          {/* Desktop Navigation - Two Row Layout */}
          <nav className="hidden xl:block">
            {/* First Row */}
            <div className="flex items-center justify-center space-x-6 mb-2">
              {navigationLinks.slice(0, 7).map((link) => (
                link.hasDropdown ? (
                  <div key={link.path} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center px-3 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
                        location.pathname === link.path || location.pathname.startsWith('/competitions/')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/10'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-80 bg-popover border border-border rounded-md shadow-lg z-50">
                        <div className="py-2 max-h-96 overflow-y-auto">
                          {competitionLinks.map((compLink) => (
                            <Link
                              key={compLink.path}
                              to={compLink.path}
                              className="block px-4 py-2 text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {compLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
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
            
            {/* Second Row */}
            <div className="flex items-center justify-center space-x-6">
              {navigationLinks.slice(7).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
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
            {profile?.role === 'admin' && (
              <Button variant="secondary" size="sm" asChild>
                <Link to="/admin">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin
                </Link>
              </Button>
            )}
            {profile ? (
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">
                  Login
                </Link>
              </Button>
            )}
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
            className="xl:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden border-t border-border py-4 max-h-[calc(100vh-80px)] overflow-y-auto">
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
                    <div className="pl-4 mt-2 space-y-1 max-h-60 overflow-y-auto">
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
              {profile?.role === 'admin' && (
                <Button variant="secondary" size="sm" className="w-full" asChild>
                  <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </Link>
                </Button>
              )}
              {profile ? (
                <Button variant="outline" size="sm" className="w-full" onClick={() => {
                  signOut();
                  setIsMenuOpen(false);
                }}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </Button>
              )}
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