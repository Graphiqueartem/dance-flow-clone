import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Trash2, Edit, Save, X } from 'lucide-react';

interface PageContent {
  id: string;
  page_name: string;
  section_name: string;
  content_type: string;
  content_value: string;
}

const pages = [
  'home', 'about', 'competitions', 'workshops', 'community', 'contact', 
  'events', 'gallery', 'news', 'online-classes', 'judges'
];

const sections = [
  'hero', 'about', 'features', 'testimonials', 'cta', 'gallery',
  'values', 'team', 'contact-info', 'pricing', 'services'
];

const contentTypes = [
  'text', 'image', 'html'
];

const ContentManager = () => {
  const [content, setContent] = useState<PageContent[]>([]);
  const [selectedPage, setSelectedPage] = useState<string>('all');
  const [editingContent, setEditingContent] = useState<Partial<PageContent>>({
    page_name: '',
    section_name: '',
    content_type: 'text',
    content_value: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('manage');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('*')
        .order('page_name', { ascending: true })
        .order('section_name', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error loading content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = selectedPage === 'all' 
    ? content 
    : content.filter(item => item.page_name === selectedPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingContent.page_name || !editingContent.section_name || !editingContent.content_value) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        // Update existing content
        console.log('Updating content with ID:', editingId, editingContent);
        const { data, error } = await supabase
          .from('page_content')
          .update({
            page_name: editingContent.page_name,
            section_name: editingContent.section_name,
            content_type: editingContent.content_type,
            content_value: editingContent.content_value,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)
          .select();

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        console.log('Update successful:', data);
        toast.success('Content updated successfully');
        setEditingId(null);
      } else {
        // Create new content
        console.log('Creating new content:', editingContent);
        const { data, error } = await supabase
          .from('page_content')
          .insert([{
            page_name: editingContent.page_name!,
            section_name: editingContent.section_name!,
            content_type: editingContent.content_type!,
            content_value: editingContent.content_value!
          }])
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Insert successful:', data);
        toast.success('Content created successfully');
      }

      setEditingContent({
        page_name: '',
        section_name: '',
        content_type: 'text',
        content_value: ''
      });
      setActiveTab('manage'); // Switch back to manage tab
      loadContent();
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error(`Failed to save content: ${error.message || 'Unknown error'}`);
    }
  };

  const handleEdit = (item: PageContent) => {
    setEditingContent(item);
    setEditingId(item.id);
    setActiveTab('add'); // Switch to edit tab
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return;

    try {
      console.log('Deleting content with ID:', id);
      const { data, error } = await supabase
        .from('page_content')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      console.log('Delete successful:', data);
      toast.success('Content deleted successfully');
      loadContent();
    } catch (error) {
      console.error('Error deleting content:', error);
      toast.error(`Failed to delete content: ${error.message || 'Unknown error'}`);
    }
  };

  const handleCancel = () => {
    setEditingContent({
      page_name: '',
      section_name: '',
      content_type: 'text',
      content_value: ''
    });
    setEditingId(null);
    setActiveTab('manage'); // Switch back to manage tab
  };

  if (loading) {
    return <div className="p-8 text-center">Loading content...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Select value={selectedPage} onValueChange={setSelectedPage}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Pages</SelectItem>
            {pages.map(page => (
              <SelectItem key={page} value={page}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="manage">Manage Content</TabsTrigger>
          <TabsTrigger value="add">Add New Content</TabsTrigger>
        </TabsList>

        <TabsContent value="add" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{editingId ? 'Edit Content' : 'Add New Content'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="page_name">Page Name *</Label>
                    <Select 
                      value={editingContent.page_name} 
                      onValueChange={(value) => setEditingContent(prev => ({...prev, page_name: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select page" />
                      </SelectTrigger>
                      <SelectContent>
                        {pages.map(page => (
                          <SelectItem key={page} value={page}>
                            {page.charAt(0).toUpperCase() + page.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="section_name">Section Name *</Label>
                    <Select 
                      value={editingContent.section_name} 
                      onValueChange={(value) => setEditingContent(prev => ({...prev, section_name: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sections.map(section => (
                          <SelectItem key={section} value={section}>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="content_type">Content Type *</Label>
                    <Select 
                      value={editingContent.content_type} 
                      onValueChange={(value) => setEditingContent(prev => ({...prev, content_type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentTypes.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="content_value">Content *</Label>
                  <Textarea
                    id="content_value"
                    placeholder="Enter your content here..."
                    value={editingContent.content_value}
                    onChange={(e) => setEditingContent(prev => ({...prev, content_value: e.target.value}))}
                    rows={4}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    {editingId ? 'Update Content' : 'Create Content'}
                  </Button>
                  {editingId && (
                    <Button type="button" variant="outline" onClick={handleCancel} className="flex items-center gap-2">
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manage" className="space-y-4">
          <div className="grid gap-4">
            {filteredContent.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2">
                        <Badge variant="secondary">{item.page_name}</Badge>
                        <Badge variant="outline">{item.section_name}</Badge>
                        <Badge variant="outline">{item.content_type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {item.content_value}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1"
                      >
                        <Edit className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                        className="flex items-center gap-1"
                      >
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredContent.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">
                    {selectedPage === 'all' 
                      ? 'No content found. Add some content to get started.' 
                      : `No content found for ${selectedPage} page.`
                    }
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManager;