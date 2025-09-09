import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const News = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Newspaper className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            News & Updates
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Stay Connected with LoveDanceLive
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Stay in the Loop
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stay in the loop with the latest event announcements, blog posts, and press coverage.
          </p>
        </div>

        {/* Coming Soon */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Blog Coming Soon!
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Our news section and blog are being prepared with exciting content about dance, 
                competitions, and community stories.
              </p>
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/performance-review-form">Read the Blog</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;