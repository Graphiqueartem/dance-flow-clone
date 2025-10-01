import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Play, Heart, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const competitionLinks = [
  { name: 'Upcoming Events', path: '/competitions/upcoming' },
  { name: 'How to Enter', path: '/how-to-enter' },
  { name: 'Royal Academy Dance Gala and Masterclass - 2023', path: '/competitions/royal-academy-dance-gala' },
  { name: 'Ibiza - 2023', path: '/competitions/ibiza-2023-gala' },
  { name: 'LoveDance Summer Camp - 2023', path: '/competitions/lovedance-summer-camp-2023' },
  { name: 'Sadlers Wells - 2023', path: '/competitions/sadlers-wells-feb' },
  { name: 'Sadlers Wells - 2022', path: '/competitions/sadlers-wells-nov' },
  { name: 'LoveDance Summer Camp - 2022', path: '/competitions/lovedance-summer-camp-2022' },
  { name: 'LoveDanceLive Convention Summer Picnic - 2022', path: '/competitions/convention-summer-picnic-2022' },
];

const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Competitions', path: '/competitions', hasDropdown: true },
  { name: 'Workshops', path: '/workshops' },
  { name: 'Online Classes', path: '/online-classes' },
  { name: 'Results & Videos', path: '/results-videos' },
  { name: 'Judges', path: '/judges' },
  { name: 'Sponsors', path: '/coming-soon' },
  { name: 'Shop', path: '/coming-soon' },
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
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
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
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-2 lg:py-3 gap-2 lg:gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 lg:space-x-2 font-poppins font-bold text-base lg:text-lg flex-shrink-0">
            <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-neon-pink" />
            <span className="text-neon-pink">Love</span>
            <span className="text-primary">Dance</span>
            <span className="text-accent">Live</span>
          </Link>

          {/* Desktop Navigation - Two Row Layout */}
          <nav className="hidden lg:block flex-1 min-w-0">
            {/* First Row */}
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 xl:space-x-6 mb-1">
              {navigationLinks.slice(0, 7).map((link) => (
                link.hasDropdown ? (
                  <div key={link.path} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
                        location.pathname === link.path || location.pathname.startsWith('/competitions/')
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/10'
                      }`}
                    >
                      {link.name}
                      <ChevronDown className={`ml-1 h-3 w-3 lg:h-4 lg:w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
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
                    className={`px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
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
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 xl:space-x-6">
              {navigationLinks.slice(7).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 lg:px-3 py-1 lg:py-1.5 text-xs lg:text-sm font-medium transition-colors hover:text-accent rounded-md whitespace-nowrap ${
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
          <div className="hidden lg:flex items-center space-x-1 lg:space-x-2 flex-shrink-0">
            {profile?.role === 'admin' && (
              <Button variant="secondary" size="sm" className="h-7 lg:h-8 px-2 lg:px-3 text-xs" asChild>
                <Link to="/admin">
                  <Settings className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-1" />
                  <span className="hidden xl:inline">Admin</span>
                </Link>
              </Button>
            )}
            {profile ? (
              <Button variant="outline" size="sm" className="h-7 lg:h-8 px-2 lg:px-3 text-xs" onClick={signOut}>
                <LogOut className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-1" />
                <span className="hidden xl:inline">Logout</span>
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="h-7 lg:h-8 px-2 lg:px-3 text-xs" asChild>
                <Link to="/auth">
                  Login
                </Link>
              </Button>
            )}
            <Button variant="outline" size="sm" className="h-7 lg:h-8 px-2 lg:px-3 text-xs" asChild>
              <Link to="/registration">
                <Play className="h-3 w-3 lg:h-4 lg:w-4 lg:mr-1" />
                <span className="hidden xl:inline">Enter</span>
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
          <div className="lg:hidden border-t border-border py-4 max-h-[calc(100vh-120px)] overflow-y-auto">
            <nav className="space-y-2 mb-4">
              {navigationLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                        className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                          location.pathname === link.path || location.pathname.startsWith('/competitions/')
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                        }`}
                      >
                        {link.name}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isMobileDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileDropdownOpen && (
                        <div className="pl-4 mt-2 space-y-1 max-h-60 overflow-y-auto border-l-2 border-accent/20">
                          {competitionLinks.map((compLink) => (
                            <Link
                              key={compLink.path}
                              to={compLink.path}
                              className="block px-3 py-2 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors rounded-md"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMobileDropdownOpen(false);
                              }}
                            >
                              {compLink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                        location.pathname === link.path
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons - Always visible at bottom */}
            <div className="sticky bottom-0 bg-background/95 backdrop-blur pt-4 border-t border-border mt-4 space-y-2">
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
              <Button variant="default" size="sm" className="w-full" asChild>
                <Link to="/registration" onClick={() => setIsMenuOpen(false)}>
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