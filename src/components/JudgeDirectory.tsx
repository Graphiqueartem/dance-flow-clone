
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star, Search, User, Award, MapPin, MessageCircle, Eye } from 'lucide-react';
import Navigation from './Navigation';
import JudgeProfile from './JudgeProfile';
import { Judge } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';

interface JudgeDirectoryProps {
  onBack?: () => void;
}

interface FeedbackRequest {
  id: string;
  judgeId: string;
  judgeName: string;
  performerName: string;
  performerEmail: string;
  performanceTitle: string;
  performanceDescription: string;
  videoUrl: string;
  message: string;
  requestedAt: string;
  status: 'pending' | 'accepted' | 'declined';
}

const JudgeDirectory: React.FC<JudgeDirectoryProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [judges, setJudges] = useState<Judge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJudges, setFilteredJudges] = useState<Judge[]>([]);
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestingJudge, setRequestingJudge] = useState<Judge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Form states for feedback request
  const [performerName, setPerformerName] = useState('');
  const [performerEmail, setPerformerEmail] = useState('');
  const [performanceTitle, setPerformanceTitle] = useState('');
  const [performanceDescription, setPerformanceDescription] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    loadJudges();
  }, []);

  const loadJudges = async () => {
    try {
      setIsLoading(true);
      console.log('Loading judges from database...');
      const judgesFromDb = await databaseService.getJudges();
      console.log('Loaded judges:', judgesFromDb);
      setJudges(judgesFromDb);
      setFilteredJudges(judgesFromDb);
    } catch (error) {
      console.error('Error loading judges:', error);
      toast({
        title: "Error Loading Judges",
        description: "Failed to load judges from database.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredJudges(judges);
    } else {
      const filtered = judges.filter(judge =>
        judge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (judge.dance_genres && judge.dance_genres.some(genre => 
          genre.toLowerCase().includes(searchTerm.toLowerCase())
        )) ||
        (judge.country && judge.country.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredJudges(filtered);
    }
  }, [searchTerm, judges]);

  const handleRequestFeedback = (judge: Judge) => {
    setRequestingJudge(judge);
    setShowRequestDialog(true);
  };

  const handleSubmitRequest = () => {
    if (!requestingJudge || !performerName || !performerEmail || !performanceTitle || !videoUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const feedbackRequest: FeedbackRequest = {
      id: Date.now().toString(),
      judgeId: requestingJudge.id,
      judgeName: requestingJudge.name,
      performerName,
      performerEmail,
      performanceTitle,
      performanceDescription,
      videoUrl,
      message: requestMessage,
      requestedAt: new Date().toISOString(),
      status: 'pending'
    };

    // Store feedback request
    const existingRequests = JSON.parse(localStorage.getItem('feedbackRequests') || '[]');
    localStorage.setItem('feedbackRequests', JSON.stringify([...existingRequests, feedbackRequest]));

    // Reset form
    setPerformerName('');
    setPerformerEmail('');
    setPerformanceTitle('');
    setPerformanceDescription('');
    setVideoUrl('');
    setRequestMessage('');
    setShowRequestDialog(false);
    setRequestingJudge(null);

    toast({
      title: "Request Sent! 📨",
      description: `Your feedback request has been sent to ${requestingJudge.name}. You can check the status in your performer account.`,
    });
  };

  const handleViewProfile = (judge: Judge) => {
    setSelectedJudge(judge);
    setShowProfile(true);
  };

  if (showProfile && selectedJudge) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation onBack={() => setShowProfile(false)} title={`${selectedJudge.name}'s Profile`} />
        <div className="max-w-4xl mx-auto p-6">
          <JudgeProfile judge={selectedJudge} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {onBack && <Navigation onBack={onBack} title="Browse Judges" />}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Expert Judge Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search Judges</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="search"
                      placeholder="Search by name, specialty, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6">
          {isLoading ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">Loading judges...</p>
              </CardContent>
            </Card>
          ) : filteredJudges.length > 0 ? (
            filteredJudges.map((judge) => (
              <Card key={judge.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{judge.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {judge.country || 'Not specified'}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            {judge.rating || 5.0} ({judge.review_count || 0} reviews)
                          </div>
                          {judge.is_platinum && (
                            <Badge className="bg-purple-100 text-purple-800">
                              Platinum Judge
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Specialties</Label>
                      <div className="flex gap-2 mt-1">
                        {(judge.dance_genres || []).map((genre) => (
                          <Badge key={genre} variant="outline">
                            {genre}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Bio</Label>
                      <p className="text-sm text-gray-600 mt-1">
                        {judge.bio || 'Professional judge with expertise in performance evaluation.'}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        onClick={() => handleRequestFeedback(judge)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Request Feedback
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewProfile(judge)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-gray-600">
                  {searchTerm ? 'No judges found matching your search criteria.' : 'No judges found in the database.'}
                </p>
                {!searchTerm && (
                  <Button 
                    variant="outline" 
                    onClick={loadJudges}
                    className="mt-4"
                  >
                    Refresh
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Request Feedback Dialog */}
      <Dialog open={showRequestDialog} onOpenChange={setShowRequestDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Feedback from {requestingJudge?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="performer-name">Your Name *</Label>
                <Input
                  id="performer-name"
                  value={performerName}
                  onChange={(e) => setPerformerName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="performer-email">Email Address *</Label>
                <Input
                  id="performer-email"
                  type="email"
                  value={performerEmail}
                  onChange={(e) => setPerformerEmail(e.target.value)}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="performance-title">Performance Title *</Label>
              <Input
                id="performance-title"
                value={performanceTitle}
                onChange={(e) => setPerformanceTitle(e.target.value)}
                placeholder="What is your performance called?"
              />
            </div>

            <div>
              <Label htmlFor="performance-description">Performance Description</Label>
              <Textarea
                id="performance-description"
                value={performanceDescription}
                onChange={(e) => setPerformanceDescription(e.target.value)}
                placeholder="Briefly describe your performance..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="video-url">Video URL *</Label>
              <Input
                id="video-url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <Label htmlFor="request-message">Message to Judge</Label>
              <Textarea
                id="request-message"
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                placeholder="Any specific questions or areas you'd like feedback on?"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowRequestDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitRequest}>
                Send Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JudgeDirectory;
