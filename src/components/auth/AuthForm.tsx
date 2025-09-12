import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, UserPlus, User, Scale } from 'lucide-react';
import JudgeRegistration from '@/components/JudgeRegistration';
import { Judge } from '@/types/performance';

interface AuthFormProps {
  mode?: 'admin' | 'judge' | 'performer';
  onSuccess?: () => void;
  defaultTab?: 'performer' | 'judge';
}

export const AuthForm: React.FC<AuthFormProps> = ({ mode = 'performer', onSuccess, defaultTab = 'performer' }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState(defaultTab);
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showJudgeRegistration, setShowJudgeRegistration] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If registering as a judge, show the detailed registration form immediately
    if (!isLogin && activeTab === 'judge') {
      setShowJudgeRegistration(true);
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: 'Login Failed',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully logged in.'
          });
          onSuccess?.();
        }
      } else {
        const { error } = await signUp(email, password, activeTab, name);
        if (error) {
          toast({
            title: 'Registration Failed',
            description: error.message,
            variant: 'destructive'
          });
        } else {
          toast({
            title: 'Registration Successful!',
            description: 'Please check your email to confirm your account.'
          });
          setIsLogin(true);
        }
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleJudgeRegistration = (judge: Judge) => {
    toast({
      title: 'Judge Profile Created!',
      description: 'Your judge profile has been created successfully. You can now log in.'
    });
    setShowJudgeRegistration(false);
    setIsLogin(true);
    setActiveTab('judge');
    onSuccess?.();
  };

  const getTabTitle = (tabType: 'performer' | 'judge') => {
    switch (tabType) {
      case 'judge': return 'Judge';
      default: return 'Performer';
    }
  };

  const getTabDescription = (tabType: 'performer' | 'judge') => {
    switch (tabType) {
      case 'judge': return 'Access to review performances and provide feedback';
      default: return 'Submit your performances and receive professional feedback';
    }
  };

  // Show judge registration form if selected
  if (showJudgeRegistration) {
    return (
      <JudgeRegistration
        onRegister={handleJudgeRegistration}
        onCancel={() => setShowJudgeRegistration(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {isLogin ? 'Sign In' : 'Create Account'}
        </CardTitle>
        <CardDescription>
          Choose your account type to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'performer' | 'judge')} className="mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performer" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Performer
            </TabsTrigger>
            <TabsTrigger value="judge" className="flex items-center gap-2">
              <Scale className="h-4 w-4" />
              Judge
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performer" className="space-y-2 mt-4">
            <div className="text-center p-3 bg-primary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Submit your performances and receive professional feedback
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="judge" className="space-y-2 mt-4">
            <div className="text-center p-3 bg-secondary/5 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Review performances and provide expert feedback
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password (min. 6 characters)"
                className="pr-10"
                minLength={6}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            {!isLogin && (
              <p className="text-xs text-muted-foreground mt-1">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your full name"
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                {isLogin ? <LogIn className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                {isLogin ? 'Sign In' : 'Create Account'}
              </div>
            )}
          </Button>

          <div className="text-center">
            <Button
              type="button"
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};