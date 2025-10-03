import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Upload, Users, Trophy, Calendar, Star, ArrowRight, Globe, Heart, Monitor } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';
const heroImage = '/lovable-uploads/47a64dda-9083-4c59-962a-605d69645979.png';
const contemporaryImage = '/lovable-uploads/7b552ba3-15eb-4c78-881a-39a59b4dde8c.png';
const ballroomImage = '/lovable-uploads/d2c069b1-e51d-49e4-abab-48fe272bce2a.png';
const hipHopImage = '/lovable-uploads/b0860258-46f0-4e90-abc6-5f88cb2d3f46.png';
const competitionImage = '/lovable-uploads/ce1c8c79-cd7f-41eb-82b2-4635bcfa4eb0.png';
const kidsHipHopImage = '/lovable-uploads/ef992f15-aa19-4054-b55d-bf80e2c37149.png';
const promoFilmingImage = '/lovable-uploads/b0860258-46f0-4e90-abc6-5f88cb2d3f46.png';
const promoExperienceImage = '/lovable-uploads/47a64dda-9083-4c59-962a-605d69645979.png';
const promoPaymentImage = '/lovable-uploads/ce1c8c79-cd7f-41eb-82b2-4635bcfa4eb0.png';

const Home = () => {
  const { getContent, loading } = usePageContent('home');
  
  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="pb-24">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Professional dance performance" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/80 to-secondary/90"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-poppins font-bold leading-tight text-white">
              Where Passion Meets Performance — Live & Online
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl font-open-sans text-white/90">
              Join dancers from Mexico City, Sydney, Johannesburg, Seoul, London — or submit your dance video from anywhere!
            </p>
            <p className="text-base sm:text-lg font-lato max-w-2xl mx-auto text-white/80">
              Welcome to LoveDanceLive — your global stage for dance. Whether you're stepping into the spotlight in Mexico City, Sydney, Johannesburg, Seoul, London, or sharing your moves online from anywhere in the world, this is your moment. Compete, learn, and connect with a vibrant community that shares your rhythm.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 sm:mt-8">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto" asChild>
                <Link to="/competitions">
                  <Trophy className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Enter Competition
                </Link>
              </Button>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto" asChild>
                <Link to="/how-to-enter">
                  <Upload className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Submit Dance Video
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto" asChild>
                <Link to="/live-chat">
                  <Play className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Watch Live
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white/10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-neon-pink/30 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-8 sm:w-12 h-8 sm:h-12 rotate-45 bg-baby-pink/20"></div>
      </section>

      {/* About Preview with Image */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground">
                About LoveDanceLive
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                LoveDanceLive brings together dancers from Mexico City, Sydney, Johannesburg, Seoul, and London, creating a global family united by passion. Our mission is to empower dancers of all backgrounds through live competition and online connection.
              </p>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">
                  Learn Our Story
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={contemporaryImage} 
                alt="Solo dance performance showcasing individual artistry and technique" 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Images Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Professional dance experiences and flexible programs</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex justify-center">
              <img 
                src={promoFilmingImage} 
                alt="Professional dance filming services with high-quality equipment"
                className="max-w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-center">
              <img 
                src={promoExperienceImage} 
                alt="Premium dance experience with expert instruction and VIP events"
                className="max-w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex justify-center">
              <img 
                src={promoPaymentImage} 
                alt="Flexible payment plans for dance programs and competitions"
                className="max-w-full h-auto rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dance Styles Showcase */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground">
              Every Style Welcome
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              From classical ballet to street hip-hop, showcase your unique style
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
              <div className="relative h-48">
                <img 
                  src={ballroomImage} 
                  alt="Group of dancers performing synchronized jump movement" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-poppins font-bold">Group Performance</h3>
                  <p className="text-sm opacity-90">Unity & Synchronization</p>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
              <div className="relative h-48">
                <img 
                  src={hipHopImage} 
                  alt="Hip hop dance group performing energetic choreography" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-poppins font-bold">Hip-Hop</h3>
                  <p className="text-sm opacity-90">Urban & Energetic</p>
                </div>
              </div>
            </Card>
            
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0">
              <div className="relative h-48">
                <img 
                  src={kidsHipHopImage} 
                  alt="Kids hip hop dance group performing with energy and joy" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-poppins font-bold">Youth Programs</h3>
                  <p className="text-sm opacity-90">Building Future Stars</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Events with Competition Image */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground">
              Upcoming Events
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Join live competitions in our featured cities or participate online
            </p>
          </div>
          
          {/* Featured Event */}
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-2xl">
            <img 
              src={competitionImage} 
              alt="Acrobatic dance group performing dynamic choreography on competition stage" 
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 text-white">
                <div className="max-w-lg">
                  <h3 className="text-2xl sm:text-3xl font-poppins font-bold mb-4">
                    Global Finals 2024
                  </h3>
                  <p className="text-lg mb-6 opacity-90">
                    The ultimate dance competition bringing together winners from around the world
                  </p>
                <Button size="lg" asChild>
                  <Link to="/registration">
                    Register Now
                  </Link>
                </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { city: 'Mexico City', date: 'March 15, 2024', type: 'Live Competition', styles: 'Latin, Contemporary' },
              { city: 'Sydney', date: 'March 22, 2024', type: 'Live Competition', styles: 'Hip-Hop, Jazz' },
              { city: 'Seoul', date: 'March 29, 2024', type: 'Live Competition', styles: 'K-Pop, Street' },
            ].map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Globe className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium text-accent">{event.type}</span>
                  </div>
                  <CardTitle className="text-xl font-poppins">{event.city}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <p className="text-sm">
                    <strong>Styles:</strong> {event.styles}
                  </p>
                   <Button size="sm" className="w-full bg-primary hover:bg-primary/90" asChild>
                     <Link to="/registration">
                       Register Now
                     </Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Workshops Teaser */}
      <section className="py-12 sm:py-16 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground">
                Master Your Craft
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                Learn from world-renowned choreographers and judges through our exclusive workshops and online classes. Perfect your technique, explore new styles, and get personalized feedback.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-accent" />
                  <span>Expert instructors from 5 continents</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-accent" />
                  <span>Small class sizes for personalized attention</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Play className="h-5 w-5 text-accent" />
                  <span>Live and recorded sessions available</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/workshops">
                    Browse Workshops
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/online-classes">
                    Online Classes
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="bg-primary/10 border-0">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Trophy className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Competition Prep</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Get competition-ready with our intensive prep courses</p>
                </CardContent>
              </Card>
              <Card className="bg-accent/10 border-0">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Users className="h-10 sm:h-12 w-10 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Group Classes</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Learn with dancers from around the world</p>
                </CardContent>
              </Card>
              <Card className="bg-neon-pink/10 border-0">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Star className="h-10 sm:h-12 w-10 sm:w-12 text-neon-pink mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">1-on-1 Sessions</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Personal coaching with industry experts</p>
                </CardContent>
              </Card>
              <Card className="bg-light-blue/10 border-0">
                <CardContent className="p-4 sm:p-6 text-center">
                  <Play className="h-10 sm:h-12 w-10 sm:w-12 text-light-blue mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Video Reviews</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Submit videos for detailed feedback</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Community Preview */}
      <section className="py-12 sm:py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-poppins font-bold text-foreground">
              Join the Community
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with dancers worldwide, share your journey, participate in challenges, and celebrate each other's successes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center border-0 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Users className="h-10 sm:h-12 w-10 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Forums</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Discuss techniques, share tips, and connect</p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/community">Join Forum</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Trophy className="h-10 sm:h-12 w-10 sm:w-12 text-accent mx-auto mb-3 sm:mb-4" />
                <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Challenges</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Monthly dance challenges with prizes</p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/challenges">View Challenges</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Heart className="h-10 sm:h-12 w-10 sm:w-12 text-neon-pink mx-auto mb-3 sm:mb-4" />
                <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Gallery</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Share your best performances</p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/gallery">Explore Gallery</Link>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="text-center border-0 bg-card hover:shadow-lg transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <Play className="h-10 sm:h-12 w-10 sm:w-12 text-light-blue mx-auto mb-3 sm:mb-4" />
                <h3 className="font-poppins font-semibold text-base sm:text-lg mb-2">Live Chat</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Chat during live events and competitions</p>
                <Button size="sm" variant="outline" asChild>
                  <Link to="/live-chat">Join Chat</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Admin Access Notice */}

      {/* Sponsors Logos */}
      <section className="py-8 sm:py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h3 className="text-lg sm:text-xl font-poppins font-semibold text-muted-foreground">
              Proudly Supported By
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 opacity-60">
              {/* Placeholder sponsor logos */}
              <div className="w-20 sm:w-24 h-10 sm:h-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                Sponsor 1
              </div>
              <div className="w-20 sm:w-24 h-10 sm:h-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                Sponsor 2
              </div>
              <div className="w-20 sm:w-24 h-10 sm:h-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                Sponsor 3
              </div>
              <div className="w-20 sm:w-24 h-10 sm:h-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                Sponsor 4
              </div>
              <div className="w-20 sm:w-24 h-10 sm:h-12 bg-muted rounded flex items-center justify-center text-xs font-medium">
                Sponsor 5
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/sponsors">
                Become a Sponsor
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;