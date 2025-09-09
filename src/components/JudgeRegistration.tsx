
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

      // First, create the user account with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: 'judge'
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (authError) {
        throw authError;
      }

      if (!authData.user) {
        throw new Error('Failed to create user account');
      }

      // Create the judge profile
      const judgeData = {
        user_id: authData.user.id,
        name: formData.name,
        email: formData.email,
        country: formData.country,
        languages: formData.languages,
        dance_genres: formData.dance_genres,
        is_platinum: formData.is_platinum,
        bio: formData.bio,
        hourly_rate: formData.hourly_rate,
        available_for_hire: true,
        rating: 5.0,
        review_count: 0,
        role: 'judge' as const,
        is_active: true
      };

      const { data: newJudge, error: judgeError } = await supabase
        .from('judges')
        .insert([judgeData])
        .select()
        .single();

      if (judgeError) {
        throw judgeError;
      }
      
      if (newJudge) {
        onRegister(newJudge);
        toast({
          title: "Registration Successful! 🎉",
          description: "Your judge profile has been created. Please check your email to confirm your account.",
        });
      } else {
        throw new Error('Failed to create judge profile');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: error.message || "There was an error creating your profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-t-lg">
            <div className="flex justify-between items-center">
              <div className="text-center flex-1">
                <CardTitle className="text-3xl font-bold mb-2">
                  Create Judge Profile
                </CardTitle>
                <p className="text-primary-foreground/90">
                  Join our community of professional dance judges
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={onCancel} className="text-white hover:bg-white/20">
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="Create a secure password"
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password *
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="Confirm your password"
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                      Country *
                    </Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="Enter your country"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate" className="text-sm font-medium text-gray-700">
                      Hourly Rate (USD) *
                    </Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      min="0"
                      value={formData.hourly_rate}
                      onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: parseInt(e.target.value) || 0 }))}
                      required
                      disabled={isSubmitting}
                      className="h-12 border-2 border-gray-200 focus:border-primary"
                      placeholder="75"
                    />
                  </div>
                </div>
              </div>

              {/* Professional Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Professional Information
                </h3>
                
                {/* Biography */}
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                    Biography
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell performers about your experience, credentials, and expertise..."
                    rows={4}
                    disabled={isSubmitting}
                    className="border-2 border-gray-200 focus:border-primary resize-none"
                  />
                </div>

                {/* Languages */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Languages * (Select all that apply)
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {AVAILABLE_LANGUAGES.map((language) => (
                      <Badge
                        key={language}
                        variant={formData.languages.includes(language) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
                          formData.languages.includes(language)
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "border-2 border-gray-300 hover:border-primary hover:bg-primary/5"
                        }`}
                        onClick={() => !isSubmitting && handleLanguageToggle(language)}
                      >
                        {language}
                      </Badge>
                    ))}
                  </div>
                  {formData.languages.length > 0 && (
                    <p className="text-sm text-green-600">
                      Selected: {formData.languages.join(', ')}
                    </p>
                  )}
                </div>

                {/* Dance Genres */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-gray-700">
                    Dance Genres * (Select your expertise areas)
                  </Label>
                  <div className="flex flex-wrap gap-3">
                    {AVAILABLE_GENRES.map((genre) => (
                      <Badge
                        key={genre}
                        variant={formData.dance_genres.includes(genre) ? "default" : "outline"}
                        className={`cursor-pointer px-4 py-2 text-sm transition-all duration-200 ${
                          formData.dance_genres.includes(genre)
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "border-2 border-gray-300 hover:border-primary hover:bg-primary/5"
                        }`}
                        onClick={() => !isSubmitting && handleGenreToggle(genre)}
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                  {formData.dance_genres.length > 0 && (
                    <p className="text-sm text-green-600">
                      Selected: {formData.dance_genres.join(', ')}
                    </p>
                  )}
                </div>

                {/* Platinum Status */}
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                  <Checkbox
                    id="is_platinum"
                    checked={formData.is_platinum}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_platinum: !!checked }))}
                    disabled={isSubmitting}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="is_platinum" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Apply for Platinum Judge Status
                    </Label>
                    <p className="text-xs text-gray-600 mt-1">
                      Platinum judges receive priority assignments and higher rates
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Creating Your Profile...
                    </div>
                  ) : (
                    'Create Judge Profile'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JudgeRegistration;
