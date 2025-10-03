import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Upload, Star, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowToEnter = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      {/* Hero Section */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Play className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            How to Enter
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Live & Online Submission
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Overview */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-poppins font-bold text-foreground mb-6">
            Ready to Take the Stage?
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ready to take the stage? Register for live events in Mexico City, Sydney, Johannesburg, Seoul, or London. Can't make it? Upload your dance video online from anywhere. Upgrade with a premium critique for expert feedback.
          </p>
        </div>

        {/* Entry Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 sm:mb-16">
          {/* Live Events */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-turquoise/10 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-turquoise p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-poppins font-bold text-foreground">Live Events</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">
                  Register your performance slot and get ready for your moment on stage.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Choose your regional event (Mexico City, Sydney, Johannesburg, Seoul, London)</li>
                  <li>• Select your performance category and time slot</li>
                  <li>• Attend mandatory safety briefing</li>
                  <li>• Compete live in front of expert judges</li>
                  <li>• Network with dancers and industry professionals</li>
                </ul>
              </div>
              <Button 
                className="w-full bg-turquoise text-white hover:bg-turquoise/90" 
                asChild
              >
                <Link to="/registration">Register for Live Event</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Online Submission */}
          <Card className="hover:shadow-xl transition-all duration-300 bg-baby-pink/10 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-baby-pink p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-poppins font-bold text-foreground">Online Submission</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6">
                <p className="text-muted-foreground">
                  Upload your dance video, choose premium critique if you want expert feedback, and wait for the judges' verdict.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Record your performance (up to 5 minutes)</li>
                  <li>• Upload video file (MP4, MOV, AVI - max 500MB)</li>
                  <li>• Fill out performer details and dance category</li>
                  <li>• Optional: Add premium critique for detailed feedback</li>
                  <li>• Track your submission status online</li>
                </ul>
              </div>
              <Button 
                className="w-full bg-baby-pink text-white hover:bg-baby-pink/90" 
                asChild
              >
                <Link to="/performance-review-form">Submit Online Video</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Critiques */}
        <div className="mb-12 sm:mb-16">
          <Card className="bg-accent/10 border-accent/20 max-w-4xl mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="bg-accent p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Star className="h-8 w-8 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl font-poppins font-bold text-foreground">Premium Critiques</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-muted-foreground text-center mb-8">
                Get detailed, personalized feedback from our expert panel of professional dancers and choreographers.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">Technique Analysis</h4>
                  <p className="text-sm text-muted-foreground">Detailed breakdown of your technical skills and areas for improvement</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">Performance Notes</h4>
                  <p className="text-sm text-muted-foreground">Insights on stage presence, expression, and audience connection</p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-foreground mb-2">Growth Roadmap</h4>
                  <p className="text-sm text-muted-foreground">Personalized recommendations for your dance journey</p>
                </div>
              </div>
              <div className="text-center">
                <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/performance-review-form">Learn About Premium Critiques</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rules & Guidelines */}
        <div className="text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardHeader className="text-center pb-4">
              <div className="bg-primary p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl font-poppins font-bold text-foreground">Rules & Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Performance Requirements</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Original choreography or credited covers</li>
                    <li>• Performance length: 2-5 minutes</li>
                    <li>• Age categories: Youth (8-17), Adult (18+)</li>
                    <li>• Solo, duet, or group performances welcome</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3">Technical Specifications</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Video formats: MP4, MOV, AVI</li>
                    <li>• Maximum file size: 500MB</li>
                    <li>• Minimum resolution: 720p</li>
                    <li>• Clear audio without distortion</li>
                  </ul>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-8 mb-6">
                Review rules and guidelines to keep your entry smooth and fair.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">View Full Guidelines</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowToEnter;