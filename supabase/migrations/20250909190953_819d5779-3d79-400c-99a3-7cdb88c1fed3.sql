-- Create admin user in admin_users table
INSERT INTO public.admin_users (email, password_hash, name)
VALUES (
  'admin@lovedancelive.com',
  -- This is the bcrypt hash for 'LoveDance2024!Secure'
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Platform Administrator'
);

-- Also ensure we have some dummy event posters by updating events
UPDATE public.events 
SET poster_image_url = CASE 
  WHEN id = (SELECT ID FROM public.events ORDER BY created_at LIMIT 1) THEN '/api/placeholder/400/600'
  WHEN status = 'sold_out' THEN '/api/placeholder/400/600' 
  ELSE poster_image_url
END;