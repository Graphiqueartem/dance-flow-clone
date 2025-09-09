
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Star, MapPin, Languages, Crown, Edit2, Save, X, Mail, DollarSign } from 'lucide-react';
import { Judge } from '@/types/performance';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import HireJudgeDialog from './HireJudgeDialog';

interface JudgeProfileProps {
  judge: Judge;
  isOwnProfile?: boolean;
  onHire?: () => void;
}

const JudgeProfile: React.FC<JudgeProfileProps> = ({ 
  judge, 
  isOwnProfile = false, 
  onHire 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedJudge, setEditedJudge] = useState<Judge>(judge);
  const [isAvailableForHire, setIsAvailableForHire] = useState(judge.available_for_hire || false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = () => {
    // Clear judge session and redirect to home
    navigate('/');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('judges')
        .update({
          country: editedJudge.country,
          hourly_rate: editedJudge.hourly_rate,
          bio: editedJudge.bio,
          available_for_hire: isAvailableForHire
        })
        .eq('id', editedJudge.id);

      if (error) throw error;
      
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedJudge(judge);
    setIsAvailableForHire(judge.available_for_hire || false);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="border-0 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-4 border-white">
                <AvatarImage src={editedJudge.profile_image} />
                <AvatarFallback className="bg-white text-purple-600 text-lg font-bold">
                  {getInitials(editedJudge.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{editedJudge.name}</CardTitle>
                <p className="text-purple-100">{editedJudge.email}</p>
                {editedJudge.is_platinum && (
                  <Badge className="bg-yellow-500 text-yellow-900 mt-2">
                    <Crown className="h-3 w-3 mr-1" />
                    Platinum Judge
                  </Badge>
                )}
              </div>
            </div>
            {isOwnProfile && (
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit} disabled={isSaving}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button variant="secondary" size="sm" onClick={handleSaveProfile} disabled={isSaving}>
                      <Save className="h-4 w-4 mr-1" />
                      {isSaving ? 'Saving...' : 'Save'}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="secondary" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4 mr-1" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      <X className="h-4 w-4 mr-1" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {isOwnProfile && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-blue-900">Available for Hire</h3>
                  <p className="text-sm text-blue-700">
                    Allow performers to hire you for private coaching sessions
                  </p>
                </div>
                <Switch
                  checked={isAvailableForHire}
                  onCheckedChange={setIsAvailableForHire}
                  disabled={!isEditing}
                />
              </div>
            </div>
          )}

          {!isOwnProfile && editedJudge.available_for_hire && (
            <div className="text-center bg-green-50 border border-green-200 rounded-lg p-4">
              <HireJudgeDialog judge={editedJudge}>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 mb-2">
                  Hire {editedJudge.name.split(' ')[0]}
                </Button>
              </HireJudgeDialog>
              <div className="flex items-center justify-center text-sm text-muted-foreground">
                <DollarSign className="h-4 w-4 mr-1" />
                Starting from ${editedJudge.hourly_rate || '75'}/hour
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="country">Country</Label>
              {isEditing ? (
                <Input
                  id="country"
                  value={editedJudge.country || ''}
                  onChange={(e) => setEditedJudge(prev => ({ ...prev, country: e.target.value }))}
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{editedJudge.country || 'Not specified'}</span>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              {isEditing ? (
                <Input
                  id="hourlyRate"
                  type="number"
                  value={editedJudge.hourly_rate || ''}
                  onChange={(e) => setEditedJudge(prev => ({ ...prev, hourly_rate: parseInt(e.target.value) || 0 }))}
                />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold">${editedJudge.hourly_rate || 75}/hour</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Languages className="h-4 w-4 text-gray-500" />
              <Label>Languages</Label>
            </div>
            <div className="flex flex-wrap gap-2">
              {editedJudge.languages?.map((language, index) => (
                <Badge key={index} variant="outline">
                  {language}
                </Badge>
              )) || <span className="text-gray-500">No languages specified</span>}
            </div>
          </div>

          <div>
            <Label>Dance Genres</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {editedJudge.dance_genres?.map((genre, index) => (
                <Badge key={index} className="bg-purple-100 text-purple-800">
                  {genre}
                </Badge>
              )) || <span className="text-gray-500">No dance genres specified</span>}
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Biography</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                value={editedJudge.bio || ''}
                onChange={(e) => setEditedJudge(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell performers about your experience and expertise..."
                className="mt-1"
                rows={4}
              />
            ) : (
              <p className="mt-1 text-gray-700">
                {editedJudge.bio || 'No biography provided.'}
              </p>
            )}
          </div>

          <div>
            <Label>Rating</Label>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= (editedJudge.rating || 5) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {editedJudge.rating || 5.0} ({editedJudge.review_count || 0} reviews)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudgeProfile;
