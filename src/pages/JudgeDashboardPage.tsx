import React from 'react';
import { AuthGuard } from '@/components/auth/AuthGuard';
import JudgeDashboard from '@/components/JudgeDashboard';
import { useAuth } from '@/contexts/AuthContext';

const JudgeDashboardPage: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <AuthGuard requiredRole="judge">
      <JudgeDashboard 
        judge={{ 
          id: profile.id, 
          name: profile.name, 
          email: profile.email 
        }} 
        onLogout={() => {}} 
      />
    </AuthGuard>
  );
};

export default JudgeDashboardPage;