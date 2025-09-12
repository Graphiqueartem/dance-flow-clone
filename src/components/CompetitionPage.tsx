import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowRight, Calendar, MapPin, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { SoldOutOverlay } from '@/components/SoldOutOverlay';
import soldOutPoster from '@/assets/sold-out-poster.jpg';

interface CompetitionPageProps {
  title: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  price: number;
  poster_image_url: string;
  status: 'upcoming' | 'current' | 'sold_out';
  event_type: 'competition' | 'workshop' | 'masterclass';
}

const CompetitionPage: React.FC<CompetitionPageProps> = ({ title }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('title', title)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error loading event:', error);
        } else if (data) {
          setEvent(data as Event);
        }
      } catch (error) {
        console.error('Error loading event:', error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [title]);

  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading event...</p>
        </div>
      </div>
    );
  }

  const isSoldOut = event?.status === 'sold_out';

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sold Out Banner - only show if sold out */}
      {isSoldOut && (
        <div className="bg-destructive text-destructive-foreground py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-lg sm:text-xl font-bold">SOLD OUT</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-poppins font-bold mb-4">
            {title}
          </h1>
          {event && (
            <p className="text-xl text-primary-foreground/80 capitalize">
              {event.event_type} • {event.status.replace('_', ' ')}
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {isSoldOut ? (
            /* Sold Out Content */
            <div className="text-center">
              <Card className="bg-white border-0 shadow-lg">
                <CardContent className="p-8 sm:p-12">
                  {/* Sold Out Poster */}
                  <div className="relative mb-8 max-w-md mx-auto">
                    <img 
                      src={soldOutPoster} 
                      alt="Sold Out Event"
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
          ) : (
            /* Regular Event Content */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Poster */}
              <div className="relative">
                <img 
                  src={event?.poster_image_url || soldOutPoster} 
                  alt={title}
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold mb-4">Event Details</h2>
                    
                    {event?.description && (
                      <p className="text-muted-foreground mb-6">{event.description}</p>
                    )}

                    <div className="space-y-4">
                      {event?.event_date && (
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>{new Date(event.event_date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                      )}

                      {event?.location && (
                        <div className="flex items-center gap-3">
                          <MapPin className="h-5 w-5 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      {event?.price && (
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-5 w-5 text-primary" />
                          <span>${event.price}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 space-y-4">
                      <Button size="lg" className="w-full" asChild>
                        <Link to="/registration">Register Now</Link>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" asChild>
                        <Link to="/competitions">Back to Competitions</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionPage;