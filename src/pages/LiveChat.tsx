import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Video, Zap, Globe } from 'lucide-react';
import WelcomeModal from '@/components/onboarding/WelcomeModal';

const LiveChat = () => {
  useEffect(() => {
    document.title = "Live Event Chat - Join the Conversation | LoveDanceLive";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <WelcomeModal pageName="live-chat" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-6 bg-gradient-to-r from-primary via-neon-pink to-accent bg-clip-text text-transparent">
            Live Event Chat - Join the Conversation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Feel the energy during live battles! Chat, cheer, and connect with fans and dancers worldwide in real time.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-6 w-6 text-neon-pink" />
                Live Event Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-accent" />
                  Real-time chat during performances
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-accent" />
                  Q&A with judges and performers
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-accent" />
                  Global audience interaction
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Chat Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Be respectful and supportive</li>
                <li>• Encourage all performers</li>
                <li>• Follow community guidelines</li>
                <li>• Keep conversations relevant</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-neon-pink/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <Video className="h-12 w-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-2xl font-poppins font-bold mb-4">No Live Events Currently</h3>
              <p className="text-muted-foreground mb-6">
                Live chat will be available during our events. Check our competitions schedule for upcoming live performances!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/competitions">View Competitions</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/registration">Get Notifications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;