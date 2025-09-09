
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Link2 } from 'lucide-react';
import { databaseService } from '@/services/databaseService';

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  acceptedTypes?: string;
  label: string;
  currentUrl?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  acceptedTypes = "*", 
  label,
  currentUrl = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [urlInput, setUrlInput] = useState(currentUrl);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await databaseService.uploadFile(file);
      if (url) {
        onFileUpload(url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onFileUpload(urlInput.trim());
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="text-sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="url" className="text-sm">
            <Link2 className="h-4 w-4 mr-2" />
            Enter URL
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-2">
          <div className="flex items-center space-x-2">
            <Input
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
              disabled={isUploading}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {isUploading && <span className="text-sm text-gray-500">Uploading...</span>}
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="mt-2">
          <div className="flex space-x-2">
            <Input
              type="url"
              placeholder="https://example.com/video.mp4"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={handleUrlSubmit}
              disabled={!urlInput.trim()}
              size="sm"
            >
              Add URL
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      {currentUrl && (
        <div className="text-sm text-green-600 mt-2">
          ✓ File selected: {currentUrl.length > 50 ? `${currentUrl.substring(0, 50)}...` : currentUrl}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
