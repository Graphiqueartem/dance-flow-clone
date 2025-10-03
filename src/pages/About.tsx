import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Globe, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePageContent } from '@/hooks/usePageContent';
const heroImage = '/lovable-uploads/7b552ba3-15eb-4c78-881a-39a59b4dde8c.png';
const communityImage1 = '/lovable-uploads/d2c069b1-e51d-49e4-abab-48fe272bce2a.png';
const communityImage2 = '/lovable-uploads/b0860258-46f0-4e90-abc6-5f88cb2d3f46.png';

const About = () => {
  const { getContent, loading } = usePageContent('about');
  
  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Contemporary dance performance showcasing artistic movement" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Heart className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4 text-white">
              About LoveDanceLive - Our Story & Mission
            </h1>
            <p className="text-lg sm:text-xl font-open-sans text-white/90 max-w-2xl mx-auto">
              Connecting dancers worldwide through passion and performance
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
                  Our Story
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                LoveDanceLive brings together dancers from Mexico City, Sydney, Johannesburg, Seoul, and London, creating a global family united by passion. Our mission is to empower dancers of all backgrounds through live competition and online connection.
              </p>
              <div className="text-center">
                <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link 
                    to="/coming-soon" 
                    state={{ pageTitle: "Meet the Team" }}
                  >
                    Meet the Team
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dance Community Images */}
        <div className="mb-12 sm:mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Dance Community</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Celebrating the artistry and passion of dancers from around the world.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <img 
                src={communityImage1} 
                alt="Group of dancers performing synchronized jump movement"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="aspect-video overflow-hidden rounded-lg shadow-lg">
              <img 
                src={communityImage2} 
                alt="Acrobatic dance group performing dynamic choreography"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="bg-turquoise/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <Users className="h-12 w-12 text-turquoise mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">Global Community</h3>
              <p className="text-muted-foreground">
                Connecting dancers from Mexico City to Seoul, Sydney to Johannesburg, and everywhere in between.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-baby-pink/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <Award className="h-12 w-12 text-baby-pink mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                We celebrate the highest standards of dance artistry and provide platforms for growth.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-light-blue/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <Heart className="h-12 w-12 text-light-blue mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">Passion</h3>
              <p className="text-muted-foreground">
                Every movement tells a story. We honor the passion and dedication that drives every dancer.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Ready to Join Our Global Family?
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a seasoned performer or just starting your dance journey, 
                there's a place for you in the LoveDanceLive community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/registration">Enter Competition</Link>
              </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/competitions">View Events</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;