import React from 'react';
import { Globe } from 'lucide-react';

const CountryBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center space-x-2 text-sm font-medium">
          <Globe className="h-4 w-4 flex-shrink-0" />
          <span className="text-center">
            Join dancers live in <strong>Mexico City, Sydney, Johannesburg, Seoul, London</strong> — or submit your dance video from anywhere!
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountryBanner;