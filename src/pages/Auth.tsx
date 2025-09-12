import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import heroImage from '@/assets/hero-dance.jpg';
const authPageImage = '/lovable-uploads/7b552ba3-15eb-4c78-881a-39a59b4dde8c.png';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, profile, loading } = useAuth();
  
  const mode = searchParams.get('mode') as 'admin' | 'judge' | 'performer' || 'performer';
  const redirect = searchParams.get('redirect');

  useEffect(() => {
    if (!loading && user && profile) {
      // Check if there's a redirect URL first
      if (redirect) {
        navigate(redirect);
        return;
      }
      
      // Otherwise redirect based on user role
      switch (profile.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'judge':
          navigate('/judge-dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [user, profile, loading, navigate, redirect]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const handleAuthSuccess = () => {
    // Redirect will be handled by useEffect above
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={authPageImage} 
          alt="Solo breakdancer performing dynamic freeze move with artistic lighting" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/60"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Love Dance Live
          </h1>
          <p className="text-muted-foreground">
            Professional dance performance platform
          </p>
        </div>
        
        <AuthForm mode={mode} defaultTab={mode === 'admin' ? 'performer' : mode} onSuccess={handleAuthSuccess} />
      </div>
    </div>
  );
};

export default Auth;