import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Upload, CheckCircle, Play, Award, User, Calendar, Trophy } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import PerformerForm from '@/components/PerformerForm';
import JudgeLogin from '@/components/JudgeLogin';
import JudgeDashboard from '@/components/JudgeDashboard';
import JudgeDirectory from '@/components/JudgeDirectory';
import PerformerAccount from '@/components/PerformerAccount';
import heroImage from '@/assets/hero-dance.jpg';
import contemporaryImage from '@/assets/contemporary-dance.jpg';
const loginHeroImage = '/lovable-uploads/ef992f15-aa19-4054-b55d-bf80e2c37149.png';
const performanceImage = '/lovable-uploads/d2c069b1-e51d-49e4-abab-48fe272bce2a.png';

const PerformanceReviewForm = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Hero Section with Background Image */}
      <div className="relative bg-primary text-primary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={loginHeroImage} 
            alt="Young hip-hop dancers in black outfits with confident poses" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-poppins font-bold mb-6">
            LoveDanceLive Performance Review
          </h1>
          <p className="text-xl sm:text-2xl font-open-sans text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            Professional dance performance evaluation platform connecting performers with expert judges worldwide
          </p>
          
          {/* Authentication Status */}
          {user && profile && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
              <p className="text-primary-foreground/90">
                Welcome back, <span className="font-semibold">{profile.name}</span>
              </p>
              <p className="text-sm text-primary-foreground/70 capitalize">
                {profile.role} Account
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <Card className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardHeader className="text-center pb-6 bg-gradient-to-r from-neon-pink to-light-blue text-white">
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
              {/* Authentication Card */}
              {!user ? (
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-primary/10 border-0">
                  <CardHeader className="text-center pb-4">
                    <div className="bg-primary p-4 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <User className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-lg font-poppins font-bold text-foreground">Get Started</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                      Sign in or create an account to access all features
                    </p>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => navigate('/auth?mode=performer')}
                        className="w-full"
                        size="sm"
                      >
                        Performer Login
                      </Button>
                      <Button 
                        onClick={() => navigate('/auth?mode=judge')}
                        className="w-full"
                        variant="outline"
                        size="sm"
                      >
                        Judge Login
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                /* User Account Card */
                <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-secondary/10 border-0">
                  <CardHeader className="text-center pb-4">
                    <div className="bg-secondary p-4 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-lg font-poppins font-bold text-foreground">My Account</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center p-6">
                    <p className="text-sm text-muted-foreground mb-6">
                      View your performances, feedback history, and manage your profile
                    </p>
                    <Button 
                      onClick={() => {
                        if (profile?.role === 'judge') {
                          navigate('/judge-dashboard');
                        } else {
                          setCurrentView('performer-account');
                        }
                      }}
                      className="w-full"
                      size="sm"
                    >
                      View Dashboard
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Find Judges */}
              <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-accent/10 border-0">
                <CardHeader className="text-center pb-4">
                  <div className="bg-accent p-4 rounded-full w-14 h-14 mx-auto mb-4 flex items-center justify-center">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-lg font-poppins font-bold text-foreground">Find Judges</CardTitle>
                </CardHeader>
                <CardContent className="text-center p-6">
                  <p className="text-sm text-muted-foreground mb-6">
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

              {/* Dance Inspiration */}
              <Card className="hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-muted/50 to-background border-0 overflow-hidden">
                <div className="relative h-32">
                  <img 
                    src={contemporaryImage} 
                    alt="Contemporary dance inspiration" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white">
                    <p className="text-sm font-medium">Dance Inspiration</p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-xs text-muted-foreground">
                    "Dance is the hidden language of the soul" - Martha Graham
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-poppins font-bold text-foreground mb-4">
                Ready to Share Your Passion?
              </h3>
              <p className="text-base text-muted-foreground mb-6">
                Submit your dance video above to get professional feedback and potentially be featured in our global showcases. Our expert judges provide detailed reviews to help you improve and succeed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" asChild>
                  <a href="/competitions">View Competitions</a>
                </Button>
                <Button size="lg" asChild>
                  <Link to="/registration">Join Workshops</Link>
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