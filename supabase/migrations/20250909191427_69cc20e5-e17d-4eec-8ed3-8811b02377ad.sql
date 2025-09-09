-- Update events with proper poster images
UPDATE public.events 
SET poster_image_url = CASE 
  WHEN event_type = 'competition' THEN '/src/assets/event-poster-competition-1.jpg'
  WHEN event_type = 'workshop' THEN '/src/assets/event-poster-workshop-1.jpg'
  WHEN event_type = 'masterclass' THEN '/src/assets/event-poster-masterclass-1.jpg'
  ELSE poster_image_url
END
WHERE poster_image_url LIKE '/api/placeholder%' OR poster_image_url IS NULL;

-- Also update some existing ones to use the new posters
UPDATE public.events 
SET poster_image_url = CASE 
  WHEN event_type = 'competition' THEN '/src/assets/event-poster-competition-1.jpg'
  WHEN event_type = 'workshop' THEN '/src/assets/event-poster-workshop-1.jpg'
  WHEN event_type = 'masterclass' THEN '/src/assets/event-poster-masterclass-1.jpg'
  ELSE poster_image_url
END;