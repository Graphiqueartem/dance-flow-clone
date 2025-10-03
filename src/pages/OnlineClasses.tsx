import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Monitor, MessageCircle, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const OnlineClasses = () => {
  const classCategories = [
    {
      genre: 'Hip Hop Fundamentals',
      level: 'Beginner',
      duration: '4 weeks',
      price: '$49',
      color: 'turquoise'
    },
    {
      genre: 'Contemporary Flow',
      level: 'Intermediate',
      duration: '6 weeks',
      price: '$69',
      color: 'baby-pink'
    },
    {
      genre: 'Latin Rhythms',
      level: 'All Levels',
      duration: '5 weeks',
      price: '$59',
      color: 'accent'
    },
    {
      genre: 'Jazz Technique',
      level: 'Advanced',
      duration: '8 weeks',
      price: '$89',
      color: 'light-blue'
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Monitor className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            Online Classes Portal - Dance Anytime
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Keep Dancing Year-Round
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Dance Anytime, Anywhere
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Keep dancing year-round with our online classes. Subscribe for unlimited access or buy classes one-by-one. Join live Q&A sessions and upload homework for personal feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="#classes">Browse Classes</Link>
            </Button>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/registration">Subscribe Now</Link>
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="bg-turquoise/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <Play className="h-12 w-12 text-turquoise mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">On-Demand Learning</h3>
              <p className="text-muted-foreground">
                Access hundreds of classes anytime. Learn at your own pace with high-quality video instruction.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-baby-pink/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <MessageCircle className="h-12 w-12 text-baby-pink mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">Live Interaction</h3>
              <p className="text-muted-foreground">
                Join live Q&A sessions with instructors and get personalized feedback on your progress.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-light-blue/10 border-0 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 sm:p-8 text-center">
              <Award className="h-12 w-12 text-light-blue mx-auto mb-4" />
              <h3 className="text-xl font-poppins font-bold text-foreground mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground">
                Upload homework videos, track your improvement, and earn certificates of completion.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Class Categories */}
        <div id="classes" className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground text-center mb-8">
            Popular Classes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {classCategories.map((classItem, index) => (
              <Card key={index} className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-${classItem.color}/10 border-0`}>
                <CardHeader className="text-center pb-4">
                  <div className={`bg-${classItem.color} p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center`}>
                    <Play className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-poppins font-bold text-foreground">
                    {classItem.genre}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Level: {classItem.level}</p>
                      <p className="text-sm text-muted-foreground">Duration: {classItem.duration}</p>
                    </div>
                    <div className="text-2xl font-bold text-foreground">{classItem.price}</div>
                    <Button 
                      className={`w-full bg-${classItem.color} text-white hover:bg-${classItem.color}/90`} 
                      asChild
                    >
                      <Link to="/performance-review-form">Enroll Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground text-center mb-8">
            Subscription Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-muted">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-poppins font-bold text-foreground">Basic</CardTitle>
                <div className="text-3xl font-bold text-foreground">$19<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li>• Access to 50+ classes</li>
                  <li>• Basic genres included</li>
                  <li>• Download class notes</li>
                  <li>• Community forum access</li>
                </ul>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/performance-review-form">Start Basic</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-accent bg-accent/5">
              <CardHeader className="text-center">
                <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                  MOST POPULAR
                </div>
                <CardTitle className="text-xl font-poppins font-bold text-foreground">Premium</CardTitle>
                <div className="text-3xl font-bold text-foreground">$39<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li>• Unlimited class access</li>
                  <li>• All genres & skill levels</li>
                  <li>• Live Q&A sessions</li>
                  <li>• Homework upload & feedback</li>
                  <li>• Certificates of completion</li>
                </ul>
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                  <Link to="/performance-review-form">Start Premium</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-muted">
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-poppins font-bold text-foreground">Pro</CardTitle>
                <div className="text-3xl font-bold text-foreground">$69<span className="text-sm font-normal">/month</span></div>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li>• Everything in Premium</li>
                  <li>• 1-on-1 virtual sessions</li>
                  <li>• Priority instructor access</li>
                  <li>• Custom choreography requests</li>
                  <li>• Competition prep classes</li>
                </ul>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/performance-review-form">Start Pro</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 sm:p-12">
              <h3 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
                Interactive Learning Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Live Q&A Sessions</h4>
                  <p className="text-sm text-muted-foreground">
                    Join weekly live sessions with instructors. Ask questions, get real-time feedback, 
                    and connect with fellow students from around the world.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Homework Upload</h4>
                  <p className="text-sm text-muted-foreground">
                    Practice what you learn and upload videos for personalized feedback. 
                    Track your progress and celebrate your improvements.
                  </p>
                </div>
              </div>
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/registration">Join the Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OnlineClasses;