import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Download, Star, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const ResultsVideos = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            Results & Videos - Winners & Highlights
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Celebrate Excellence in Dance
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Celebrate Excellence
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Celebrate dancers from Mexico City, Sydney, Johannesburg, Seoul, and London. Watch highlights, download your performance videos, or order detailed critiques.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="#results">See Results</Link>
            </Button>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="#videos">Download Videos</Link>
            </Button>
          </div>
        </div>

        {/* Coming Soon Message */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <Star className="h-16 w-16 text-primary mx-auto mb-6" />
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                Coming Soon!
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Our results and video gallery is currently being prepared. Check back soon to see 
                amazing performances and download your competition videos.
              </p>
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/performance-review-form">Submit Your Performance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResultsVideos;