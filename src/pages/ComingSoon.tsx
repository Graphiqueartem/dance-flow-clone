import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, ArrowLeft, Bell } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  const pageTitle = location.state?.pageTitle || 'Exciting Feature';
  
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto bg-white border-0 shadow-lg">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-8">
              <div className="bg-primary/10 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Clock className="h-12 w-12 text-primary" />
              </div>
              
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-foreground mb-4">
                Coming Soon
              </h1>
              
              <h2 className="text-xl sm:text-2xl text-primary font-semibold mb-6">
                {pageTitle}
              </h2>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We're working hard to bring you something amazing! This feature is currently under development 
              and will be available soon. Stay tuned for updates!
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-center text-muted-foreground">
                <Bell className="h-5 w-5 mr-2" />
                <span>Get notified when we launch</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;