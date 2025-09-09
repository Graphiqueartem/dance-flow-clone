import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Upload, CheckCircle, Play, Award, User, Calendar, Trophy } from 'lucide-react';
import PerformerForm from '@/components/PerformerForm';
import JudgeLogin from '@/components/JudgeLogin';
import JudgeDashboard from '@/components/JudgeDashboard';
import JudgeDirectory from '@/components/JudgeDirectory';
import PerformerAccount from '@/components/PerformerAccount';

const PerformanceReviewForm = () => {
  const [currentView, setCurrentView] = useState<'form' | 'judge-login' | 'judge-dashboard' | 'browse-judges' | 'performer-account'>('form');
  const [currentJudge, setCurrentJudge] = useState<{ id: string; name: string; email: string } | null>(null);

  const handleJudgeLogin = (judge: { id: string; name: string; email: string }) => {
    setCurrentJudge(judge);
    setCurrentView('judge-dashboard');
  };

  const handleJudgeLogout = () => {
    setCurrentJudge(null);
    localStorage.removeItem('currentJudge');
    sessionStorage.removeItem('currentJudge');
    setCurrentView('form');
  };

  if (currentView === 'judge-login') {
    return <JudgeLogin onLogin={handleJudgeLogin} onBack={() => setCurrentView('form')} />;
  }

  if (currentView === 'judge-dashboard' && currentJudge) {
    return <JudgeDashboard judge={currentJudge} onLogout={handleJudgeLogout} onBack={() => setCurrentView('form')} />;
  }

  if (currentView === 'browse-judges') {
    return <JudgeDirectory onBack={() => setCurrentView('form')} />;
  }

  if (currentView === 'performer-account') {
    return <PerformerAccount onBack={() => setCurrentView('form')} />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-poppins font-bold mb-4">
            LoveDanceLive Performance Review Form
          </h1>
          <p className="text-lg sm:text-xl font-open-sans text-primary-foreground/90 max-w-2xl mx-auto">
            Professional dance performance evaluation platform for global competitions
          </p>
        </div>
      </div>

      {/* Main Performance Form - Full Width */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white border-0">
                <CardHeader className="text-center pb-6 bg-neon-pink text-white">
                  <div className="flex justify-center mb-4">
                    <Play className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-2xl sm:text-3xl font-poppins font-bold">Submit Your Performance</CardTitle>
                  <p className="text-lg opacity-90 mt-2">
                    Upload your dance performance and get expert feedback from professional judges
                  </p>
                </CardHeader>
                <CardContent className="p-0">
                  <PerformerForm onBack={() => {}} />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Actions */}
            <div className="lg:col-span-1 space-y-6">
              {/* My Account */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-secondary/10 border-0">
                <CardHeader className="text-center pb-4">
                  <div className="bg-secondary p-3 sm:p-4 rounded-full w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <Calendar className="h-5 sm:h-6 w-5 sm:w-6 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-poppins font-bold text-foreground">My Account</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    View your performances, feedback history, and manage your profile
                  </p>
                  <Button 
                    onClick={() => setCurrentView('performer-account')}
                    className="w-full"
                    size="sm"
                  >
                    View Account
                  </Button>
                </CardContent>
              </Card>

              {/* Judge Login */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-light-blue/10 border-0">
                <CardHeader className="text-center pb-4">
                  <div className="bg-light-blue p-3 sm:p-4 rounded-full w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <User className="h-5 sm:h-6 w-5 sm:w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-poppins font-bold text-foreground">Judge Login</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    Login to review performances and provide professional feedback
                  </p>
                  <Button 
                    onClick={() => setCurrentView('judge-login')}
                    className="w-full"
                    size="sm"
                  >
                    Login as Judge
                  </Button>
                </CardContent>
              </Card>

              {/* Find Judges */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-accent/10 border-0">
                <CardHeader className="text-center pb-4">
                  <div className="bg-accent p-3 sm:p-4 rounded-full w-12 sm:w-14 h-12 sm:h-14 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                    <Award className="h-5 sm:h-6 w-5 sm:w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-base sm:text-lg font-poppins font-bold text-foreground">Find Judges</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-4 sm:p-6">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
                    Browse and connect with professional dance judges worldwide
                  </p>
                  <Button 
                    onClick={() => setCurrentView('browse-judges')}
                    className="w-full"
                    size="sm"
                  >
                    Browse Judges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Quick Judge Access if logged in */}
        {currentJudge && (
          <div className="mt-6 sm:mt-8 text-center">
            <Card className="bg-primary/10 border-primary/20 max-w-2xl mx-auto">
              <CardContent className="p-4 sm:p-6">
                <p className="text-foreground mb-3 text-base sm:text-lg font-medium">
                  Welcome back, {currentJudge.name}!
                </p>
                <Button 
                  onClick={() => setCurrentView('judge-dashboard')}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Go to Judge Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Success Message */}
        <div className="mt-8 sm:mt-12 text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <CheckCircle className="h-12 sm:h-16 w-12 sm:w-16 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-xl sm:text-2xl font-poppins font-bold text-foreground mb-3 sm:mb-4">
                Ready to Share Your Passion?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
                Submit your dance video above to get professional feedback and potentially be featured in our global showcases. Our expert judges provide detailed reviews to help you improve and succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="/competitions">View Competitions</a>
                </Button>
                <Button size="lg" asChild>
                  <a href="/workshops">Join Workshops</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviewForm;