-- Create page_images table for managing images across different pages
CREATE TABLE public.page_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_name TEXT NOT NULL,
  section_name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  display_order INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.page_images ENABLE ROW LEVEL SECURITY;

-- Create policies for page_images
CREATE POLICY "Page images are viewable by everyone" 
ON public.page_images 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can manage page images" 
ON public.page_images 
FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_page_images_updated_at
BEFORE UPDATE ON public.page_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some initial promotional images
INSERT INTO public.page_images (page_name, section_name, image_url, alt_text, display_order) VALUES
('home', 'promo', '/lovable-uploads/ebc949cf-633c-4a0a-b0a4-f106a1f03184.png', 'Give your students the LoveDanceLive experience of lifetime! Pay in 4 easy installments!', 1),
('home', 'promo', '/lovable-uploads/1e752da3-7e89-4d81-bf11-75551592347e.png', 'Let''s create the best memories ever! LoveDanceLive will be professionally filmed with our judges commentary.', 2),
('home', 'promo', '/lovable-uploads/57fe5944-aee7-4ed6-8b12-b72fa140715e.png', 'Give your students the LoveDanceLive experience of lifetime! Pay in 4 easy installments!', 3),
('about', 'gallery', '/lovable-uploads/9e193e2c-03e4-4beb-9ac4-b8cf9da531a1.png', 'Solo dance performance showcasing artistic expression', 1),
('about', 'gallery', '/lovable-uploads/6a38fd78-d5d4-4a59-9e5d-b9ba13da5a37.png', 'Group dance performance with synchronized jumps', 2),
('competitions', 'gallery', '/lovable-uploads/fedd07b4-5cfa-4546-809e-5523153f7a37.png', 'Children dance performance in colorful costumes', 1),
('competitions', 'gallery', '/lovable-uploads/2019e4c9-0864-43d2-b805-997720a1e8db.png', 'Hip hop dance group performance with dramatic lighting', 2),
('workshops', 'hero', '/lovable-uploads/9947f2b7-195b-4aac-9ae5-126784efb879.png', 'Acrobatic dance group performance demonstrating advanced techniques', 1),
('community', 'gallery', '/lovable-uploads/08e85416-9f25-4cee-87d6-7cb27fb30f9c.png', 'Young hip hop dancers in black outfits showing attitude and style', 1);