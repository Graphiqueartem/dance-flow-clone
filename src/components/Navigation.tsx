import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import logo from "@/assets/logo.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Competitions", href: "/competitions" },
    { name: "Workshops", href: "/workshops" },
    { name: "Online Classes", href: "/online-classes" },
    { name: "Results & Videos", href: "/results" },
    { name: "Judges", href: "/judges" },
    { name: "Sponsors", href: "/sponsors" },
    { name: "Shop", href: "/shop" },
    { name: "Community", href: "/community" },
    { name: "Live Chat", href: "/live-chat" },
    { name: "Challenges", href: "/challenges" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
    { name: "Account", href: "/account" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-dance-teal text-white text-center py-2 px-4 text-sm">
        Join dancers live in <strong>Mexico City, Sydney, Johannesburg, Seoul, London</strong> — or submit your dance video from anywhere!
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-dance-pink mr-2" />
              <div className="flex items-center space-x-1">
                <span className="text-xl font-bold text-foreground">Love</span>
                <span className="text-xl font-bold text-dance-teal">Dance</span>
                <span className="text-xl font-bold text-dance-pink">Live</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Button variant="dance" className="bg-dance-pink hover:bg-dance-pink/90">
                Home
              </Button>
              <a href="#" className="text-muted-foreground hover:text-foreground">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Competitions</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Workshops</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Online Classes</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Results & Videos</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Judges</a>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button variant="outline" className="border-dance-pink text-dance-pink hover:bg-dance-pink hover:text-white">
                ▶ Enter Competition
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <Button variant="dance" className="w-full">
                  ▶ Enter Competition
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;