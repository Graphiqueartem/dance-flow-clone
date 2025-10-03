import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Trophy, Heart } from 'lucide-react';
import WelcomeModal from '@/components/onboarding/WelcomeModal';

const Community = () => {
  useEffect(() => {
    document.title = "Community - Forums & Challenges | LoveDanceLive";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <WelcomeModal pageName="community" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-6 bg-gradient-to-r from-primary via-neon-pink to-accent bg-clip-text text-transparent">
              Community - Forums & Challenges
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with dancers worldwide, share your passion, and participate in community challenges
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-neon-pink" />
                Forums
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Connect with dancers from Mexico City, Sydney, Johannesburg, Seoul, London, and beyond. Share tips, find friends, and keep dancing year-round.
              </p>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-accent" />
                Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Show your skills in our monthly dance challenges. Submit videos or tag on social media to win prizes and be featured.
              </p>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-neon-pink/20 hover:border-neon-pink/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Join or create groups based on dance styles, locations, or skill levels.
              </p>
              <Button variant="outline" className="w-full">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-neon-pink/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-2xl font-poppins font-bold mb-4">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">
                Our community features are currently in development. Join our newsletter to be the first to know when they launch!
              </p>
              <Button size="lg" asChild>
                <Link to="/registration">Subscribe to Updates</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Community;