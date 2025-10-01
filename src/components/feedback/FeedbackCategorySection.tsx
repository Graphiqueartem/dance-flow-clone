import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleSentenceAdd = (sentence: string) => {
    if (!feedback.selectedSentences.includes(sentence)) {
      onChange({ ...feedback, selectedSentences: [...feedback.selectedSentences, sentence] });
    }
  };

  const handleSentenceRemove = (sentence: string) => {
    onChange({ 
      ...feedback, 
      selectedSentences: feedback.selectedSentences.filter((s) => s !== sentence) 
    });
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

            {/* Feedback Sentences Dropdown */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Add Feedback Points</Label>
              <Select onValueChange={handleSentenceAdd}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a feedback point to add..." />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {sentences
                    .filter(s => !feedback.selectedSentences.includes(s))
                    .map((sentence, index) => (
                      <SelectItem key={index} value={sentence} className="cursor-pointer">
                        {sentence}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              
              {/* Selected Feedback Points */}
              {feedback.selectedSentences.length > 0 && (
                <div className="space-y-2 mt-3">
                  <p className="text-sm font-medium">
                    Selected Points ({feedback.selectedSentences.length}):
                  </p>
                  <div className="space-y-2">
                    {feedback.selectedSentences.map((sentence, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors"
                      >
                        <span className="flex-1 text-sm">{sentence}</span>
                        <button
                          onClick={() => handleSentenceRemove(sentence)}
                          className="text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                          aria-label="Remove feedback point"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
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
