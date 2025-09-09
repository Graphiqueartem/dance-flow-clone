
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Judge } from '@/types/performance';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface JudgeRegistrationProps {
  onRegister: (judge: Judge) => void;
  onCancel: () => void;
}

const AVAILABLE_LANGUAGES = [
  'English', 'Spanish', 'French', 'Portuguese', 'Italian', 'German', 
  'Russian', 'Chinese', 'Japanese', 'Korean', 'Hindi', 'Arabic'
];

const AVAILABLE_GENRES = [
  'Hip Hop', 'Contemporary', 'Jazz', 'Ballet', 'Street Dance', 'Breaking',
  'Salsa', 'Bachata', 'Latin', 'Bollywood', 'Classical', 'Fusion',
  'Modern', 'Tap', 'Ballroom', 'Folk', 'Afrobeat'
];

const JudgeRegistration: React.FC<JudgeRegistrationProps> = ({ onRegister, onCancel }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    bio: '',
    hourly_rate: 75,
    languages: [] as string[],
    dance_genres: [] as string[],
    is_platinum: false
  });

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language)
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }));
  };

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      dance_genres: prev.dance_genres.includes(genre)
        ? prev.dance_genres.filter(g => g !== genre)
        : [...prev.dance_genres, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive"
        });
        return;
      }

      if (formData.languages.length === 0) {
        toast({
          title: "Languages Required",
          description: "Please select at least one language.",
          variant: "destructive"
        });
        return;
      }

      if (formData.dance_genres.length === 0) {
        toast({
          title: "Dance Genres Required",
          description: "Please select at least one dance genre.",
          variant: "destructive"
        });
        return;
      }

      const judgeData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        country: formData.country,
        languages: formData.languages,
        dance_genres: formData.dance_genres,
        is_platinum: formData.is_platinum,
        bio: formData.bio,
        hourly_rate: formData.hourly_rate,
        available_for_hire: false,
        rating: 5.0,
        review_count: 0,
        role: 'judge' as const
      };

      const { data: newJudge, error } = await supabase
        .from('judges')
        .insert([judgeData])
        .select()
        .single();

      if (error) {
        throw error;
      }
      
      if (newJudge) {
        onRegister(newJudge);
        toast({
          title: "Registration Successful! 🎉",
          description: "Your judge profile has been created successfully.",
        });
      } else {
        throw new Error('Failed to create judge profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "There was an error creating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold text-center">
                Create Judge Profile
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onCancel}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
                  <Input
                    id="hourly_rate"
                    type="number"
                    min="0"
                    value={formData.hourly_rate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: parseInt(e.target.value) || 0 }))}
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Biography */}
              <div>
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell performers about your experience, credentials, and expertise..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>

              {/* Languages */}
              <div>
                <Label>Languages (Select all that apply)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AVAILABLE_LANGUAGES.map((language) => (
                    <Badge
                      key={language}
                      variant={formData.languages.includes(language) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => !isSubmitting && handleLanguageToggle(language)}
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Dance Genres */}
              <div>
                <Label>Dance Genres (Select your expertise areas)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {AVAILABLE_GENRES.map((genre) => (
                    <Badge
                      key={genre}
                      variant={formData.dance_genres.includes(genre) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => !isSubmitting && handleGenreToggle(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Platinum Status */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_platinum"
                  checked={formData.is_platinum}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_platinum: !!checked }))}
                  disabled={isSubmitting}
                />
                <Label htmlFor="is_platinum">Apply for Platinum Judge Status</Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Creating Profile...' : 'Create Judge Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JudgeRegistration;
