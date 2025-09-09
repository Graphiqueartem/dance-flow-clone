import React from 'react';
import { cn } from '@/lib/utils';

interface SoldOutOverlayProps {
  className?: string;
}

export const SoldOutOverlay: React.FC<SoldOutOverlayProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center z-10", className)}>
      {/* Semi-transparent dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Sold out ticket style banner matching the uploaded image */}
      <div className="relative">
        {/* Main ticket body */}
        <div 
          className="relative bg-red-500 text-white px-8 py-6 shadow-2xl transform -rotate-12"
          style={{
            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
            clipPath: 'polygon(0% 0%, 95% 0%, 100% 15%, 100% 85%, 95% 100%, 0% 100%, 5% 85%, 5% 15%)'
          }}
        >
          {/* Ticket perforations effect */}
          <div className="absolute left-0 top-0 h-full w-2 bg-red-600 opacity-50" 
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 12px)' }}>
          </div>
          <div className="absolute right-0 top-0 h-full w-2 bg-red-600 opacity-50"
               style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(0,0,0,0.3) 8px, rgba(0,0,0,0.3) 12px)' }}>
          </div>
          
          {/* Text content */}
          <div className="text-center relative z-10">
            <div className="text-xl font-bold mb-1 tracking-wider" style={{ fontFamily: 'cursive' }}>
              Sorry,
            </div>
            <div className="text-2xl font-black tracking-widest">
              THIS EVENT IS
            </div>
            <div className="text-4xl font-black tracking-widest mt-1">
              SOLD OUT
            </div>
          </div>
          
          {/* Shadow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none"></div>
        </div>
        
        {/* Ticket shadow */}
        <div 
          className="absolute top-2 left-2 w-full h-full bg-black/30 -z-10 transform -rotate-12"
          style={{ clipPath: 'polygon(0% 0%, 95% 0%, 100% 15%, 100% 85%, 95% 100%, 0% 100%, 5% 85%, 5% 15%)' }}>
        </div>
      </div>
    </div>
  );
};