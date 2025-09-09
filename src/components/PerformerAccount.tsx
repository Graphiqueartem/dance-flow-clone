
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Clock, CheckCircle, XCircle, User, Mail, Calendar, MessageCircle, Eye, Video } from 'lucide-react';
import Navigation from './Navigation';
import { Performance } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';

interface PerformerAccountProps {
  onBack?: () => void;
}

interface FeedbackRequest {
  id: string;
  judge_id: string;
  judge_name: string;
  performer_name: string;
  performer_email: string;
  performance_title: string;
  performance_description: string;
  video_url: string;
  message: string;
  requested_at: string;
  status: 'pending' | 'accepted' | 'declined';
}

const PerformerAccount: React.FC<PerformerAccountProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [feedbackRequests, setFeedbackRequests] = useState<FeedbackRequest[]>([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [filteredPerformances, setFilteredPerformances] = useState<Performance[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<FeedbackRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchEmail.trim()) {
      setFilteredPerformances([]);
      setFilteredRequests([]);
      toast({
        title: "Email Required",
        description: "Please enter your email address to search.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Searching for performances by email:', searchEmail);
      
      // Load performances by email from database
      const performancesByEmail = await databaseService.getPerformancesByEmail(searchEmail);
      console.log('Found performances:', performancesByEmail);
      setFilteredPerformances(performancesByEmail);

      // Load feedback requests from database
      const allRequests = await databaseService.getFeedbackRequests();
      const userRequests = allRequests.filter(r => 
        r.performer_email?.toLowerCase() === searchEmail.toLowerCase()
      );
      console.log('Found feedback requests:', userRequests);
      setFilteredRequests(userRequests);

      if (performancesByEmail.length === 0 && userRequests.length === 0) {
        toast({
          title: "No Data Found",
          description: "No submissions or requests found for this email address.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Data Loaded",
          description: `Found ${performancesByEmail.length} submissions and ${userRequests.length} requests.`,
        });
      }
    } catch (error) {
      console.error('Error searching for user data:', error);
      toast({
        title: "Search Failed",
        description: "Failed to load your data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
      case 'completed':
      case 'accepted':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'declined':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'reviewed':
      case 'completed':
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'declined':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {onBack && <Navigation onBack={onBack} title="My Account" />}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email-search">Search by Email Address</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="email-search"
                      type="email"
                      placeholder="Enter your email address"
                      value={searchEmail}
                      onChange={(e) => setSearchEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button onClick={handleSearch} disabled={isLoading}>
                      {isLoading ? 'Searching...' : 'Search'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {(filteredPerformances.length > 0 || filteredRequests.length > 0) && (
          <Tabs defaultValue="submissions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="submissions">Performance Submissions ({filteredPerformances.length})</TabsTrigger>
              <TabsTrigger value="requests">Feedback Requests ({filteredRequests.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="submissions" className="mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Performance Submissions</h2>
                <div className="grid gap-6">
                  {filteredPerformances.map((performance) => (
                    <Card key={performance.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{performance.performance_title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Mail className="h-4 w-4" />
                                {performance.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(performance.submitted_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(performance.status)}
                            <Badge className={getStatusColor(performance.status)}>
                              {performance.status.replace('_', ' ').toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <Label className="text-sm font-medium">Performer</Label>
                            <p className="text-sm text-gray-600">{performance.performer_name}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Dance Genre</Label>
                            <p className="text-sm text-gray-600 capitalize">{performance.dance_genre}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Feedback Type</Label>
                            <p className="text-sm text-gray-600 capitalize">{performance.feedback_type}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Country</Label>
                            <p className="text-sm text-gray-600">{performance.country}</p>
                          </div>
                        </div>

                        {performance.performance_description && (
                          <div className="mb-4">
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-sm text-gray-600">{performance.performance_description}</p>
                          </div>
                        )}

                        <div className="mb-4">
                          <Label className="text-sm font-medium">Video</Label>
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-gray-500" />
                            <a 
                              href={performance.video_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              View Performance Video
                            </a>
                          </div>
                        </div>

                        {performance.status === 'REVIEWED' && (
                          <>
                            <Separator className="my-4" />
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold flex items-center gap-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  Judge Feedback Available
                                </h4>
                                <p className="text-sm text-green-600">
                                  Your performance has been reviewed! Check back soon for detailed feedback.
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="requests" className="mt-6">
              <div>
                <h2 className="text-2xl font-bold mb-6">Your Feedback Requests</h2>
                <div className="grid gap-6">
                  {filteredRequests.map((request) => (
                    <Card key={request.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{request.performance_title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Requested from {request.judge_name}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(request.requested_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(request.status)}
                            <Badge className={getStatusColor(request.status)}>
                              {request.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Performance Description</Label>
                            <p className="text-sm text-gray-600">{request.performance_description || 'No description provided'}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Video</Label>
                            <div className="flex items-center gap-2">
                              <Video className="h-4 w-4 text-gray-500" />
                              <a 
                                href={request.video_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline text-sm"
                              >
                                View Performance Video
                              </a>
                            </div>
                          </div>
                          {request.message && (
                            <div>
                              <Label className="text-sm font-medium">Your Message</Label>
                              <p className="text-sm text-gray-600">{request.message}</p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {searchEmail && filteredPerformances.length === 0 && filteredRequests.length === 0 && !isLoading && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-600">No submissions or requests found for this email address.</p>
              <p className="text-sm text-gray-500 mt-2">
                Make sure you're using the same email address you used when submitting performances or requesting feedback.
              </p>
            </CardContent>
          </Card>
        )}

        {!searchEmail && (
          <Card>
            <CardContent className="text-center py-8">
              <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Enter your email address to view your performance submissions and feedback requests.</p>
              <p className="text-sm text-gray-500">
                All your data is stored securely in our database and can be accessed anytime using your email.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PerformerAccount;
