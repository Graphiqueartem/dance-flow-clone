
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Award, User, Calendar, Trophy } from 'lucide-react';
import PerformerForm from '@/components/PerformerForm';
import JudgeLogin from '@/components/JudgeLogin';
import JudgeDashboard from '@/components/JudgeDashboard';
import JudgeDirectory from '@/components/JudgeDirectory';
import PerformerAccount from '@/components/PerformerAccount';

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'submit' | 'judge-login' | 'judge-dashboard' | 'browse-judges' | 'performer-account'>('home');
  const [currentJudge, setCurrentJudge] = useState<{ id: string; name: string; email: string } | null>(null);

  useEffect(() => {
    // Check for existing judge session on load
    const storedJudge = localStorage.getItem('currentJudge');
    if (storedJudge) {
      try {
        const judge = JSON.parse(storedJudge);
        setCurrentJudge(judge);
      } catch (error) {
        console.error('Error parsing stored judge:', error);
        localStorage.removeItem('currentJudge');
      }
    }
  }, []);

  const handleJudgeLogin = (judge: { id: string; name: string; email: string }) => {
    setCurrentJudge(judge);
    setCurrentView('judge-dashboard');
  };

  const handleJudgeLogout = () => {
    setCurrentJudge(null);
    localStorage.removeItem('currentJudge');
    sessionStorage.removeItem('currentJudge');
    setCurrentView('home');
  };

  if (currentView === 'submit') {
    return <PerformerForm onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'judge-login') {
    return <JudgeLogin onLogin={handleJudgeLogin} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'judge-dashboard' && currentJudge) {
    return <JudgeDashboard judge={currentJudge} onLogout={handleJudgeLogout} onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'browse-judges') {
    return <JudgeDirectory onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'performer-account') {
    return <PerformerAccount onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
              <Trophy className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Stage Score Showdown Hub
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional dance performance evaluation platform
          </p>
        </div>
      </div>

      {/* Main Actions */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Submit Performance */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-green-50 to-emerald-50 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Submit Performance</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Upload your dance performance and get expert feedback
              </p>
              <Button 
                onClick={() => setCurrentView('submit')}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                Get Started
              </Button>
            </CardContent>
          </Card>

          {/* Judge Portal */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Judge Portal</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Login to review performances and provide professional feedback
              </p>
              <Button 
                onClick={() => setCurrentView('judge-login')}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Login
              </Button>
            </CardContent>
          </Card>

          {/* Find Judges */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-purple-50 to-violet-50 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">Find Judges</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Browse and connect with professional dance judges
              </p>
              <Button 
                onClick={() => setCurrentView('browse-judges')}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
              >
                Browse
              </Button>
            </CardContent>
          </Card>

          {/* My Account */}
          <Card className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-orange-50 to-red-50 border-0">
            <CardHeader className="text-center pb-4">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">My Account</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                View your performances and feedback history
              </p>
              <Button 
                onClick={() => setCurrentView('performer-account')}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
              >
                View Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Judge Access if logged in */}
        {currentJudge && (
          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200">
              <CardContent className="p-6">
                <p className="text-yellow-800 mb-3 text-lg font-medium">
                  Welcome back, {currentJudge.name}!
                </p>
                <Button 
                  onClick={() => setCurrentView('judge-dashboard')}
                  className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-yellow-900"
                >
                  Go to Judge Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
