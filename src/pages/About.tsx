import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Globe, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Heart className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            About LoveDanceLive
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Our Story & Mission
          </p>
        </div>
      </div>

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
                LoveDanceLive was born from a simple idea: bring dancers from every corner of the world together. 
                We blend live competition energy with the power of digital connection, creating a platform that 
                celebrates talent, culture, and creativity. Our mission is to empower dancers and build a global 
                family through the joy of dance.
              </p>
              <div className="text-center">
                <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/contact">Meet the Team</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
                  <Link to="/performance-review-form">Enter Competition</Link>
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