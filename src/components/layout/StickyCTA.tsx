import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Upload } from 'lucide-react';

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
            <Button variant="outline" size="sm" asChild className="flex-1 min-w-0 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/how-to-enter" className="flex items-center justify-center">
                <Play className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Sign Up to Enter</span>
              </Link>
            </Button>
            <Button size="sm" asChild className="flex-1 min-w-0 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/how-to-enter" className="flex items-center justify-center">
                <Upload className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">Submit Your Dance Video</span>
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;