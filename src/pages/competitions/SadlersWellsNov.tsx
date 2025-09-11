import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Calendar, MapPin, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SoldOutOverlay } from '@/components/SoldOutOverlay';

const SadlersWellsNov = () => {
  const posterImage = '/lovable-uploads/82feaf7c-34b3-4b8b-820b-ab8eaa143a0c.png';
  
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
            Sadlers Wells Competition 2022
          </h1>
          <p className="text-xl text-primary-foreground/80">
            Competition • Sold Out
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Poster Section */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <img 
                src={posterImage} 
                alt="Sadlers Wells 2022 - Sold Out"
                className="w-full h-auto rounded-lg shadow-lg"
              />
              <SoldOutOverlay className="rounded-lg" />
            </div>

            {/* Event Details Section */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
                  Event Details
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>November 25, 2022</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>2:00 PM - 8:00 PM</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Sadlers Wells Theatre, London</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Dance Competition</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full bg-destructive hover:bg-destructive/90 cursor-not-allowed opacity-60"
                  disabled
                >
                  Register Now - SOLD OUT
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <Link to="/competitions">
                    <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                    Back to Competitions
                  </Link>
                </Button>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <p className="text-base text-foreground mb-4">
                    👉 Don't miss future events - check upcoming competitions
                  </p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to="/competitions/upcoming">
                      View Upcoming Events
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadlersWellsNov;