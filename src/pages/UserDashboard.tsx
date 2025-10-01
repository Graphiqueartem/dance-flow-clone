import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  Trophy, 
  Video, 
  Star, 
  Calendar, 
  DollarSign,
  LogOut,
  Edit,
  Eye,
  Download
} from 'lucide-react';

interface Performance {
  id: string;
  performer_name: string;
  performance_title: string;
  status: string;
  submitted_at: string;
  video_url: string;
  feedback_type: string;
}

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

interface Feedback {
  id: string;
  judge_name: string;
  text_feedback: string;
  timing: number;
  technique: number;
  creativity: number;
  overall: number;
  submitted_at: string;
}

const UserDashboard: React.FC = () => {
  const { signOut, profile, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect judges to their dashboard
  useEffect(() => {
    if (profile?.role === 'judge') {
      navigate('/judge-dashboard', { replace: true });
    }
  }, [profile, navigate]);

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user?.email) return;
    
    setLoading(true);
    try {
      // Load performances
      const { data: performancesData, error: perfError } = await supabase
        .from('performances')
        .select('*')
        .eq('email', user.email)
        .order('submitted_at', { ascending: false });

      if (perfError) throw perfError;
      setPerformances(performancesData || []);

      // Load orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Load feedback for user's performances
      if (performancesData && performancesData.length > 0) {
        const performanceIds = performancesData.map(p => p.id);
        const { data: feedbackData, error: feedbackError } = await supabase
          .from('performance_feedback')
          .select('*')
          .in('performance_id', performanceIds)
          .order('submitted_at', { ascending: false });

        if (feedbackError) throw feedbackError;
        setFeedback(feedbackData || []);
      }

    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateAverageScore = (feedback: Feedback) => {
    const scores = [feedback.timing, feedback.technique, feedback.creativity, feedback.overall].filter(s => s > 0);
    if (scores.length === 0) return 0;
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-primary text-primary-foreground shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {profile?.name}</h1>
                  <p className="text-primary-foreground/80 capitalize">{profile?.role} Dashboard</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="secondary" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Video className="h-8 w-8 text-primary" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Performances</p>
                    <p className="text-2xl font-bold">{performances.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-accent" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Reviews Received</p>
                    <p className="text-2xl font-bold">{feedback.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Orders</p>
                    <p className="text-2xl font-bold">{orders.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Trophy className="h-8 w-8 text-gold" />
                  <div className="ml-4">
                    <p className="text-sm text-muted-foreground">Avg. Score</p>
                    <p className="text-2xl font-bold">
                      {feedback.length > 0 
                        ? Math.round(feedback.reduce((sum, f) => sum + calculateAverageScore(f), 0) / feedback.length)
                        : 0
                      }/10
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="performances" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="performances">My Performances</TabsTrigger>
              <TabsTrigger value="feedback">Reviews & Feedback</TabsTrigger>
              <TabsTrigger value="orders">Orders & Payments</TabsTrigger>
            </TabsList>

            {/* Performances Tab */}
            <TabsContent value="performances" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    My Performance Submissions
                  </CardTitle>
                  <CardDescription>
                    Track all your submitted performances and their review status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {performances.length === 0 ? (
                    <div className="text-center py-8">
                      <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">No performances submitted yet</p>
                      <Button asChild>
                        <a href="/performance-review-form">Submit Your First Performance</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {performances.map((performance) => (
                        <div
                          key={performance.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-lg">{performance.performance_title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">
                                Submitted: {new Date(performance.submitted_at).toLocaleDateString()}
                              </p>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={getStatusColor(performance.status)}>
                                  {performance.status}
                                </Badge>
                                <Badge variant="outline">
                                  {performance.feedback_type}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" asChild>
                                <a href={performance.video_url} target="_blank" rel="noopener noreferrer">
                                  <Eye className="h-4 w-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Reviews & Feedback
                  </CardTitle>
                  <CardDescription>
                    Professional feedback from our expert judges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {feedback.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No feedback received yet</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {feedback.map((review) => (
                        <div
                          key={review.id}
                          className="border rounded-lg p-6 bg-card"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-medium text-lg">Review by {review.judge_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {new Date(review.submitted_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {calculateAverageScore(review)}/10
                              </div>
                              <p className="text-xs text-muted-foreground">Overall Score</p>
                            </div>
                          </div>

                          {/* Score Breakdown */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            {[
                              { label: 'Timing', score: review.timing },
                              { label: 'Technique', score: review.technique },
                              { label: 'Creativity', score: review.creativity },
                              { label: 'Overall', score: review.overall }
                            ].map((item) => (
                              <div key={item.label} className="text-center">
                                <div className="text-lg font-semibold">{item.score}/10</div>
                                <div className="text-xs text-muted-foreground">{item.label}</div>
                              </div>
                            ))}
                          </div>

                          {/* Text Feedback */}
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h5 className="font-medium mb-2">Judge's Comments:</h5>
                            <p className="text-sm leading-relaxed">{review.text_feedback}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Orders & Payments
                  </CardTitle>
                  <CardDescription>
                    Track your payment history and order status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No orders found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">
                                ${order.amount.toFixed(2)} {order.currency.toUpperCase()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
};

export default UserDashboard;