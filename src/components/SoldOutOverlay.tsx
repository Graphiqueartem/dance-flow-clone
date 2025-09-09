import React from 'react';
import { cn } from '@/lib/utils';

interface SoldOutOverlayProps {
  className?: string;
}

export const SoldOutOverlay: React.FC<SoldOutOverlayProps> = ({ className }) => {
  return (
    <div className={cn("absolute inset-0 flex items-center justify-center z-10", className)}>
      {/* Diagonal overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Diagonal banner */}
      <div className="relative transform -rotate-45 bg-destructive text-destructive-foreground px-8 py-2 shadow-lg">
        <div className="font-bold text-lg tracking-wide">
          SOLD OUT
        </div>
      </div>
      
      {/* Corner ribbons for extra emphasis */}
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[50px] border-l-destructive border-b-[50px] border-b-transparent" />
      <div className="absolute bottom-0 left-0 w-0 h-0 border-r-[50px] border-r-destructive border-t-[50px] border-t-transparent" />
    </div>
  );
};