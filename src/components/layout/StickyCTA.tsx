import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, Upload } from 'lucide-react';

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center space-x-4">
            <Button variant="outline" size="sm" asChild className="flex-1 max-w-xs">
              <Link to="/performance-review-form">
                <Play className="h-4 w-4 mr-2" />
                Enter Competition
              </Link>
            </Button>
            <Button size="sm" className="flex-1 max-w-xs" asChild>
              <Link to="/performance-review-form">
                <Upload className="h-4 w-4 mr-2" />
                Submit Your Dance Video
              </Link>
            </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;