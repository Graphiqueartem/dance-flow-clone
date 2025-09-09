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
  Image as ImageIcon, 
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { AuthGuard } from '@/components/auth/AuthGuard';

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
  const { signOut, profile } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [pageContent, setPageContent] = useState<PageContent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedContent, setSelectedContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEvents();
    loadPageContent();
  }, []);

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

  const loadPageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_name', { ascending: true });

      if (error) throw error;
      setPageContent((data as PageContent[]) || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load page content',
        variant: 'destructive'
      });
    }
  };

  const handleEventSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
    }
  };

  const handleContentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const contentData = {
      page_name: formData.get('page_name') as string,
      section_name: formData.get('section_name') as string,
      content_type: formData.get('content_type') as PageContent['content_type'],
      content_value: formData.get('content_value') as string
    };

    try {
      if (selectedContent) {
        const { error } = await supabase
          .from('page_content')
          .update(contentData)
          .eq('id', selectedContent.id);
        if (error) throw error;
        toast({ title: 'Success', description: 'Content updated successfully' });
      } else {
        const { error } = await supabase
          .from('page_content')
          .insert([contentData]);
        if (error) throw error;
        toast({ title: 'Success', description: 'Content created successfully' });
      }
      
      setSelectedContent(null);
      loadPageContent();
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save content',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
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
  };

  return (
    <AuthGuard requiredRole="admin">
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
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Events
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
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
                      Manage competitions, workshops, and masterclasses with poster images and sold out status
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
                        />
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
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : (selectedEvent ? 'Update' : 'Create')}
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
                      Manage all events and their status - events marked as "sold_out" will display with overlay
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {events.map((event) => (
                        <div key={event.id} className="relative">
                          <div className="mb-2 flex gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedEvent(event)}
                              className="flex-1 justify-start"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
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
                          <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{event.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {event.event_type} • {event.status.replace('_', ' ')}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ${event.price} • {new Date(event.event_date).toLocaleDateString()}
                                </p>
                                {event.poster_image_url && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    📷 Has poster image
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Content Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {selectedContent ? 'Edit Content' : 'Create New Content'}
                    </CardTitle>
                    <CardDescription>
                      Manage page content, images, and text
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContentSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="page_name">Page Name</Label>
                          <Input
                            id="page_name"
                            name="page_name"
                            defaultValue={selectedContent?.page_name || ''}
                            placeholder="e.g., home, about"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="section_name">Section Name</Label>
                          <Input
                            id="section_name"
                            name="section_name"
                            defaultValue={selectedContent?.section_name || ''}
                            placeholder="e.g., hero_title, about_text"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content_type">Content Type</Label>
                        <Select name="content_type" defaultValue={selectedContent?.content_type || 'text'}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="text">Text</SelectItem>
                            <SelectItem value="image">Image URL</SelectItem>
                            <SelectItem value="html">HTML</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="content_value">Content Value</Label>
                        <Textarea
                          id="content_value"
                          name="content_value"
                          defaultValue={selectedContent?.content_value || ''}
                          rows={4}
                          required
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button type="submit" disabled={loading}>
                          {loading ? 'Saving...' : (selectedContent ? 'Update' : 'Create')}
                        </Button>
                        {selectedContent && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setSelectedContent(null)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Content List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Existing Content</CardTitle>
                    <CardDescription>
                      All page content and sections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {pageContent.map((content) => (
                        <div
                          key={content.id}
                          className="border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{content.page_name} / {content.section_name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Type: {content.content_type}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {content.content_value}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedContent(content)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Manage judges, performers, and administrators
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">User management features coming soon...</p>
                </CardContent>
              </Card>
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
    </AuthGuard>
  );
};

export default AdminDashboard;