import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Judge } from '@/types/performance';
import { DollarSign, Clock, MessageSquare } from 'lucide-react';

interface HireJudgeDialogProps {
  judge: Judge;
  children: React.ReactNode;
}

const HireJudgeDialog: React.FC<HireJudgeDialogProps> = ({ judge, children }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    performer_name: '',
    performer_email: '',
    performance_title: '',
    performance_description: '',
    video_url: '',
    message: '',
    session_type: 'private_coaching' as 'private_coaching' | 'performance_review' | 'masterclass',
    duration: '60' as '30' | '60' | '90' | '120'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        judge_id: judge.id,
        judge_name: judge.name,
        performer_name: formData.performer_name,
        performer_email: formData.performer_email,
        performance_title: formData.performance_title,
        performance_description: formData.performance_description,
        video_url: formData.video_url,
        message: `Hiring Request for ${formData.session_type.replace('_', ' ')} (${formData.duration} min session)\n\n${formData.message}`,
        status: 'pending' as const
      };

      const { error } = await supabase
        .from('feedback_requests')
        .insert(requestData);

      if (error) throw error;

      toast({
        title: 'Hiring Request Sent! 🎉',
        description: `Your request has been sent to ${judge.name}. They will contact you soon at ${formData.performer_email}.`
      });

      setIsOpen(false);
      setFormData({
        performer_name: '',
        performer_email: '',
        performance_title: '',
        performance_description: '',
        video_url: '',
        message: '',
        session_type: 'private_coaching',
        duration: '60'
      });
    } catch (error) {
      console.error('Error submitting hire request:', error);
      toast({
        title: 'Error',
        description: 'Failed to send hiring request. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSessionPrice = () => {
    const baseRate = judge.hourly_rate || 75;
    const durationMultiplier = parseInt(formData.duration) / 60;
    return Math.round(baseRate * durationMultiplier);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            Hire {judge.name}
          </DialogTitle>
          <DialogDescription>
            Book a private session with {judge.name} - ${judge.hourly_rate || 75}/hour
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="performer_name">Your Name</Label>
              <Input
                id="performer_name"
                value={formData.performer_name}
                onChange={(e) => setFormData(prev => ({ ...prev, performer_name: e.target.value }))}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="performer_email">Your Email</Label>
              <Input
                id="performer_email"
                type="email"
                value={formData.performer_email}
                onChange={(e) => setFormData(prev => ({ ...prev, performer_email: e.target.value }))}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="session_type">Session Type</Label>
              <Select 
                value={formData.session_type} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, session_type: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private_coaching">Private Coaching</SelectItem>
                  <SelectItem value="performance_review">Performance Review</SelectItem>
                  <SelectItem value="masterclass">Masterclass</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Select 
                value={formData.duration} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium">Estimated Cost</span>
              </div>
              <span className="text-lg font-bold text-green-700">
                ${getSessionPrice()}.00
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="performance_title">Performance/Topic Title</Label>
            <Input
              id="performance_title"
              value={formData.performance_title}
              onChange={(e) => setFormData(prev => ({ ...prev, performance_title: e.target.value }))}
              placeholder="e.g., Contemporary Solo for Competition"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="video_url">Performance Video URL (Optional)</Label>
            <Input
              id="video_url"
              type="url"
              value={formData.video_url}
              onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
              placeholder="https://youtube.com/watch?v=..."
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="performance_description">Description</Label>
            <Textarea
              id="performance_description"
              value={formData.performance_description}
              onChange={(e) => setFormData(prev => ({ ...prev, performance_description: e.target.value }))}
              placeholder="Brief description of what you want to work on..."
              rows={2}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              placeholder="Any additional information or specific requests..."
              rows={2}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1 bg-green-600 hover:bg-green-700">
              {isSubmitting ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HireJudgeDialog;