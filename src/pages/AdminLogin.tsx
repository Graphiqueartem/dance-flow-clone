import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import heroImage from '@/assets/hero-dance.jpg';
const adminLoginImage = '/lovable-uploads/b0860258-46f0-4e90-abc6-5f88cb2d3f46.png';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && profile) {
      if (profile.role === 'admin') {
        navigate('/admin');
      } else {
        // Redirect non-admin users away from this page
        navigate('/');
      }
    }
  }, [user, profile, loading, navigate]);

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
      <div className="absolute inset-0 opacity-10">
        <img 
          src={adminLoginImage} 
          alt="Hip-hop dance crew with dramatic lighting and smoke effects" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-primary/20 shadow-xl">
          <CardHeader className="text-center bg-primary/5">
            <div className="flex justify-center mb-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Administrative Access
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Secure admin portal for platform management
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Default credentials: admin@lovedancelive.com / LoveDance2024!Secure
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="p-6">
              <AuthForm mode="admin" onSuccess={handleAuthSuccess} />
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            Authorized personnel only. All access is logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;