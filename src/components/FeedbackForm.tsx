import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Performance } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { databaseService } from '@/services/databaseService';
import { Video, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import FeedbackCategorySection from './feedback/FeedbackCategorySection';
import { FEEDBACK_BANKS, CompleteFeedback, CategoryFeedback } from '@/data/feedbackBanks';

interface FeedbackFormProps {
  performance: Performance;
  judge: { id: string; name: string; email: string };
  onSubmit: () => void;
  onCancel: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ performance, judge, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    technique: true,
    musicality: false,
    performance_expression: false,
    choreography: false,
    overall_impression: false,
  });

  const [feedback, setFeedback] = useState<CompleteFeedback>({
    technique: { score: 5, selectedSentences: [], customComment: '' },
    musicality: { score: 5, selectedSentences: [], customComment: '' },
    performance_expression: { score: 5, selectedSentences: [], customComment: '' },
    choreography: { score: 5, selectedSentences: [], customComment: '' },
    overall_impression: { score: 5, selectedSentences: [], customComment: '' },
  });

  const handleCategoryChange = (categoryId: string, categoryFeedback: CategoryFeedback) => {
    setFeedback(prev => ({
      ...prev,
      [categoryId]: categoryFeedback,
    }));
  };

  const toggleSection = (categoryId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const calculateAverageScore = () => {
    const scores = Object.values(feedback).map(f => f.score);
    return (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
  };

  const isFormComplete = () => {
    return Object.values(feedback).every(
      cat => cat.selectedSentences.length > 0 || cat.customComment.trim() !== ''
    );
  };

  const handleSubmitFeedback = async () => {
    if (hasSubmitted) {
      toast({
        title: "Already Submitted",
        description: "This feedback has already been submitted and cannot be edited.",
        variant: "destructive",
      });
      return;
    }

    if (!isFormComplete()) {
      toast({
        title: "Incomplete Feedback",
        description: "Please provide feedback for all categories before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Compile all feedback into structured text
      const compiledFeedback = FEEDBACK_BANKS.map(category => {
        const catFeedback = feedback[category.id as keyof CompleteFeedback];
        let text = `**${category.label}** (Score: ${catFeedback.score}/10)\n\n`;
        
        if (catFeedback.selectedSentences.length > 0) {
          text += catFeedback.selectedSentences.map(s => `• ${s}`).join('\n');
          text += '\n\n';
        }
        
        if (catFeedback.customComment.trim()) {
          text += `Additional Notes: ${catFeedback.customComment}\n`;
        }
        
        return text;
      }).join('\n---\n\n');

      const feedbackData = {
        performance_id: performance.id,
        judge_id: judge.id,
        judge_name: judge.name,
        text_feedback: compiledFeedback,
        technique: Math.round(feedback.technique.score * 10), // Convert to 0-100 scale
        timing: Math.round(feedback.musicality.score * 10),
        reflex: Math.round(feedback.performance_expression.score * 10),
        smoothness: Math.round(feedback.choreography.score * 10),
        creativity: Math.round(feedback.overall_impression.score * 10),
        overall: Math.round(parseFloat(calculateAverageScore()) * 10),
        submitted_at: new Date().toISOString()
      };

      console.log('Submitting feedback:', feedbackData);
      
      await databaseService.createFeedback(feedbackData);
      
      // Update performance status to 'REVIEWED'
      await databaseService.updatePerformance(performance.id, { status: 'REVIEWED' });
      
      setHasSubmitted(true);
      
      toast({
        title: "Success! 🎉",
        description: "Your feedback has been submitted successfully and cannot be edited.",
      });
      
      // Delay to show success message before closing
      setTimeout(() => {
        onSubmit();
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 sm:pb-8">
      {/* Performance Details Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2 sm:gap-3">
                <Video className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                <CardTitle className="text-lg sm:text-xl lg:text-2xl truncate">{performance.performance_title}</CardTitle>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
                <span>Performer: <strong>{performance.performer_name}</strong></span>
                <span className="hidden sm:inline">•</span>
                <Badge variant="secondary" className="text-xs">{performance.dance_genre}</Badge>
                {performance.feedback_type && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <Badge variant="outline" className="capitalize">
                      {performance.feedback_type} Feedback
                    </Badge>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 space-y-3 sm:space-y-4 px-4 sm:px-6">
          {performance.performance_description && (
            <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">{performance.performance_description}</p>
          )}
          
          {/* Video Review Notice */}
          {(performance.feedback_type === 'PAID' || performance.platinum_upgrade) && (
            <Alert className="border-primary/50 bg-primary/5 p-3 sm:p-4">
              <Video className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <AlertDescription className="text-xs sm:text-sm">
                <strong>Video Feedback Required:</strong> This performer has opted for paid video review. 
                Please record and submit a video feedback along with your written feedback.
              </AlertDescription>
            </Alert>
          )}

          <Button variant="outline" asChild className="w-full sm:w-auto text-xs sm:text-sm">
            <a 
              href={performance.video_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Video className="h-3 w-3 sm:h-4 sm:w-4" />
              Watch Performance Video
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Status Alerts */}
      {hasSubmitted && (
        <Alert className="border-green-500 bg-green-50 p-3 sm:p-4">
          <CheckCircle2 className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
          <AlertDescription className="text-xs sm:text-sm text-green-800">
            Feedback submitted successfully! This form is now locked and cannot be edited.
          </AlertDescription>
        </Alert>
      )}

      {!hasSubmitted && (
        <Alert className="p-3 sm:p-4">
          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
          <AlertDescription className="text-xs sm:text-sm">
            Select feedback points from each category and provide scores. You can also add custom comments. 
            <strong> Once submitted, feedback cannot be edited.</strong>
          </AlertDescription>
        </Alert>
      )}

      {/* Average Score Display */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <CardContent className="pt-4 sm:pt-6 p-4">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground mb-1">Overall Average Score</p>
            <p className="text-3xl sm:text-4xl font-bold text-primary">{calculateAverageScore()}/10</p>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Categories */}
      <div className="space-y-3 sm:space-y-4">
        {FEEDBACK_BANKS.map((category) => (
          <FeedbackCategorySection
            key={category.id}
            title={category.label}
            sentences={category.sentences}
            feedback={feedback[category.id as keyof CompleteFeedback]}
            onChange={(catFeedback) => handleCategoryChange(category.id, catFeedback)}
            isOpen={openSections[category.id]}
            onToggle={() => toggleSection(category.id)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 sticky bottom-0 bg-background/95 backdrop-blur-sm py-3 sm:py-4 border-t px-4 sm:px-0">
        <Button 
          variant="outline" 
          onClick={onCancel}
          disabled={isSubmitting || hasSubmitted}
          className="flex-1 sm:flex-none text-sm"
        >
          {hasSubmitted ? 'Close' : 'Cancel'}
        </Button>
        <Button 
          onClick={handleSubmitFeedback}
          disabled={!isFormComplete() || isSubmitting || hasSubmitted}
          className="flex-1 bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 text-sm"
        >
          {isSubmitting ? 'Submitting...' : hasSubmitted ? 'Submitted ✓' : 'Submit Feedback'}
        </Button>
      </div>

      {!isFormComplete() && !hasSubmitted && (
        <p className="text-xs sm:text-sm text-muted-foreground text-center px-4">
          Please provide feedback in all categories before submitting
        </p>
      )}
    </div>
  );
};

export default FeedbackForm;
