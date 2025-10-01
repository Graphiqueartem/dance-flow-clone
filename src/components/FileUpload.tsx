
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Video, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { databaseService } from '@/services/databaseService';

interface FileUploadProps {
  onFileUpload: (url: string) => void;
  acceptedTypes?: string;
  label: string;
  currentUrl?: string;
}

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB in bytes
const ACCEPTED_VIDEO_TYPES = 'video/mp4,video/quicktime,video/x-msvideo,video/x-ms-wmv,video/webm,video/mpeg';

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  acceptedTypes = ACCEPTED_VIDEO_TYPES, 
  label,
  currentUrl = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');

    // Validate file type
    const isVideo = file.type.startsWith('video/');
    if (!isVideo) {
      setError('Please upload a video file only (MP4, MOV, AVI, WMV, WebM, MPEG)');
      event.target.value = '';
      return;
    }

    // Validate file size (100MB max)
    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      setError(`File size (${sizeMB}MB) exceeds the maximum limit of 100MB`);
      event.target.value = '';
      return;
    }

    setIsUploading(true);
    try {
      const url = await databaseService.uploadFile(file);
      if (url) {
        onFileUpload(url);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">{label}</Label>
      
      {/* File Size Info */}
      <Alert className="border-primary/20 bg-primary/5">
        <Video className="h-4 w-4 text-primary" />
        <AlertDescription className="text-sm">
          <strong>Video Upload Only</strong> - Maximum file size: 100MB
          <br />
          <span className="text-xs text-muted-foreground">
            Supported formats: MP4, MOV, AVI, WMV, WebM, MPEG
          </span>
        </AlertDescription>
      </Alert>

      {/* File Upload Input */}
      <div className="relative">
        <div className="flex items-center justify-center w-full">
          <label 
            htmlFor="dropzone-file" 
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isUploading 
                ? 'border-muted bg-muted/50' 
                : 'border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className={`w-8 h-8 mb-3 ${isUploading ? 'text-muted-foreground' : 'text-primary'}`} />
              {isUploading ? (
                <p className="text-sm text-muted-foreground">Uploading video...</p>
              ) : (
                <>
                  <p className="mb-2 text-sm font-medium">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Video files only (Max 100MB)
                  </p>
                </>
              )}
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept={acceptedTypes}
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-sm">{error}</AlertDescription>
        </Alert>
      )}
      
      {/* Success Message */}
      {currentUrl && !error && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <Video className="h-4 w-4 text-green-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-green-900">Video uploaded successfully!</p>
            <p className="text-xs text-green-700 truncate">{currentUrl.split('/').pop()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
