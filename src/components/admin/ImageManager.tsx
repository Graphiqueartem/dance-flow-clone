import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Upload, Edit2, Trash2, Eye } from 'lucide-react';

interface PageImage {
  id: string;
  page_name: string;
  section_name: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

const pages = [
  'home', 'about', 'competitions', 'workshops', 'events', 'gallery', 
  'community', 'contact', 'judges', 'news', 'online-classes'
];

const sections = [
  'hero', 'features', 'gallery', 'testimonials', 'promo', 'sidebar', 
  'content', 'footer', 'navigation', 'banner'
];

export default function ImageManager() {
  const [images, setImages] = useState<PageImage[]>([]);
  const [selectedPage, setSelectedPage] = useState('all');
  const [newImage, setNewImage] = useState({
    page_name: '',
    section_name: '',
    image_url: '',
    alt_text: '',
    display_order: 1
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('page_images')
        .select('*')
        .order('page_name', { ascending: true })
        .order('display_order', { ascending: true });

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load images');
    }
  };

  const filteredImages = selectedPage === 'all'
    ? images
    : images.filter(img => img.page_name === selectedPage);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        console.log('Updating image with ID:', editingId, newImage);
        const { data, error } = await supabase
          .from('page_images')
          .update(newImage)
          .eq('id', editingId)
          .select();

        if (error) {
          console.error('Update error:', error);
          throw error;
        }
        console.log('Update successful:', data);
        toast.success('Image updated successfully');
      } else {
        console.log('Creating new image:', newImage);
        const { data, error } = await supabase
          .from('page_images')
          .insert([{ ...newImage, is_active: true }])
          .select();

        if (error) {
          console.error('Insert error:', error);
          throw error;
        }
        console.log('Insert successful:', data);
        toast.success('Image added successfully');
      }

      setNewImage({
        page_name: '',
        section_name: '',
        image_url: '',
        alt_text: '',
        display_order: 1
      });
      setEditingId(null);
      loadImages();
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error(`Failed to save image: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (image: PageImage) => {
    setNewImage({
      page_name: image.page_name,
      section_name: image.section_name,
      image_url: image.image_url,
      alt_text: image.alt_text,
      display_order: image.display_order
    });
    setEditingId(image.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      console.log('Deleting image with ID:', id);
      const { data, error } = await supabase
        .from('page_images')
        .delete()
        .eq('id', id)
        .select();

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      console.log('Delete successful:', data);
      toast.success('Image deleted successfully');
      loadImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error(`Failed to delete image: ${error.message || 'Unknown error'}`);
    }
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    try {
      console.log('Toggling image status with ID:', id, 'from', isActive, 'to', !isActive);
      const { data, error } = await supabase
        .from('page_images')
        .update({ is_active: !isActive })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Toggle error:', error);
        throw error;
      }
      console.log('Toggle successful:', data);
      toast.success(`Image ${!isActive ? 'activated' : 'deactivated'}`);
      loadImages();
    } catch (error) {
      console.error('Error updating image status:', error);
      toast.error(`Failed to update image status: ${error.message || 'Unknown error'}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/routes/upload.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      setNewImage(prev => ({ ...prev, image_url: result.url }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Image Management</h2>
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

      {/* Add/Edit Image Form */}
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Image' : 'Add New Image'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="page_name">Page</Label>
                <Select value={newImage.page_name} onValueChange={(value) => setNewImage(prev => ({ ...prev, page_name: value }))}>
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
                <Label htmlFor="section_name">Section</Label>
                <Select value={newImage.section_name} onValueChange={(value) => setNewImage(prev => ({ ...prev, section_name: value }))}>
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
            </div>

            <div>
              <Label htmlFor="image_upload">Upload Image</Label>
              <Input 
                type="file" 
                accept="image/*" 
                onChange={handleFileUpload}
                className="mb-2"
              />
              <Label htmlFor="image_url">Or enter image URL</Label>
              <Input
                id="image_url"
                value={newImage.image_url}
                onChange={(e) => setNewImage(prev => ({ ...prev, image_url: e.target.value }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <Label htmlFor="alt_text">Alt Text</Label>
              <Textarea
                id="alt_text"
                value={newImage.alt_text}
                onChange={(e) => setNewImage(prev => ({ ...prev, alt_text: e.target.value }))}
                placeholder="Descriptive text for the image"
              />
            </div>

            <div>
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                min="1"
                value={newImage.display_order}
                onChange={(e) => setNewImage(prev => ({ ...prev, display_order: parseInt(e.target.value) }))}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                <Upload className="w-4 h-4 mr-2" />
                {editingId ? 'Update Image' : 'Add Image'}
              </Button>
              {editingId && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setEditingId(null);
                    setNewImage({
                      page_name: '',
                      section_name: '',
                      image_url: '',
                      alt_text: '',
                      display_order: 1
                    });
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Images List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredImages.map((image) => (
          <Card key={image.id} className={`${!image.is_active ? 'opacity-50' : ''}`}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {image.image_url && (
                    <img 
                      src={image.image_url} 
                      alt={image.alt_text}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                
                <div className="space-y-1">
                  <p className="font-medium text-sm">
                    {image.page_name} - {image.section_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Order: {image.display_order}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {image.alt_text}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    variant={image.is_active ? "default" : "secondary"}
                    onClick={() => toggleActive(image.id, image.is_active)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}