-- Insert some sample events with different statuses
INSERT INTO public.events (title, description, event_date, location, price, poster_image_url, status, event_type) VALUES
(
  'Love Dance Summer Camp 2023',
  'An intensive summer camp for dancers of all levels. Learn from world-renowned instructors and compete in our final showcase.',
  '2024-07-15 10:00:00+00',
  'Los Angeles, CA',
  299.99,
  '/src/assets/event-poster-1.jpg',
  'sold_out',
  'workshop'
),
(
  'Royal Academy Dance Gala',
  'An elegant evening of classical ballet and contemporary performances by leading dancers from around the world.',
  '2024-04-20 19:00:00+00',
  'London, UK',
  89.99,
  '/src/assets/event-poster-2.jpg',
  'current',
  'competition'
),
(
  'Urban Dance Battle Championship',
  'The ultimate street dance competition featuring hip-hop, breaking, and freestyle battles.',
  '2024-05-10 15:00:00+00',
  'New York, NY',
  45.00,
  '/src/assets/event-poster-3.jpg',
  'upcoming',
  'competition'
),
(
  'Contemporary Expression Workshop',
  'Explore the depths of contemporary dance with emotion-driven choreography and improvisation techniques.',
  '2024-03-25 09:00:00+00',
  'Paris, France',
  120.00,
  '/src/assets/contemporary-dance.jpg',
  'upcoming',
  'masterclass'
),
(
  'Ballroom Elegance Masterclass',
  'Master the art of ballroom dancing with international champions. Perfect for couples and individuals.',
  '2024-06-08 14:00:00+00',
  'Vienna, Austria',
  180.00,
  '/src/assets/ballroom-dance.jpg',
  'sold_out',
  'masterclass'
);

-- Insert some sample page content
INSERT INTO public.page_content (page_name, section_name, content_type, content_value) VALUES
('home', 'hero_title', 'text', 'Where Passion Meets Performance'),
('home', 'hero_subtitle', 'text', 'Live & Online Dance Competition Platform'),
('home', 'hero_description', 'text', 'Join thousands of dancers worldwide. Compete live in our global cities or submit your performance online to get expert feedback and win amazing prizes.'),
('about', 'hero_title', 'text', 'About Love Dance Live'),
('about', 'hero_subtitle', 'text', 'Connecting dancers worldwide through passion and performance'),
('competitions', 'hero_title', 'text', 'Dance Competitions'),
('competitions', 'hero_subtitle', 'text', 'Showcase your talent on the global stage'),
('workshops', 'hero_title', 'text', 'Dance Workshops'),
('workshops', 'hero_subtitle', 'text', 'Learn from world-renowned instructors and master your craft');