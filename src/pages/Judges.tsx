import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Judge } from '@/types/performance';
import { Star, MapPin, Languages, Crown, Search, Filter, UserPlus } from 'lucide-react';
import JudgeProfile from '@/components/JudgeProfile';
import { Link } from 'react-router-dom';

const Judges: React.FC = () => {
  const { toast } = useToast();
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJudge, setSelectedJudge] = useState<Judge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [filterCountry, setFilterCountry] = useState('all');

  useEffect(() => {
    loadJudges();
  }, []);

  const loadJudges = async () => {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setJudges((data as Judge[]) || []);
    } catch (error) {
      console.error('Error loading judges:', error);
      toast({
        title: 'Error',
        description: 'Failed to load judges',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredJudges = judges.filter(judge => {
    const matchesSearch = judge.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         judge.bio?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = filterGenre === 'all' || judge.dance_genres?.includes(filterGenre);
    const matchesCountry = filterCountry === 'all' || judge.country === filterCountry;
    
    return matchesSearch && matchesGenre && matchesCountry;
  });

  const availableGenres = [...new Set(judges.flatMap(judge => judge.dance_genres || []))];
  const availableCountries = [...new Set(judges.map(judge => judge.country).filter(Boolean))];

  if (selectedJudge) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => setSelectedJudge(null)}
          className="mb-6"
        >
          ← Back to Judges
        </Button>
        <JudgeProfile judge={selectedJudge} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Meet Our Expert Judges</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Learn from world-class dance professionals. Book private coaching sessions, 
          performance reviews, or masterclasses with our certified judges.
        </p>
      </div>

      {/* CTA for becoming a judge */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-purple-900 mb-2">
              Are you a dance professional?
            </h3>
            <p className="text-purple-700">
              Join our expert panel of judges and share your expertise with dancers worldwide.
            </p>
          </div>
          <Button asChild className="bg-purple-600 hover:bg-purple-700">
            <Link to="/auth?mode=judge">
              <UserPlus className="h-4 w-4 mr-2" />
              Become a Judge
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search judges by name or expertise..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={filterGenre} onValueChange={setFilterGenre}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {availableGenres.map(genre => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCountry} onValueChange={setFilterCountry}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {availableCountries.map(country => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2 text-muted-foreground">Loading judges...</span>
        </div>
      )}

      {/* Judges Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJudges.map((judge) => (
            <Card key={judge.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedJudge(judge)}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={judge.profile_image} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(judge.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{judge.name}</CardTitle>
                      {judge.is_platinum && (
                        <Crown className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-current text-yellow-400" />
                      <span>{judge.rating || 5.0}</span>
                      <span>({judge.review_count || 0} reviews)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {judge.country && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{judge.country}</span>
                  </div>
                )}

                {judge.available_for_hire && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                    <span className="text-green-700 font-medium text-sm">
                      Available for hire - ${judge.hourly_rate || 75}/hour
                    </span>
                  </div>
                )}

                {judge.languages && judge.languages.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Languages className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Languages</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {judge.languages.slice(0, 3).map((language, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                      {judge.languages.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{judge.languages.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {judge.dance_genres && judge.dance_genres.length > 0 && (
                  <div>
                    <span className="text-sm font-medium mb-2 block">Specialties</span>
                    <div className="flex flex-wrap gap-1">
                      {judge.dance_genres.slice(0, 3).map((genre, index) => (
                        <Badge key={index} className="text-xs bg-purple-100 text-purple-800">
                          {genre}
                        </Badge>
                      ))}
                      {judge.dance_genres.length > 3 && (
                        <Badge className="text-xs bg-purple-100 text-purple-800">
                          +{judge.dance_genres.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {judge.bio && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {judge.bio}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredJudges.length === 0 && (
        <div className="text-center py-12">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No judges found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Judges;