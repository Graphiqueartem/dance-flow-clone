import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Calendar, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import competitionImage from '@/assets/competition-stage.jpg';
const heroImage = '/lovable-uploads/ce1c8c79-cd7f-41eb-82b2-4635bcfa4eb0.png';

const Competitions = () => {
  const regionalEvents = [
    {
      city: 'Mexico City',
      date: 'March 15-17, 2024',
      venue: 'Teatro de la Ciudad',
      flag: '🇲🇽'
    },
    {
      city: 'Sydney',
      date: 'April 20-22, 2024',
      venue: 'Sydney Opera House',
      flag: '🇦🇺'
    },
    {
      city: 'Johannesburg',
      date: 'May 18-20, 2024',
      venue: 'Joburg Theatre',
      flag: '🇿🇦'
    },
    {
      city: 'Seoul',
      date: 'June 15-17, 2024',
      venue: 'Seoul Arts Center',
      flag: '🇰🇷'
    },
    {
      city: 'London',
      date: 'July 20-22, 2024',
      venue: 'Royal Albert Hall',
      flag: '🇬🇧'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Children's dance performance in colorful costumes on stage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4 text-white">
              Competitions - Regional & Grand Final Events
            </h1>
            <p className="text-lg sm:text-xl font-open-sans text-white/90 max-w-2xl mx-auto">
              Showcase your talent on the global stage
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Compete Live or Online
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Compete live in your city or submit your dance video from anywhere to qualify for the Grand Final in Dubai. Join thousands of dancers from Mexico City to London and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="#events">View Event Dates</Link>
            </Button>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/registration">Register Now</Link>
            </Button>
          </div>
        </div>

        {/* Regional Events */}
        <div id="events" className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground text-center mb-8">
            Regional Events 2024
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {regionalEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3">{event.flag}</div>
                  <CardTitle className="text-xl font-poppins font-bold text-foreground">
                    {event.city}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-center">
                    <div className="flex items-center justify-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center justify-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90" 
                      asChild
                    >
                      <Link to="/performance-review-form">Register</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Grand Final */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-accent/10 border-accent/20 max-w-4xl mx-auto">
            <CardContent className="p-8 sm:p-12 text-center">
              <Star className="h-16 w-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Grand Final - Dubai 2024
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                The ultimate dance showdown bringing together the best performers from all regional events 
                and top online submissions. Experience the pinnacle of global dance competition.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground">Date</h4>
                  <p className="text-muted-foreground">December 15-17, 2024</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Venue</h4>
                  <p className="text-muted-foreground">Dubai Opera</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Prize Pool</h4>
                  <p className="text-muted-foreground">$100,000</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/performance-review-form">Qualify Now</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Buy Tickets</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Online Submission */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Can't Attend Live Events?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Submit your dance video online and compete for a spot in the Grand Final. 
                Our expert judges review every submission with the same care and attention.
              </p>
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/performance-review-form">Submit Video Online</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Competitions;