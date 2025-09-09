
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Star, Video, User, Calendar, MessageSquare } from 'lucide-react';
import { Performance } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';

interface FeedbackFormProps {
  performance: Performance;
  judge: { id: string; name: string; email: string };
  onSubmit: () => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  performance, 
  judge, 
  onSubmit, 
  onCancel 
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scores, setScores] = useState({
    technique: [75],
    timing: [75],
    reflex: [75],
    smoothness: [75],
    creativity: [75],
    overall: [75]
  });
  const [textFeedback, setTextFeedback] = useState('');
  const [videoFeedbackUrl, setVideoFeedbackUrl] = useState('');

  const handleScoreChange = (category: keyof typeof scores, value: number[]) => {
    setScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSubmitFeedback = async () => {
    if (!textFeedback.trim()) {
      toast({
        title: "Feedback Required",
        description: "Please provide written feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const feedbackData = {
        performance_id: performance.id,
        judge_id: judge.id,
        judge_name: judge.name,
        technique: scores.technique[0],
        timing: scores.timing[0],
        reflex: scores.reflex[0],
        smoothness: scores.smoothness[0],
        creativity: scores.creativity[0],
        overall: scores.overall[0],
        text_feedback: textFeedback,
        video_feedback_url: videoFeedbackUrl || null
      };

      console.log('Submitting feedback:', feedbackData);
      const result = await databaseService.createFeedback(feedbackData);
      
      if (result) {
        onSubmit();
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageScore = Math.round(
    (scores.technique[0] + scores.timing[0] + scores.reflex[0] + 
     scores.smoothness[0] + scores.creativity[0] + scores.overall[0]) / 6
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Performance Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Performance Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Performance Title</Label>
              <p className="font-semibold">{performance.performance_title}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Performer</Label>
              <p className="font-semibold">{performance.performer_name}</p>
            </div>
            <div>
              <Label className="text-sm font-medium">Dance Genre</Label>
              <Badge variant="outline" className="capitalize">
                {performance.dance_genre}
              </Badge>
            </div>
            <div>
              <Label className="text-sm font-medium">Submitted</Label>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>{new Date(performance.submitted_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          {performance.performance_description && (
            <div className="mt-4">
              <Label className="text-sm font-medium">Description</Label>
              <p className="text-gray-600">{performance.performance_description}</p>
            </div>
          )}
          
          <div className="mt-4">
            <Label className="text-sm font-medium">Video</Label>
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
          </div>
        </CardContent>
      </Card>

      {/* Scoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Performance Scoring
          </CardTitle>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {averageScore}/100
            </div>
            <div className="text-sm text-gray-600">Average Score</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {Object.entries(scores).map(([category, value]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium capitalize">
                  {category} {category === 'overall' ? 'Performance' : ''}
                </Label>
                <span className="text-sm font-semibold text-purple-600">
                  {value[0]}/100
                </span>
              </div>
              <Slider
                value={value}
                onValueChange={(newValue) => handleScoreChange(category as keyof typeof scores, newValue)}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Written Feedback */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Written Feedback
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="text-feedback">Detailed Feedback *</Label>
            <Textarea
              id="text-feedback"
              value={textFeedback}
              onChange={(e) => setTextFeedback(e.target.value)}
              placeholder="Provide detailed feedback on the performance. Include strengths, areas for improvement, and constructive suggestions..."
              rows={6}
              className="mt-1"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="video-feedback">Video Feedback URL (Optional)</Label>
            <Input
              id="video-feedback"
              type="url"
              value={videoFeedbackUrl}
              onChange={(e) => setVideoFeedbackUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=... (optional video response)"
              className="mt-1"
            />
            <p className="text-xs text-gray-600 mt-1">
              You can provide a video response by uploading to YouTube or another platform and sharing the link here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Actions */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button 
          onClick={handleSubmitFeedback} 
          disabled={isSubmitting || !textFeedback.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
    </div>
  );
};

export default FeedbackForm;
