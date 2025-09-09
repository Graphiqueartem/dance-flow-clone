
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ApiStatus: React.FC = () => {
  const [apiStatus, setApiStatus] = useState<{
    judges: 'checking' | 'success' | 'error';
    auth: 'checking' | 'success' | 'error';
    performances: 'checking' | 'success' | 'error';
  }>({
    judges: 'checking',
    auth: 'checking',
    performances: 'checking'
  });

  useEffect(() => {
    const checkEndpoints = async () => {
      // Check judges endpoint
      try {
        const response = await fetch('/api/judges');
        setApiStatus(prev => ({
          ...prev,
          judges: response.ok ? 'success' : 'error'
        }));
      } catch {
        setApiStatus(prev => ({ ...prev, judges: 'error' }));
      }

      // Check auth endpoint
      try {
        const response = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'test' })
        });
        setApiStatus(prev => ({
          ...prev,
          auth: response.ok ? 'success' : 'error'
        }));
      } catch {
        setApiStatus(prev => ({ ...prev, auth: 'error' }));
      }

      // Check performances endpoint
      try {
        const response = await fetch('/api/performances');
        setApiStatus(prev => ({
          ...prev,
          performances: response.ok ? 'success' : 'error'
        }));
      } catch {
        setApiStatus(prev => ({ ...prev, performances: 'error' }));
      }
    };

    checkEndpoints();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="default" className="bg-green-100 text-green-800">Connected</Badge>;
      case 'error':
        return <Badge variant="destructive">Not Available</Badge>;
      default:
        return <Badge variant="secondary">Checking...</Badge>;
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          API Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(apiStatus.judges)}
              <span>Judges API</span>
            </div>
            {getStatusBadge(apiStatus.judges)}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(apiStatus.auth)}
              <span>Authentication API</span>
            </div>
            {getStatusBadge(apiStatus.auth)}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {getStatusIcon(apiStatus.performances)}
              <span>Performances API</span>
            </div>
            {getStatusBadge(apiStatus.performances)}
          </div>
        </div>
        
        {(apiStatus.judges === 'error' || apiStatus.auth === 'error' || apiStatus.performances === 'error') && (
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Some API endpoints are not available. The application will use local storage as a fallback. 
              Please ensure your PHP API files are properly configured in the <code>/public/api/</code> directory.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
