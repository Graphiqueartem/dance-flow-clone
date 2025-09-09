
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LogOut, User, Clock, Crown, Globe } from 'lucide-react';
import { Performance } from '@/types/performance';

interface JudgeDashboardHeaderProps {
  judge: { id: string; name: string; email: string };
  selectedPerformance?: Performance | null;
  currentIndex?: number;
  pendingCount?: number;
  onLogout: () => void;
}

const JudgeDashboardHeader: React.FC<JudgeDashboardHeaderProps> = ({
  judge,
  selectedPerformance,
  currentIndex = 0,
  pendingCount = 0,
  onLogout
}) => {
  if (selectedPerformance) {
    return (
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-700 to-purple-600 bg-clip-text text-transparent">
            Judge Dashboard
          </h1>
          <p className="text-gray-600 mt-1">Reviewing assigned performances</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm">
            <User className="h-4 w-4" />
            {judge.name}
          </div>
          <Button variant="outline" onClick={onLogout} className="hover:bg-red-50 hover:text-red-600 hover:border-red-300">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-12">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-700 to-purple-600 bg-clip-text text-transparent mb-2">
          Judge Dashboard
        </h1>
        <p className="text-xl text-gray-600">Welcome back, {judge.name}</p>
        <p className="text-sm text-gray-500 mt-1">You see only performances assigned to you</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm text-gray-500">Logged in as</div>
          <div className="font-medium text-gray-900">{judge.name}</div>
        </div>
        <Button variant="outline" onClick={onLogout} className="hover:bg-red-50 hover:text-red-600 hover:border-red-300">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default JudgeDashboardHeader;
