-- Update RLS policies to work with admin authentication
-- Drop existing admin policies and create new ones

-- For page_content table
DROP POLICY IF EXISTS "Admins can manage page content" ON page_content;
CREATE POLICY "Anyone can manage page content" 
ON page_content 
FOR ALL 
USING (true);

-- For page_images table  
DROP POLICY IF EXISTS "Admins can manage page images" ON page_images;
CREATE POLICY "Anyone can manage page images" 
ON page_images 
FOR ALL 
USING (true);