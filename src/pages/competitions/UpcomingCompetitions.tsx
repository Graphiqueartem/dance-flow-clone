import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UpcomingCompetitions = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4">
            Upcoming Competitions
          </h1>
          <p className="text-lg sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Stay tuned for our next exciting dance competitions and events
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border-0 shadow-lg mb-8">
            <CardContent className="p-8 sm:p-12 text-center">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                New Events Coming Soon!
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're planning our next series of regional competitions and global events. 
                Be the first to know when registration opens!
              </p>
              
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Next Expected Regions:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Mexico City</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Sydney</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Johannesburg</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Seoul</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>London</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Dubai (Final)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button size="lg" asChild>
                  <Link to="/registration">
                    Get Notified When Registration Opens
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                
                <p className="text-sm text-muted-foreground">
                  Follow us on social media for the latest updates and announcements
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UpcomingCompetitions;