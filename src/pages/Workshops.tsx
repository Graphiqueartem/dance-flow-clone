import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, Star, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Workshops = () => {
  const workshops = [
    {
      genre: 'Hip Hop',
      instructor: 'Carlos Rodriguez',
      level: 'Beginner to Advanced',
      duration: '2 hours',
      color: 'turquoise'
    },
    {
      genre: 'Contemporary',
      instructor: 'Sarah Chen',
      level: 'Intermediate',
      duration: '1.5 hours',
      color: 'baby-pink'
    },
    {
      genre: 'Latin',
      instructor: 'Maria Santos',
      level: 'All Levels',
      duration: '2 hours',
      color: 'accent'
    },
    {
      genre: 'Jazz',
      instructor: 'David Kim',
      level: 'Beginner',
      duration: '1.5 hours',
      color: 'light-blue'
    },
    {
      genre: 'Street Dance',
      instructor: 'Thabo Mthembu',
      level: 'Advanced',
      duration: '2 hours',
      color: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-6">
              <Users className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold mb-6">
            Workshops - Learn From the Best
          </h1>
          <p className="text-xl sm:text-2xl font-open-sans text-primary-foreground/90 max-w-3xl mx-auto leading-relaxed">
            Master Your Craft with Expert Instructors
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Overview */}
        <div className="max-w-5xl mx-auto mb-16 sm:mb-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-8">
            Learn From Top Instructors
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
            Learn from top instructors in Mexico City, Sydney, Johannesburg, Seoul, and London. Workshops cover five genres and all skill levels. Can't attend in person? Explore classes online anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" variant="default" asChild>
              <Link to="#schedule">View Workshop Schedule</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/registration">Register for Workshops</Link>
            </Button>
          </div>
        </div>

        {/* Workshop Categories */}
        <div id="schedule" className="mb-16 sm:mb-20">
          <h3 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground text-center mb-12">
            Workshop Categories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {workshops.map((workshop, index) => {
              const getCardColor = (color: string) => {
                switch (color) {
                  case 'turquoise': return 'bg-turquoise/10 border-turquoise/20';
                  case 'baby-pink': return 'bg-baby-pink/10 border-baby-pink/20';
                  case 'accent': return 'bg-accent/10 border-accent/20';
                  case 'light-blue': return 'bg-light-blue/10 border-light-blue/20';
                  case 'primary': return 'bg-primary/10 border-primary/20';
                  default: return 'bg-muted border-border';
                }
              };

              const getIconColor = (color: string) => {
                switch (color) {
                  case 'turquoise': return 'text-turquoise';
                  case 'baby-pink': return 'text-baby-pink';
                  case 'accent': return 'text-accent';
                  case 'light-blue': return 'text-light-blue';
                  case 'primary': return 'text-primary';
                  default: return 'text-foreground';
                }
              };

              const getButtonVariant = (color: string) => {
                switch (color) {
                  case 'turquoise': return 'secondary';
                  case 'baby-pink': return 'outline';
                  case 'accent': return 'default';
                  case 'light-blue': return 'secondary';
                  case 'primary': return 'secondary';
                  default: return 'default';
                }
              };

              return (
                <Card key={index} className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${getCardColor(workshop.color)}`}>
                  <CardHeader className="text-center pb-4">
                    <Star className={`h-12 w-12 ${getIconColor(workshop.color)} mx-auto mb-3`} />
                    <CardTitle className="text-xl font-poppins font-bold text-foreground">
                      {workshop.genre}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-4 text-center">
                      <div>
                        <p className="font-semibold text-foreground">Instructor</p>
                        <p className="text-sm text-muted-foreground">{workshop.instructor}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Level</p>
                        <p className="text-sm text-muted-foreground">{workshop.level}</p>
                      </div>
                      <div className="flex items-center justify-center text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="text-sm">{workshop.duration}</span>
                      </div>
                      <Button 
                        variant={getButtonVariant(workshop.color)}
                        className="w-full mt-4"
                        asChild
                      >
                        <Link to="/performance-review-form">Register</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Schedule Information */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                  Workshop Schedule
                </h3>
                <p className="text-lg text-muted-foreground">
                  Workshops are available at every regional event. Each city offers all five genres 
                  across the event weekend.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Weekend Schedule</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Friday Evening</span>
                      <span className="text-foreground">Hip Hop & Jazz</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday Morning</span>
                      <span className="text-foreground">Contemporary & Latin</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Saturday Afternoon</span>
                      <span className="text-foreground">Street Dance</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sunday</span>
                      <span className="text-foreground">Open Practice & Q&A</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">What's Included</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Professional instruction from industry experts</li>
                    <li>• Take-home choreography notes</li>
                    <li>• Video recording of key sequences</li>
                    <li>• Networking opportunities with fellow dancers</li>
                    <li>• Certificate of completion</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructor Spotlight */}
        <div className="text-center">
          <Card className="bg-accent/10 border-accent/20 max-w-2xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-4">
                World-Class Instructors
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Our workshop leaders are award-winning choreographers, competition champions, and industry professionals 
                who've worked with top artists and dance companies worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/registration">Book Your Workshop</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/judges">Meet Our Instructors</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Workshops;