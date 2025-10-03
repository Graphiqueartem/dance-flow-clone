import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Heart, Play, Eye, Upload } from 'lucide-react';
import WelcomeModal from '@/components/onboarding/WelcomeModal';
import communityImage from '@/assets/community-dance.jpg';
const galleryHeroImage = '/lovable-uploads/47a64dda-9083-4c59-962a-605d69645979.png';
const featuredImage1 = '/lovable-uploads/7b552ba3-15eb-4c78-881a-39a59b4dde8c.png';
const featuredImage2 = '/lovable-uploads/ce1c8c79-cd7f-41eb-82b2-4635bcfa4eb0.png';

const Gallery = () => {
  useEffect(() => {
    document.title = "User Gallery - Share Your Moves | LoveDanceLive";
  }, []);

  const featuredVideos = [
    {
      title: "Amazing Hip Hop Performance",
      performer: "DanceAce23",
      views: "1.2K",
      likes: "156",
      genre: "Hip Hop",
      thumbnail: "Coming Soon"
    },
    {
      title: "Contemporary Masterpiece",
      performer: "FlowDancer",
      views: "890",
      likes: "98",
      genre: "Contemporary", 
      thumbnail: "Coming Soon"
    },
    {
      title: "Latin Fire Performance",
      performer: "SalsaQueen",
      views: "2.1K",
      likes: "203",
      genre: "Latin",
      thumbnail: "Coming Soon"
    }
  ];

  const getGenreColor = (genre: string) => {
    switch (genre) {
      case 'Hip Hop': return 'bg-purple-500';
      case 'Contemporary': return 'bg-blue-500';
      case 'Latin': return 'bg-red-500';
      case 'Ballet': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <WelcomeModal pageName="gallery" />
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={galleryHeroImage} 
            alt="Acrobatic dance group performance with dynamic formations and lifts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-6 text-white">
              User Gallery - Share Your Moves
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto">
              Your moves belong here. Upload your photos and videos to inspire dancers worldwide.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Button variant="outline" size="sm">All Genres</Button>
            <Button variant="outline" size="sm">Hip Hop</Button>
            <Button variant="outline" size="sm">Contemporary</Button>
            <Button variant="outline" size="sm">Latin</Button>
            <Button variant="outline" size="sm">Ballet</Button>
          </div>
          <Button className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Upload Video
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredVideos.map((video, index) => (
            <Card key={index} className="border-2 border-primary/20 hover:border-primary/40 transition-colors group cursor-pointer">
              <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-neon-pink/10 rounded-t-lg flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20 rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play className="h-12 w-12 text-white" />
                </div>
                <Camera className="h-16 w-16 text-muted-foreground" />
                <div className="absolute top-2 right-2">
                  <Badge className={`${getGenreColor(video.genre)} text-white`}>
                    {video.genre}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">by {video.performer}</p>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{video.views} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{video.likes} likes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-neon-pink/5 border-2 border-primary/20">
            <CardContent className="p-8">
              <Upload className="h-12 w-12 text-neon-pink mx-auto mb-4" />
              <h3 className="text-2xl font-poppins font-bold mb-4">Share Your Dance</h3>
              <p className="text-muted-foreground mb-6">
                The gallery is currently in development. Soon you'll be able to upload and share your dance performances with the global community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/registration">Get Notified When Live</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/performance-review-form">Submit for Review Instead</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Gallery;