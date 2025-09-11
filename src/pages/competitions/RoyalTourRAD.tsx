import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SoldOutOverlay } from '@/components/SoldOutOverlay';

const RoyalTourRAD = () => {
  const posterImage = '/lovable-uploads/3acd1d86-dbf0-404d-bf7a-dedb6f8233be.png';
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sold Out Banner */}
      <div className="bg-destructive text-destructive-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            <span className="text-lg sm:text-xl font-bold">SOLD OUT</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4">
            Royal Academy Tour
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Competition • Sold Out
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8 sm:p-12">
                {/* Sold Out Poster with Overlay */}
                <div className="relative mb-8 max-w-md mx-auto">
                  <img 
                    src={posterImage} 
                    alt="Royal Academy Tour - Sold Out"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  <SoldOutOverlay className="rounded-lg" />
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                    Event Sold Out
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    This event has reached capacity, but don't worry!
                  </p>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                  <p className="text-base sm:text-lg text-foreground mb-4">
                    👉 Please check here for upcoming events
                  </p>
                  <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link to="/competitions/upcoming">
                      View Upcoming Events
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoyalTourRAD;