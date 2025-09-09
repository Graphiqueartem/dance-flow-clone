import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, DollarSign } from 'lucide-react';
import { SoldOutOverlay } from '@/components/SoldOutOverlay';

interface EventCardProps {
  id: string;
  title: string;
  description?: string;
  event_date?: string;
  location?: string;
  price?: number;
  poster_image_url?: string;
  status: 'upcoming' | 'current' | 'sold_out';
  event_type: 'competition' | 'workshop' | 'masterclass';
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  description,
  event_date,
  location,
  price,
  poster_image_url,
  status,
  event_type
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sold_out':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'competition':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'workshop':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      case 'masterclass':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 group">
      <div className="relative">
        {/* Event Poster */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-br from-primary/20 to-secondary/20">
          {poster_image_url ? (
            <img
              src={poster_image_url}
              alt={`${title} poster`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
              <div className="text-center text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                <p className="text-lg opacity-90 capitalize">{event_type}</p>
              </div>
            </div>
          )}
          
          {/* Sold Out Overlay */}
          {status === 'sold_out' && <SoldOutOverlay />}
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={getStatusColor(status)}>
              {status.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <Badge className={getTypeColor(event_type)}>
              {event_type.toUpperCase()}
            </Badge>
          </div>
        </div>

        {/* Event Details */}
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          <div className="space-y-2 mb-4">
            {event_date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(event_date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            )}
            
            {location && (
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                {location}
              </div>
            )}
            
            {price !== undefined && price > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-2" />
                ${price.toFixed(2)}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {status === 'sold_out' ? (
              <Button variant="secondary" disabled className="flex-1">
                Sold Out
              </Button>
            ) : (
              <>
                <Button className="flex-1">
                  {event_type === 'competition' ? 'Register' : 'Join'}
                </Button>
                <Button variant="outline" size="sm">
                  Details
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};