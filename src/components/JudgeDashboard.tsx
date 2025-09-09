import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, LogOut, User, MessageSquare, Eye, Clock, CheckCircle, Award, Calendar, Video } from 'lucide-react';
import Navigation from './Navigation';
import JudgeProfile from './JudgeProfile';
import FeedbackForm from './FeedbackForm';
import { Performance, Judge } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';

interface JudgeDashboardProps {
  judge: { id: string; name: string; email: string };
  onLogout: () => void;
  onBack?: () => void;
}

const JudgeDashboard: React.FC<JudgeDashboardProps> = ({ judge, onLogout, onBack }) => {
  const { toast } = useToast();
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [feedbackRequests, setFeedbackRequests] = useState<any[]>([]);
  const [selectedPerformance, setSelectedPerformance] = useState<Performance | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [judgeData, setJudgeData] = useState<Judge | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [judge.id]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      console.log('Loading dashboard data for judge:', judge.id);
      
      // Load all performances
      const allPerformances = await databaseService.getPerformances();
      setPerformances(allPerformances);
      
      // Load feedback requests
      const requests = await databaseService.getFeedbackRequests(judge.id);
      setFeedbackRequests(requests);
      
      // Load judge profile data
      const judges = await databaseService.getJudges();
      const currentJudge = judges.find(j => j.id === judge.id || j.email === judge.email);
      if (currentJudge) {
        setJudgeData(currentJudge);
      }
      
      console.log('Dashboard data loaded:', { allPerformances, requests, currentJudge });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error Loading Data",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleProvideFeedback = (performance: Performance) => {
    setSelectedPerformance(performance);
    setShowFeedbackForm(true);
  };

  const handleFeedbackSubmitted = () => {
    setShowFeedbackForm(false);
    setSelectedPerformance(null);
    loadDashboardData(); // Reload data
    toast({
      title: "Feedback Submitted! 🎉",
      description: "Your feedback has been saved successfully.",
    });
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await databaseService.updateFeedbackRequest(requestId, 'accepted');
      loadDashboardData();
      toast({
        title: "Request Accepted",
        description: "You have accepted the feedback request.",
      });
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeclineRequest = async (requestId: string) => {
    try {
      await databaseService.updateFeedbackRequest(requestId, 'declined');
      loadDashboardData();
      toast({
        title: "Request Declined",
        description: "You have declined the feedback request.",
      });
    } catch (error) {
      console.error('Error declining request:', error);
      toast({
        title: "Error",
        description: "Failed to decline request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (showProfile && judgeData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onBack={() => setShowProfile(false)} title="My Profile" />
        <div className="max-w-4xl mx-auto p-6">
          <JudgeProfile judge={judgeData} isOwnProfile={true} />
        </div>
      </div>
    );
  }

  if (showFeedbackForm && selectedPerformance) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onBack={() => setShowFeedbackForm(false)} title="Provide Feedback" />
        <div className="max-w-4xl mx-auto p-6">
          <FeedbackForm
            performance={selectedPerformance}
            judge={judge}
            onSubmit={handleFeedbackSubmitted}
            onCancel={() => setShowFeedbackForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {onBack && <Navigation onBack={onBack} title="Judge Dashboard" />}
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-4 border-white">
                    <AvatarImage src={judgeData?.profile_image} />
                    <AvatarFallback className="bg-white text-purple-600 text-lg font-bold">
                      {judge.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="text-3xl font-bold">Welcome, {judge.name}!</h1>
                    <p className="text-purple-100">{judge.email}</p>
                    {judgeData?.is_platinum && (
                      <Badge className="bg-yellow-500 text-yellow-900 mt-2">
                        <Award className="h-3 w-3 mr-1" />
                        Platinum Judge
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setShowProfile(true)}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button variant="secondary" onClick={onLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">Loading dashboard...</p>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="performances" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="performances">Performances to Review</TabsTrigger>
              <TabsTrigger value="requests">Feedback Requests</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performances" className="mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Performances Awaiting Review</h2>
                <div className="grid gap-6">
                  {performances.filter(p => p.status !== 'REVIEWED').map((performance) => (
                    <Card key={performance.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{performance.performance_title}</CardTitle>
                            <p className="text-gray-600">by {performance.performer_name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(performance.submitted_at).toLocaleDateString()}
                              </div>
                              <Badge variant="outline" className="capitalize">
                                {performance.dance_genre}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(performance.status)}
                            <Badge className={getStatusColor(performance.status)}>
                              {performance.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              {performance.performance_description || 'No description provided'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-gray-500" />
                            <a 
                              href={performance.video_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Performance Video
                            </a>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                              onClick={() => handleProvideFeedback(performance)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Provide Feedback
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {performances.filter(p => p.status !== 'REVIEWED').length === 0 && (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-600">No performances awaiting review at the moment.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Direct Feedback Requests</h2>
                <div className="grid gap-6">
                  {feedbackRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{request.performance_title}</CardTitle>
                            <p className="text-gray-600">from {request.performer_name}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(request.requested_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-600">
                              {request.performance_description || 'No description provided'}
                            </p>
                          </div>
                          {request.message && (
                            <div>
                              <strong className="text-sm">Message:</strong>
                              <p className="text-sm text-gray-600">{request.message}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-gray-500" />
                            <a 
                              href={request.video_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Performance Video
                            </a>
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex gap-2">
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleAcceptRequest(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Accept
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleDeclineRequest(request.id)}
                              >
                                Decline
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {feedbackRequests.length === 0 && (
                    <Card>
                      <CardContent className="text-center py-8">
                        <p className="text-gray-600">No feedback requests at the moment.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default JudgeDashboard;
