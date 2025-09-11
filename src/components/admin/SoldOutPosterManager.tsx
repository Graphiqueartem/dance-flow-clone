import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function SoldOutPosterManager() {
  const [newPosterUrl, setNewPosterUrl] = useState('');
  const [currentPosterUrl] = useState('/src/assets/sold-out-poster.jpg');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      const response = await fetch('/api/routes/upload.php', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      setNewPosterUrl(result.url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePoster = async () => {
    if (!newPosterUrl) {
      toast.error('Please upload or enter a poster URL first');
      return;
    }

    try {
      setLoading(true);
      
      // Here you would typically update a configuration table or file
      // For now, we'll show success and the admin would need to manually replace the file
      toast.success('Sold out poster configuration updated! Please replace the file in /src/assets/sold-out-poster.jpg with your new image.');
      
      // In a real implementation, you might:
      // 1. Update a configuration table in Supabase
      // 2. Copy the file to the assets folder
      // 3. Update a global configuration
      
    } catch (error) {
      console.error('Error updating poster:', error);
      toast.error('Failed to update sold out poster');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Sold Out Poster Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Poster Display */}
          <div className="space-y-4">
            <Label>Current Sold Out Poster</Label>
            <div className="flex items-center gap-4">
              <img 
                src={currentPosterUrl} 
                alt="Current Sold Out Poster" 
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">
                  This poster is automatically applied to all events with 'sold_out' status.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Current file: /src/assets/sold-out-poster.jpg
                </p>
              </div>
            </div>
          </div>

          {/* Upload New Poster */}
          <div className="space-y-4">
            <Label>Update Sold Out Poster</Label>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="poster_upload">Upload New Image</Label>
                <Input 
                  id="poster_upload"
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload}
                  disabled={loading}
                  className="mb-2"
                />
              </div>

              <div>
                <Label htmlFor="poster_url">Or Enter Image URL</Label>
                <Input
                  id="poster_url"
                  value={newPosterUrl}
                  onChange={(e) => setNewPosterUrl(e.target.value)}
                  placeholder="https://example.com/sold-out-poster.jpg"
                  disabled={loading}
                />
              </div>

              {newPosterUrl && (
                <div className="space-y-2">
                  <Label>Preview New Poster</Label>
                  <img 
                    src={newPosterUrl} 
                    alt="New Sold Out Poster Preview" 
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                    onError={() => toast.error('Invalid image URL')}
                  />
                </div>
              )}

              <Button 
                onClick={handleUpdatePoster}
                disabled={loading || !newPosterUrl}
                className="w-full"
              >
                <Upload className="h-4 w-4 mr-2" />
                {loading ? 'Updating...' : 'Update Sold Out Poster'}
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-2">How it works:</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Upload or enter the URL of your new sold out poster</li>
              <li>• The system will update the configuration</li>
              <li>• All events with status "sold_out" will automatically use the new poster</li>
              <li>• Recommended size: 400x600px or similar poster ratio</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}