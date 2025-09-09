
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface NavigationProps {
  onBack?: () => void;
  onHome?: () => void;
  title?: string;
  showHomeButton?: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onBack, 
  onHome, 
  title = "Navigation",
  showHomeButton = true 
}) => {
  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="outline" onClick={onBack} size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          </div>
          
          {showHomeButton && onHome && (
            <Button variant="outline" onClick={onHome} size="sm">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
