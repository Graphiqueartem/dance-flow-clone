import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageImage {
  id: string;
  page_name: string;
  section_name: string;
  image_url: string;
  alt_text: string;
  display_order: number;
  is_active: boolean;
}

export function usePageImages(pageName: string, sectionName?: string) {
  const [images, setImages] = useState<PageImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        let query = supabase
          .from('page_images')
          .select('*')
          .eq('page_name', pageName)
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (sectionName) {
          query = query.eq('section_name', sectionName);
        }

        const { data, error } = await query;

        if (error) throw error;
        setImages(data || []);
      } catch (error) {
        console.error('Error loading page images:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImages();
  }, [pageName, sectionName]);

  return { images, loading };
}