import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gift, Star, Calendar, Users } from 'lucide-react';
import WelcomeModal from '@/components/onboarding/WelcomeModal';

const Challenges = () => {
  useEffect(() => {
    document.title = "Dance Challenges - Win Prizes | LoveDanceLive";
  }, []);

  const upcomingChallenges = [
    {
      title: "Hip Hop Freestyle Friday",
      description: "Show us your best hip hop moves in a 60-second freestyle",
      prize: "$500 Cash Prize",
      endDate: "Coming Soon",
      participants: 0,
      difficulty: "Beginner"
    },
    {
      title: "Contemporary Storytelling",
      description: "Tell a story through contemporary dance movements",
      prize: "Masterclass with Pro Judge",
      endDate: "Coming Soon", 
      participants: 0,
      difficulty: "Intermediate"
    },
    {
      title: "Latin Fusion Challenge",
      description: "Blend different Latin dance styles in one performance",
      prize: "Featured Performance Spot",
      endDate: "Coming Soon",
      participants: 0,
      difficulty: "Advanced"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WelcomeModal pageName="challenges" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-6 bg-gradient-to-r from-primary via-neon-pink to-accent bg-clip-text text-transparent">
            Dance Challenges - Win Prizes
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Show your skills in our monthly dance challenges. Submit videos or tag on social media to win prizes and be featured.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-poppins font-bold mb-6">Upcoming Challenges</h2>
              <div className="space-y-6">
                {upcomingChallenges.map((challenge, index) => (
                  <Card key={index} className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{challenge.title}</CardTitle>
                        <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{challenge.description}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Gift className="h-4 w-4 text-neon-pink" />
                          <span className="font-medium">{challenge.prize}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span>{challenge.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-primary" />
                          <span>{challenge.participants} participants</span>
                        </div>
                      </div>
                      <Button variant="outline" disabled>
                        Coming Soon
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/5 to-neon-pink/5 border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-neon-pink" />
                  Challenge Rules
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Original choreography only</li>
                  <li>• Video quality: 720p minimum</li>
                  <li>• Duration: 30 seconds to 2 minutes</li>
                  <li>• Family-friendly content only</li>
                  <li>• One entry per challenge</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-accent" />
                  Prizes & Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Cash prizes up to $1,000</li>
                  <li>• Free masterclasses</li>
                  <li>• Featured performance spots</li>
                  <li>• Judge mentorship sessions</li>
                  <li>• LoveDanceLive merchandise</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-neon-pink/20">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Ready to Dance?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Challenges are launching soon! Be the first to know.
                </p>
              <Button className="w-full" asChild>
                <Link to="/registration">Get Notified</Link>
              </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;