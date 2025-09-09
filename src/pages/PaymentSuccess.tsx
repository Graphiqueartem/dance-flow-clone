import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [verifying, setVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  const sessionId = searchParams.get('session_id');
  const performanceId = searchParams.get('performance_id');

  useEffect(() => {
    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  const verifyPayment = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) throw error;

      if (data?.payment_status === 'paid') {
        setVerified(true);
        toast({
          title: "Payment Successful! 🎉",
          description: "Your performance has been submitted for review.",
        });
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      toast({
        title: "Verification Error",
        description: "Unable to verify payment status. Please contact support.",
        variant: "destructive"
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleGoToDashboard = () => {
    navigate('/user-dashboard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold mb-2">Verifying Payment...</h2>
            <p className="text-muted-foreground">Please wait while we confirm your payment.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
          </div>
          <CardTitle className="text-2xl text-green-600">
            {verified ? 'Payment Successful!' : 'Payment Processing'}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          {verified ? (
            <>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">Your Performance is Submitted!</h3>
                <p className="text-green-700 text-sm">
                  Thank you for your payment. Your performance has been successfully submitted 
                  and will be reviewed by our expert judges. You'll receive feedback within 5-7 business days.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">What happens next?</h4>
                <div className="text-left space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Performance submitted for review</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Expert judge assigned to your submission</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Detailed feedback delivered to your dashboard</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={handleGoToDashboard} className="flex-1">
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button onClick={handleGoHome} variant="outline" className="flex-1">
                  Back to Home
                </Button>
              </div>
            </>
          ) : (
            <>
              <p className="text-muted-foreground">
                Your payment is being processed. This may take a few moments.
              </p>
              <Button onClick={handleGoToDashboard}>
                Go to Dashboard
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;