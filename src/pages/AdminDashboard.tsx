import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, 
  Users, 
  Calendar, 
  FileText, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  Image
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ImageManager from '@/components/admin/ImageManager';
import ContentManager from '@/components/admin/ContentManager';
import SoldOutPosterManager from '@/components/admin/SoldOutPosterManager';

interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  price: number;
  poster_image_url: string;
  status: 'upcoming' | 'current' | 'sold_out';
  event_type: 'competition' | 'workshop' | 'masterclass';
}

interface PageContent {
  id: string;
  page_name: string;
  section_name: string;
  content_type: 'text' | 'image' | 'html';
  content_value: string;
}

const AdminDashboard: React.FC = () => {
  const { signOut, profile, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [judges, setJudges] = useState<any[]>([]);
  const [performers, setPerformers] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);

  // Redirect to login if not admin
  useEffect(() => {
    if (!loading && (!profile || profile.role !== 'admin')) {
      console.log('Redirecting to admin login - profile:', profile, 'loading:', loading);
      navigate('/admin-login', { replace: true });
    }
  }, [profile, loading, navigate]);

  useEffect(() => {
    if (profile?.role === 'admin') {
      loadEvents();
      loadJudges();
      loadPerformers();
      loadSubmissions();
    }
  }, [profile]);

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents((data as Event[]) || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load events',
        variant: 'destructive'
      });
    }
  };

  const loadJudges = async () => {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJudges(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load judges',
        variant: 'destructive'
      });
    }
  };

  const loadPerformers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'performer')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPerformers(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load performers',
        variant: 'destructive'
      });
    }
  };

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('performances')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load submissions',
        variant: 'destructive'
      });
    }
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDashboardLoading(true);

    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      event_date: formData.get('event_date') as string,
      location: formData.get('location') as string,
      price: parseFloat(formData.get('price') as string),
      poster_image_url: formData.get('poster_image_url') as string,
      status: formData.get('status') as Event['status'],
      event_type: formData.get('event_type') as Event['event_type']
    };

    try {
      if (selectedEvent) {
        const { error } = await supabase
          .from('events')
          .update(eventData)
          .eq('id', selectedEvent.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Event updated successfully' });
      } else {
        const { error } = await supabase
          .from('events')
          .insert([eventData]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Event created successfully' });
      }
      
      setSelectedEvent(null);
      loadEvents();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save event',
        variant: 'destructive'
      });
    } finally {
      setDashboardLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      toast({ title: 'Success', description: 'Event deleted successfully' });
      loadEvents();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        variant: 'destructive'
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  // Loading state
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

  // If no profile or not admin, will redirect via useEffect
  if (!profile || profile.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-primary-foreground/80">Welcome back, {profile?.name}</p>
            </div>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="events" className="space-y-6">
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="judges" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Judges
            </TabsTrigger>
            <TabsTrigger value="performers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Performers
            </TabsTrigger>
            <TabsTrigger value="submissions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Submissions
            </TabsTrigger>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Images
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="posters" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Posters
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Event Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    {selectedEvent ? 'Edit Event' : 'Create New Event'}
                  </CardTitle>
                  <CardDescription>
                    Manage events - sold out events will automatically use the special sold out poster
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleEventSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        name="title"
                        defaultValue={selectedEvent?.title || ''}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        defaultValue={selectedEvent?.description || ''}
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event_date">Event Date</Label>
                        <Input
                          id="event_date"
                          name="event_date"
                          type="datetime-local"
                          defaultValue={selectedEvent?.event_date?.slice(0, 16) || ''}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          step="0.01"
                          defaultValue={selectedEvent?.price || ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        defaultValue={selectedEvent?.location || ''}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="poster_image_url">Poster Image URL</Label>
                      <Input
                        id="poster_image_url"
                        name="poster_image_url"
                        type="url"
                        defaultValue={selectedEvent?.poster_image_url || ''}
                        placeholder="Leave empty for default posters"
                      />
                      <p className="text-xs text-muted-foreground">
                        💡 Sold out events automatically get the special "SOLD OUT" poster
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="event_type">Event Type</Label>
                        <Select name="event_type" defaultValue={selectedEvent?.event_type || 'competition'}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="competition">Competition</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="masterclass">Masterclass</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select name="status" defaultValue={selectedEvent?.status || 'upcoming'}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="current">Current</SelectItem>
                            <SelectItem value="sold_out">Sold Out</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" disabled={dashboardLoading}>
                        {dashboardLoading ? 'Saving...' : (selectedEvent ? 'Update' : 'Create')}
                      </Button>
                      {selectedEvent && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setSelectedEvent(null)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Events List */}
              <Card>
                <CardHeader>
                  <CardTitle>Existing Events</CardTitle>
                  <CardDescription>
                    Manage all events - sold out events show special poster automatically
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {events.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {event.event_type} • {event.status.replace('_', ' ')}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${event.price} • {new Date(event.event_date).toLocaleDateString()}
                            </p>
                            {event.status === 'sold_out' && (
                              <p className="text-xs text-red-600 font-medium mt-1">
                                🎟️ Using SOLD OUT poster
                              </p>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedEvent(event)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => deleteEvent(event.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Judges Tab */}
          <TabsContent value="judges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Judge Management</CardTitle>
                <CardDescription>
                  Manage all judge profiles and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {judges.map((judge) => (
                    <div key={judge.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{judge.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {judge.email} • {judge.country}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            ${judge.hourly_rate}/hr • Rating: {judge.rating}/5 ({judge.review_count} reviews)
                          </p>
                          <div className="flex gap-1 mt-1">
                            {judge.is_platinum && (
                              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                                Platinum
                              </span>
                            )}
                            {judge.available_for_hire && (
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Available
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performers Tab */}
          <TabsContent value="performers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performer Management</CardTitle>
                <CardDescription>
                  Manage all performer profiles and accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {performers.map((performer) => (
                    <div key={performer.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{performer.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {performer.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Joined: {new Date(performer.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Submissions</CardTitle>
                <CardDescription>
                  Manage all performance submissions and feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {submissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{submission.performance_title}</h4>
                          <p className="text-sm text-muted-foreground">
                            By: {submission.performer_name} • {submission.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {submission.dance_genre} • {submission.status} • {submission.feedback_type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Submitted: {new Date(submission.submitted_at).toLocaleDateString()}
                          </p>
                          {submission.assigned_judge_name && (
                            <p className="text-sm text-blue-600">
                              Judge: {submission.assigned_judge_name}
                            </p>
                          )}
                          {/* Status indicators */}
                          <div className="flex gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              submission.status === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                              submission.status === 'pending' ? 'bg-blue-100 text-blue-800' :
                              submission.status === 'completed' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {submission.status.replace('_', ' ').toUpperCase()}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded ${
                              submission.feedback_type === 'PAID' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {submission.feedback_type}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" title="View Video">
                            <Eye className="h-4 w-4" onClick={() => window.open(submission.video_url, '_blank')} />
                          </Button>
                          <Button size="sm" variant="ghost" title="Edit Submission">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images Tab */}
          <TabsContent value="images" className="space-y-6">
            <ImageManager />
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <ContentManager />
          </TabsContent>

          {/* Posters Tab */}
          <TabsContent value="posters" className="space-y-6">
            <SoldOutPosterManager />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>
                  Configure platform-wide settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;