import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Judge } from '@/types/performance';
import JudgeRegistration from './JudgeRegistration';
import Navigation from './Navigation';
import { databaseService } from '@/services/databaseService';

interface JudgeLoginProps {
  onLogin: (judge: { id: string; name: string; email: string }) => void;
  onBack?: () => void;
}

const JudgeLogin: React.FC<JudgeLoginProps> = ({ onLogin, onBack }) => {
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('Attempting login with:', credentials.email);
      const judge = await databaseService.loginJudge(credentials);

      if (judge) {
        const judgeSession = {
          id: judge.id,
          name: judge.name,
          email: judge.email
        };
        
        localStorage.setItem('currentJudge', JSON.stringify(judgeSession));
        onLogin(judgeSession);
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${judge.name}!`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "Please check your credentials or create a new account.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegistration = (newJudge: Judge) => {
    const judgeSession = {
      id: newJudge.id,
      name: newJudge.name,
      email: newJudge.email
    };
    
    localStorage.setItem('currentJudge', JSON.stringify(judgeSession));
    onLogin(judgeSession);
    setShowRegistration(false);
  };

  if (showRegistration) {
    return (
      <div className="min-h-screen bg-gray-50">
        {onBack && <Navigation onBack={onBack} title="Judge Registration" />}
        <JudgeRegistration
          onRegister={handleRegistration}
          onCancel={() => setShowRegistration(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {onBack && <Navigation onBack={onBack} title="Judge Login" />}
      <div className="flex items-center justify-center py-8">
        <div className="max-w-md w-full px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Judge Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Logging in...' : 'Login'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-3">
                  Don't have a judge account?
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setShowRegistration(true)}
                  className="w-full"
                  disabled={isLoading}
                >
                  Create Judge Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JudgeLogin;
