import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PageContent {
  id: string;
  page_name: string;
  section_name: string;
  content_type: string;
  content_value: string;
}

interface ContentMap {
  [key: string]: string;
}

export function usePageContent(pageName: string, sectionName?: string) {
  const [content, setContent] = useState<PageContent[]>([]);
  const [contentMap, setContentMap] = useState<ContentMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        let query = supabase
          .from('page_content')
          .select('*')
          .eq('page_name', pageName);

        if (sectionName) {
          query = query.eq('section_name', sectionName);
        }

        const { data, error } = await query;

        if (error) throw error;
        
        const contentArray = data || [];
        setContent(contentArray);
        
        // Create a map for easy access: "section_name.content_type" -> content_value
        const map: ContentMap = {};
        contentArray.forEach(item => {
          const key = sectionName ? item.content_type : `${item.section_name}.${item.content_type}`;
          map[key] = item.content_value;
        });
        setContentMap(map);
      } catch (error) {
        console.error('Error loading page content:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [pageName, sectionName]);

  // Helper function to get content with fallback
  const getContent = (key: string, fallback: string = '') => {
    return contentMap[key] || fallback;
  };

  return { content, contentMap, getContent, loading };
}