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
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navigation onBack={() => setShowProfile(false)} title="My Profile" />
        <div className="max-w-4xl mx-auto p-4 sm:p-6 w-full">
          <JudgeProfile judge={judgeData} isOwnProfile={true} />
        </div>
      </div>
    );
  }

  if (showFeedbackForm && selectedPerformance) {
    return (
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navigation onBack={() => setShowFeedbackForm(false)} title="Provide Feedback" />
        <div className="max-w-4xl mx-auto p-4 sm:p-6 w-full">
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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {onBack && <Navigation onBack={onBack} title="Judge Dashboard" />}
      <div className="max-w-6xl mx-auto p-4 sm:p-6 w-full">
        {/* Header */}
        <div className="mb-6 sm:mb-8 w-full">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white w-full">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 border-2 sm:border-4 border-white flex-shrink-0">
                    <AvatarImage src={judgeData?.profile_image} />
                    <AvatarFallback className="bg-white text-purple-600 text-base sm:text-lg font-bold">
                      {judge.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold truncate">Welcome, {judge.name}!</h1>
                    <p className="text-purple-100 text-sm sm:text-base truncate">{judge.email}</p>
                    {judgeData?.is_platinum && (
                      <Badge className="bg-yellow-500 text-yellow-900 mt-1 sm:mt-2 text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        Platinum Judge
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <Button 
                    variant="secondary" 
                    onClick={() => setShowProfile(true)}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <User className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={onLogout}
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
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
            <TabsList className="grid w-full grid-cols-2 h-auto">
              <TabsTrigger value="performances" className="text-xs sm:text-sm py-2">
                <span className="hidden sm:inline">Performances to Review</span>
                <span className="sm:hidden">Performances</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="text-xs sm:text-sm py-2">
                <span className="hidden sm:inline">Feedback Requests</span>
                <span className="sm:hidden">Requests</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="performances" className="mt-4 sm:mt-6 w-full">
              <div className="w-full">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">Performances Awaiting Review</h2>
                <div className="grid gap-4 sm:gap-6 w-full">
                  {performances.filter(p => p.status !== 'REVIEWED').map((performance) => (
                    <Card key={performance.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg truncate">{performance.performance_title}</CardTitle>
                            <p className="text-sm text-gray-600 truncate">by {performance.performer_name}</p>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs">{new Date(performance.submitted_at).toLocaleDateString()}</span>
                              </div>
                              <Badge variant="outline" className="capitalize text-xs">
                                {performance.dance_genre}
                              </Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            {getStatusIcon(performance.status)}
                            <Badge className={`${getStatusColor(performance.status)} text-xs whitespace-nowrap`}>
                              {performance.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {performance.performance_description || 'No description provided'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Video className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                            <a 
                              href={performance.video_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-blue-600 hover:underline truncate"
                            >
                              View Performance Video
                            </a>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
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

            <TabsContent value="requests" className="mt-4 sm:mt-6 w-full">
              <div className="w-full">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">Direct Feedback Requests</h2>
                <div className="grid gap-4 sm:gap-6 w-full">
                  {feedbackRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-base sm:text-lg truncate">{request.performance_title}</CardTitle>
                            <p className="text-sm text-gray-600 truncate">from {request.performer_name}</p>
                            <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs">{new Date(request.requested_at).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(request.status)} text-xs whitespace-nowrap`}>
                            {request.status.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 sm:p-6 pt-0">
                        <div className="space-y-3 sm:space-y-4">
                          <div>
                            <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                              {request.performance_description || 'No description provided'}
                            </p>
                          </div>
                          {request.message && (
                            <div>
                              <strong className="text-xs sm:text-sm">Message:</strong>
                              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{request.message}</p>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Video className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
                            <a 
                              href={request.video_url}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs sm:text-sm text-blue-600 hover:underline truncate"
                            >
                              View Performance Video
                            </a>
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                                onClick={() => handleAcceptRequest(request.id)}
                                size="sm"
                              >
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                                Accept
                              </Button>
                              <Button 
                                variant="outline"
                                onClick={() => handleDeclineRequest(request.id)}
                                size="sm"
                                className="text-xs sm:text-sm"
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
                      <CardContent className="text-center py-6 sm:py-8">
                        <p className="text-sm sm:text-base text-gray-600">No feedback requests at the moment.</p>
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
