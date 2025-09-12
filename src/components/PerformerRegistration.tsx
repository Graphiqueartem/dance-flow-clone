import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AuthForm } from '@/components/auth/AuthForm';
import { toast } from '@/hooks/use-toast';
import { User, Trophy, Upload, Calendar, Globe, Star } from 'lucide-react';

interface RegistrationFormData {
  performerName: string;
  email: string;
  phone: string;
  country: string;
  danceGenre: string;
  experience: string;
  previousCompetitions: string;
  motivation: string;
  registrationType: 'competition' | 'workshop' | 'masterclass' | 'notification';
}

const PerformerRegistration = () => {
  const { user, profile, loading } = useAuth();
  const [formData, setFormData] = useState<RegistrationFormData>({
    performerName: profile?.name || '',
    email: profile?.email || '',
    phone: '',
    country: '',
    danceGenre: '',
    experience: '',
    previousCompetitions: '',
    motivation: '',
    registrationType: 'competition'
  });
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Registration form is accessible to everyone, authentication only required for performance submissions

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Here you would typically submit to your backend
      // For now, we'll just show a success message
      
      const registrationData = {
        ...formData,
        userId: user?.id || null,
        submittedAt: new Date().toISOString()
      };

      console.log('Registration submitted:', registrationData);
      
      toast({
        title: "Registration Successful!",
        description: "Thank you for registering. We'll be in touch soon with more details.",
      });

      // Reset form for new registrations
      setFormData({
        ...formData,
        phone: '',
        country: '',
        danceGenre: '',
        experience: '',
        previousCompetitions: '',
        motivation: '',
      });

    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof RegistrationFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getRegistrationTypeInfo = () => {
    switch (formData.registrationType) {
      case 'competition':
        return {
          icon: <Trophy className="h-6 w-6" />,
          title: 'Competition Registration',
          description: 'Register for upcoming dance competitions and showcase your talent',
          color: 'bg-primary/10 text-primary'
        };
      case 'workshop':
        return {
          icon: <Star className="h-6 w-6" />,
          title: 'Workshop Registration',
          description: 'Join exclusive workshops with world-renowned choreographers',
          color: 'bg-accent/10 text-accent'
        };
      case 'masterclass':
        return {
          icon: <Upload className="h-6 w-6" />,
          title: 'Masterclass Registration',
          description: 'Learn advanced techniques from industry professionals',
          color: 'bg-secondary/10 text-secondary'
        };
      case 'notification':
        return {
          icon: <Calendar className="h-6 w-6" />,
          title: 'Event Notifications',
          description: 'Get notified about upcoming events and registration openings',
          color: 'bg-neon-pink/10 text-neon-pink'
        };
      default:
        return {
          icon: <Trophy className="h-6 w-6" />,
          title: 'Registration',
          description: 'Join the Love Dance Live community',
          color: 'bg-primary/10 text-primary'
        };
    }
  };

  const typeInfo = getRegistrationTypeInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className={`rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 ${typeInfo.color}`}>
            {typeInfo.icon}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {typeInfo.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {typeInfo.description}
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            {profile && (
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="outline" className="px-3 py-1">
                  <User className="h-4 w-4 mr-1" />
                  Signed in as {profile.name}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Registration Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="registrationType">Registration Type</Label>
                <Select 
                  value={formData.registrationType} 
                  onValueChange={(value) => handleInputChange('registrationType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select registration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="competition">Competition Entry</SelectItem>
                    <SelectItem value="workshop">Workshop Registration</SelectItem>
                    <SelectItem value="masterclass">Masterclass Booking</SelectItem>
                    <SelectItem value="notification">Event Notifications</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="performerName">Full Name</Label>
                  <Input
                    id="performerName"
                    value={formData.performerName}
                    onChange={(e) => handleInputChange('performerName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={!!profile}
                    placeholder={!profile ? "Enter your email address" : ""}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select 
                    value={formData.country} 
                    onValueChange={(value) => handleInputChange('country', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="de">Germany</SelectItem>
                      <SelectItem value="fr">France</SelectItem>
                      <SelectItem value="es">Spain</SelectItem>
                      <SelectItem value="it">Italy</SelectItem>
                      <SelectItem value="jp">Japan</SelectItem>
                      <SelectItem value="kr">South Korea</SelectItem>
                      <SelectItem value="br">Brazil</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="danceGenre">Primary Dance Style</Label>
                <Select 
                  value={formData.danceGenre} 
                  onValueChange={(value) => handleInputChange('danceGenre', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your primary dance style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hip-hop">Hip-Hop</SelectItem>
                    <SelectItem value="contemporary">Contemporary</SelectItem>
                    <SelectItem value="ballet">Ballet</SelectItem>
                    <SelectItem value="jazz">Jazz</SelectItem>
                    <SelectItem value="latin">Latin</SelectItem>
                    <SelectItem value="ballroom">Ballroom</SelectItem>
                    <SelectItem value="street">Street Dance</SelectItem>
                    <SelectItem value="kpop">K-Pop</SelectItem>
                    <SelectItem value="musical-theatre">Musical Theatre</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Dance Experience Level</Label>
                <Select 
                  value={formData.experience} 
                  onValueChange={(value) => handleInputChange('experience', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="advanced">Advanced (5-10 years)</SelectItem>
                    <SelectItem value="professional">Professional (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="previousCompetitions">Previous Competitions (Optional)</Label>
                <Textarea
                  id="previousCompetitions"
                  value={formData.previousCompetitions}
                  onChange={(e) => handleInputChange('previousCompetitions', e.target.value)}
                  placeholder="List any previous competitions or performances you've participated in..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Why do you want to participate? (Optional)</Label>
                <Textarea
                  id="motivation"
                  value={formData.motivation}
                  onChange={(e) => handleInputChange('motivation', e.target.value)}
                  placeholder="Tell us about your passion for dance and what motivates you..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 text-lg"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting Registration...
                  </>
                ) : (
                  <>
                    <Trophy className="h-5 w-5 mr-2" />
                    Complete Registration
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-8 space-y-4">
          {!profile && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">
                Already have an account?{' '}
                <Link to="/auth?mode=performer" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
              <p className="text-xs text-muted-foreground">
                Note: You'll need to sign in to submit performance videos
              </p>
            </div>
          )}
          <div className="text-sm text-muted-foreground">
            <p>
              Questions? Contact us at{' '}
              <a href="mailto:support@lovedancelive.com" className="text-primary hover:underline">
                support@lovedancelive.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformerRegistration;