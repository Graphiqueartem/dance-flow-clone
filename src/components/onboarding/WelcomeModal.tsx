import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

interface WelcomeModalProps {
  pageName: string;
  onClose?: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ pageName, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen this welcome modal before
    const hasSeenWelcome = localStorage.getItem(`welcome_${pageName}_seen`);
    
    if (!hasSeenWelcome) {
      // Show modal after a short delay
      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    }
  }, [pageName]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(`welcome_${pageName}_seen`, 'true');
    onClose?.();
  };

  const getContent = () => {
    switch (pageName) {
      case 'community':
        return {
          title: 'Welcome to the Community!',
          description: 'Connect with dancers from Mexico City, Sydney, Johannesburg, Seoul, London, and beyond. Share tips, find friends, and keep dancing year-round.',
          tips: [
            'Create your profile to join discussions',
            'Participate in weekly challenges',
            'Share your dance journey with others',
            'Get inspired by our global community'
          ]
        };
      case 'live-chat':
        return {
          title: 'Live Event Chat Guidelines',
          description: 'Feel the energy during live battles! Chat, cheer, and connect with fans and dancers worldwide in real time.',
          tips: [
            'Be respectful and supportive of all performers',
            'Encourage dancers with positive comments',
            'Follow community guidelines at all times',
            'Keep conversations relevant to the event'
          ]
        };
      case 'challenges':
        return {
          title: 'Dance Challenges - Win Prizes!',
          description: 'Show your skills in our monthly dance challenges. Submit videos or tag on social media to win prizes and be featured.',
          tips: [
            'Check new challenges every month',
            'Submit original choreography only',
            'Tag @lovedancelive on social media',
            'Video quality: 720p minimum, 30sec-2min duration'
          ]
        };
      case 'gallery':
        return {
          title: 'Share Your Dance Moves!',
          description: 'Your moves belong here. Upload your photos and videos to inspire dancers worldwide.',
          tips: [
            'Upload high-quality photos and videos',
            'Add descriptive titles and tags',
            'Engage with other dancers\' content',
            'Build your dance portfolio'
          ]
        };
      default:
        return {
          title: 'Welcome to LoveDanceLive!',
          description: 'Where Passion Meets Performance — Live & Online. Join dancers from around the world!',
          tips: [
            'Explore our global competitions',
            'Submit your dance videos online',
            'Learn from expert instructors',
            'Connect with our dance community'
          ]
        };
    }
  };

  const content = getContent();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="absolute right-4 top-4"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogTitle className="text-2xl font-poppins">{content.title}</DialogTitle>
          <DialogDescription className="text-base">
            {content.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <h4 className="font-semibold text-sm text-foreground">Quick Tips:</h4>
          <ul className="space-y-2">
            {content.tips.map((tip, index) => (
              <li key={index} className="flex items-start text-sm text-muted-foreground">
                <span className="text-accent mr-2">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleClose}
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Got it!
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem(`welcome_${pageName}_seen`);
              handleClose();
            }}
            className="flex-1"
          >
            Show Again Next Time
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;