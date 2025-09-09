import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Music } from "lucide-react";

const UpcomingEvents = () => {
  const events = [
    {
      city: "Mexico City",
      date: "March 15, 2024",
      styles: ["Latin", "Contemporary"],
      status: "Live Competition",
      color: "dance-teal"
    },
    {
      city: "Sydney",
      date: "March 22, 2024", 
      styles: ["Hip-Hop", "Jazz"],
      status: "Live Competition",
      color: "dance-pink"
    },
    {
      city: "Seoul",
      date: "March 29, 2024",
      styles: ["K-Pop", "Street"],
      status: "Live Competition", 
      color: "dance-teal"
    },
    {
      city: "London",
      date: "April 5, 2024",
      styles: ["Ballet", "Modern"],
      status: "Live Competition",
      color: "dance-pink"
    },
    {
      city: "Johannesburg", 
      date: "April 12, 2024",
      styles: ["Afrobeat", "Contemporary"],
      status: "Live Competition",
      color: "dance-teal"
    },
    {
      city: "Online",
      date: "Ongoing",
      styles: ["All Styles"],
      status: "Video Submission",
      color: "dance-pink"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join live competitions in our featured cities or participate online
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="secondary" 
                    className={`${event.color === 'dance-teal' ? 'bg-dance-teal' : 'bg-dance-pink'} text-white`}
                  >
                    {event.status}
                  </Badge>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">
                  {event.city}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-start">
                  <Music className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                  <div>
                    <span className="font-semibold text-foreground">Styles: </span>
                    <span className="text-muted-foreground">
                      {event.styles.join(", ")}
                    </span>
                  </div>
                </div>
                
                <Button 
                  variant={event.color === 'dance-teal' ? 'default' : 'secondary'} 
                  className="w-full mt-4 group-hover:scale-105 transition-transform"
                >
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;