import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Construction, ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "Coming Soon | LoveDanceLive";
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto text-center bg-white border-2 border-primary/20">
          <CardContent className="p-12">
            <Construction className="h-20 w-20 text-primary mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-poppins font-bold mb-4 text-primary">
              Coming Soon
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              This page is currently under development. We're working hard to bring you amazing new features!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/" className="flex items-center gap-2">
                  <Home className="h-5 w-5" />
                  Go to Homepage
                </a>
              </Button>
              <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5 mr-2" />
                Go Back
              </Button>
            </div>
            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="text-sm text-muted-foreground">
                Want to be notified when this page is ready?{' '}
                <a href="/contact" className="text-primary hover:underline font-medium">
                  Contact us
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
