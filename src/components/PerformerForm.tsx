import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import Navigation from './Navigation';
import GlobalPrizeProgram from './GlobalPrizeProgram';
import FileUpload from './FileUpload';
import { databaseService } from '@/services/databaseService';

interface PerformerFormProps {
  onBack?: () => void;
}

const PerformerForm: React.FC<PerformerFormProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [globalCompetitionEnabled, setGlobalCompetitionEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    country: '',
    language: 'English',
    category: '',
    dance_genre: '',
    feedback_type: '',
    judge_type: 'standard',
    performance_title: '',
    performance_description: '',
    video_url: '',
    platinum_upgrade: false
  });

  const handleVideoUpload = (url: string) => {
    setFormData(prev => ({ ...prev, video_url: url }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const performanceData = {
        performer_name: formData.name,
        email: formData.email,
        performance_title: formData.performance_title,
        performance_description: formData.performance_description,
        video_url: formData.video_url,
        dance_genre: formData.dance_genre,
        country: formData.country,
        language: formData.language,
        feedback_type: formData.feedback_type === 'premium' ? 'PAID' as const : 'FREE' as const,
        platinum_upgrade: formData.judge_type === 'platinum',
        global_entry: globalCompetitionEnabled,
        global_scoring: globalCompetitionEnabled,
        teacher_recommendations_shown: false
      };

      const result = await databaseService.createPerformance(performanceData);
      
      if (result) {
        toast({
          title: "Performance Submitted Successfully! 🎉",
          description: globalCompetitionEnabled 
            ? "Your performance has been submitted and you're now competing globally!" 
            : "Your performance has been submitted for review!",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          age: '',
          country: '',
          language: 'English',
          category: '',
          dance_genre: '',
          feedback_type: '',
          judge_type: 'standard',
          performance_title: '',
          performance_description: '',
          video_url: '',
          platinum_upgrade: false
        });
        setGlobalCompetitionEnabled(false);
      } else {
        throw new Error('Failed to submit performance');
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your performance. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      {onBack && <Navigation onBack={onBack} title="Submit Your Performance" />}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Global Competition Toggle */}
        <GlobalPrizeProgram 
          isEnabled={globalCompetitionEnabled}
          onToggle={setGlobalCompetitionEnabled}
        />

        {/* Main Form */}
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
              🎭 Performance Details
            </CardTitle>
            <p className="text-center opacity-90 mt-2">
              Share your talent with expert judges and get professional feedback
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  👤 Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="age" className="text-sm font-medium text-gray-700">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="e.g., United States"
                      className="mt-1"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <Label htmlFor="language" className="text-sm font-medium text-gray-700">Language</Label>
                    <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Italian">Italian</SelectItem>
                        <SelectItem value="Portuguese">Portuguese</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Performance Details */}
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  🎯 Performance Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-700">Performance Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dance">Dance</SelectItem>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="theater">Theater</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="dance_genre" className="text-sm font-medium text-gray-700">Dance Genre</Label>
                    <Select value={formData.dance_genre} onValueChange={(value) => setFormData(prev => ({ ...prev, dance_genre: value }))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select dance genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ballet">Ballet</SelectItem>
                        <SelectItem value="contemporary">Contemporary</SelectItem>
                        <SelectItem value="hip-hop">Hip Hop</SelectItem>
                        <SelectItem value="jazz">Jazz</SelectItem>
                        <SelectItem value="latin">Latin</SelectItem>
                        <SelectItem value="ballroom">Ballroom</SelectItem>
                        <SelectItem value="cultural">Cultural</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">Performance Title *</Label>
                  <Input
                    id="title"
                    value={formData.performance_title}
                    onChange={(e) => setFormData(prev => ({ ...prev, performance_title: e.target.value }))}
                    placeholder="Give your performance a catchy title"
                    className="mt-1"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">Performance Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.performance_description}
                    onChange={(e) => setFormData(prev => ({ ...prev, performance_description: e.target.value }))}
                    placeholder="Describe your performance, inspiration, and what makes it special..."
                    rows={4}
                    className="mt-1"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <FileUpload
                  onFileUpload={handleVideoUpload}
                  acceptedTypes="video/*"
                  label="Performance Video *"
                  currentUrl={formData.video_url}
                />
              </div>

              {/* Judge Selection */}
              <div className="bg-yellow-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  👨‍⚖️ Judge Selection
                </h3>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Choose Judge Type *</Label>
                  <RadioGroup 
                    value={formData.judge_type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, judge_type: value }))}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                      <RadioGroupItem value="standard" id="standard" />
                      <div className="flex-1">
                        <Label htmlFor="standard" className="font-medium cursor-pointer">
                          🎯 Standard Judge
                        </Label>
                        <p className="text-sm text-gray-600">Professional judge matched to your performance category</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                      <RadioGroupItem value="platinum" id="platinum" />
                      <div className="flex-1">
                        <Label htmlFor="platinum" className="font-medium cursor-pointer">
                          👑 Platinum Judge (+$50)
                        </Label>
                        <p className="text-sm text-gray-600">Elite expert judge with 15+ years experience and premium feedback</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Feedback Options */}
              <div className="bg-green-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  💬 Feedback Options
                </h3>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Choose Feedback Type *</Label>
                  <RadioGroup 
                    value={formData.feedback_type} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, feedback_type: value }))}
                    className="mt-2 space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                      <RadioGroupItem value="free" id="free" />
                      <div className="flex-1">
                        <Label htmlFor="free" className="font-medium cursor-pointer">
                          🆓 Free Feedback
                        </Label>
                        <p className="text-sm text-gray-600">Basic written review and quality scores</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border rounded-lg bg-white">
                      <RadioGroupItem value="premium" id="premium" />
                      <div className="flex-1">
                        <Label htmlFor="premium" className="font-medium cursor-pointer">
                          ⭐ Premium Feedback ($25)
                        </Label>
                        <p className="text-sm text-gray-600">Detailed analysis + video feedback from expert judges</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting || !formData.video_url}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 text-lg shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? '🔄 Submitting...' : '🚀 Submit My Performance'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformerForm;
