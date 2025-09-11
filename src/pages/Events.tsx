import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Trophy, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventCard } from '@/components/EventCard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import competitionImage from '@/assets/competition-stage.jpg';
import competitionPoster from '@/assets/event-poster-competition-1.jpg';
import workshopPoster from '@/assets/event-poster-workshop-1.jpg';
import masterclassPoster from '@/assets/event-poster-masterclass-1.jpg';
import soldOutPoster from '@/assets/sold-out-poster.jpg';
const eventsHeroImage = '/lovable-uploads/ce1c8c79-cd7f-41eb-82b2-4635bcfa4eb0.png';

interface Event {
  id: string;
  title: string;
  description?: string;
  event_date?: string;
  location?: string;
  price?: number;
  poster_image_url?: string;
  status: 'upcoming' | 'current' | 'sold_out';
  event_type: 'competition' | 'workshop' | 'masterclass';
  created_at?: string;
  updated_at?: string;
}

const Events: React.FC = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'upcoming' | 'current' | 'sold_out'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'competition' | 'workshop' | 'masterclass'>('all');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

      if (error) throw error;
      
      // Map poster images properly for all events
      const eventsWithPosters = (data as Event[])?.map(event => {
        let posterUrl = event.poster_image_url;
        
        // If event is sold out, use the sold out poster
        if (event.status === 'sold_out') {
          posterUrl = soldOutPoster;
        } else {
          // Otherwise map based on event type
          if (event.event_type === 'competition') {
            posterUrl = competitionPoster;
          } else if (event.event_type === 'workshop') {
            posterUrl = workshopPoster;
          } else if (event.event_type === 'masterclass') {
            posterUrl = masterclassPoster;
          }
        }
        
        return {
          ...event,
          poster_image_url: posterUrl
        };
      }) || [];
      
      setEvents(eventsWithPosters);
    } catch (error) {
      console.error('Error loading events:', error);
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredEvents = events.filter(event => {
    const matchesStatus = selectedFilter === 'all' || event.status === selectedFilter;
    const matchesType = selectedType === 'all' || event.event_type === selectedType;
    return matchesStatus && matchesType;
  });

  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
  const currentEvents = filteredEvents.filter(event => event.status === 'current');
  const soldOutEvents = filteredEvents.filter(event => event.status === 'sold_out');

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={eventsHeroImage} 
            alt="Children's dance performance in colorful costumes on stage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Calendar className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4 text-white">
              Dance Events
            </h1>
            <p className="text-lg sm:text-xl font-open-sans text-white/90 max-w-2xl mx-auto">
              Competitions, workshops, and masterclasses from around the world
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Filter Controls */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex gap-2">
                <span className="text-sm font-medium self-center">Status:</span>
                {(['all', 'upcoming', 'current', 'sold_out'] as const).map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter === 'all' ? 'All Status' : filter.replace('_', ' ').toUpperCase()}
                  </Button>
                ))}
              </div>
              <div className="flex gap-2">
                <span className="text-sm font-medium self-center">Type:</span>
                {(['all', 'competition', 'workshop', 'masterclass'] as const).map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedType(type)}
                  >
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        ) : (
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Events ({filteredEvents.length})</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming ({upcomingEvents.length})</TabsTrigger>
              <TabsTrigger value="current">Current ({currentEvents.length})</TabsTrigger>
              <TabsTrigger value="sold_out">Sold Out ({soldOutEvents.length})</TabsTrigger>
            </TabsList>

            {/* All Events */}
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No events found</h3>
                  <p className="text-muted-foreground mb-6">
                    No events match your current filters.
                  </p>
                  <Button onClick={() => { setSelectedFilter('all'); setSelectedType('all'); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Upcoming Events */}
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No upcoming events</h3>
                  <p className="text-muted-foreground">
                    Check back soon for new events!
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Current Events */}
            <TabsContent value="current">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              {currentEvents.length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No current events</h3>
                  <p className="text-muted-foreground">
                    No events are currently running.
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Sold Out Events */}
            <TabsContent value="sold_out">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {soldOutEvents.map((event) => (
                  <EventCard key={event.id} {...event} />
                ))}
              </div>
              {soldOutEvents.length === 0 && (
                <div className="text-center py-12">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No sold out events</h3>
                  <p className="text-muted-foreground">
                    Popular events that are fully booked will appear here.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Ready to Dance?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Join one of our events or submit your performance online to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/performance-review-form">Submit Performance</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Get More Info</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Events;