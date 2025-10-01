import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CategoryFeedback } from '@/data/feedbackBanks';

interface FeedbackCategorySectionProps {
  title: string;
  sentences: string[];
  feedback: CategoryFeedback;
  onChange: (feedback: CategoryFeedback) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const FeedbackCategorySection: React.FC<FeedbackCategorySectionProps> = ({
  title,
  sentences,
  feedback,
  onChange,
  isOpen,
  onToggle,
}) => {
  const handleScoreChange = (value: number[]) => {
    onChange({ ...feedback, score: value[0] });
  };

  const handleSentenceToggle = (sentence: string) => {
    const isSelected = feedback.selectedSentences.includes(sentence);
    const newSelected = isSelected
      ? feedback.selectedSentences.filter((s) => s !== sentence)
      : [...feedback.selectedSentences, sentence];
    
    onChange({ ...feedback, selectedSentences: newSelected });
  };

  const handleCustomCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange({ ...feedback, customComment: e.target.value });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <Card className="border-2 hover:border-primary/50 transition-colors">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CardTitle className="text-xl">{title}</CardTitle>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  {feedback.score}/10
                </Badge>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-0">
            {/* Score Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base font-semibold">Score</Label>
                <span className="text-sm text-muted-foreground">
                  {feedback.score}/10
                </span>
              </div>
              <Slider
                value={[feedback.score]}
                onValueChange={handleScoreChange}
                max={10}
                min={0}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Feedback Sentences */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Select Feedback Points</Label>
              <div className="flex flex-wrap gap-2">
                {sentences.map((sentence, index) => {
                  const isSelected = feedback.selectedSentences.includes(sentence);
                  return (
                    <Badge
                      key={index}
                      variant={isSelected ? 'default' : 'outline'}
                      className={`cursor-pointer px-3 py-2 text-sm transition-all hover:scale-105 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => handleSentenceToggle(sentence)}
                    >
                      {sentence}
                    </Badge>
                  );
                })}
              </div>
              {feedback.selectedSentences.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  {feedback.selectedSentences.length} point{feedback.selectedSentences.length !== 1 ? 's' : ''} selected
                </p>
              )}
            </div>

            {/* Custom Comment */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Additional Comments (Optional)</Label>
              <Textarea
                value={feedback.customComment}
                onChange={handleCustomCommentChange}
                placeholder="Add your own observations or notes here..."
                className="min-h-[100px] resize-none"
              />
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export default FeedbackCategorySection;
