
import { databaseService } from './databaseService';

export const initializeDemoData = async () => {
  try {
    console.log('Initializing demo data...');
    
    // Check if we already have judges
    const existingJudges = await databaseService.getJudges();
    if (existingJudges.length > 0) {
      console.log('Demo data already exists, skipping initialization');
      return;
    }

    // Create demo judges
    const demoJudges = [
      {
        name: 'Sarah Johnson',
        email: 'sarah@dancecomp.com',
        username: 'sarah_judge',
        password: 'password123',
        country: 'United States',
        languages: ['English', 'Spanish'],
        dance_genres: ['Contemporary', 'Ballet', 'Jazz'],
        is_platinum: true,
        bio: 'Professional dance instructor with 15 years of experience in contemporary and ballet. Former principal dancer with New York Ballet Company.',
        hourly_rate: 75,
        available_for_hire: true,
        rating: 4.9,
        review_count: 156
      },
      {
        name: 'Michael Chen',
        email: 'michael@dancecomp.com',
        username: 'michael_judge',
        password: 'password123',
        country: 'Canada',
        languages: ['English', 'Mandarin'],
        dance_genres: ['Hip Hop', 'Breaking', 'Popping'],
        is_platinum: false,
        bio: 'Street dance specialist and competition judge with expertise in urban dance styles. Winner of multiple international breaking competitions.',
        hourly_rate: 65,
        available_for_hire: true,
        rating: 4.8,
        review_count: 89
      },
      {
        name: 'Elena Rodriguez',
        email: 'elena@dancecomp.com',
        username: 'elena_judge',
        password: 'password123',
        country: 'Spain',
        languages: ['Spanish', 'English', 'French'],
        dance_genres: ['Flamenco', 'Latin', 'Salsa'],
        is_platinum: true,
        bio: 'Flamenco master and Latin dance expert. Trained in Seville and has performed worldwide.',
        hourly_rate: 80,
        available_for_hire: true,
        rating: 5.0,
        review_count: 203
      }
    ];

    console.log('Creating demo judges...');
    for (const judgeData of demoJudges) {
      try {
        const result = await databaseService.createJudge(judgeData);
        if (result) {
          console.log(`Created judge: ${judgeData.name}`);
        } else {
          console.error(`Failed to create judge: ${judgeData.name}`);
        }
      } catch (error) {
        console.error(`Error creating judge ${judgeData.name}:`, error);
      }
    }

    // Create demo performances
    const demoPerformances = [
      {
        performer_name: 'Alice Thompson',
        performance_title: 'Contemporary Solo - "Broken Dreams"',
        performance_description: 'An emotional contemporary piece exploring themes of loss and renewal.',
        video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        email: 'alice@example.com',
        feedback_type: 'FREE' as const,
        country: 'United States',
        language: 'English',
        dance_genre: 'Contemporary',
        platinum_upgrade: false,
        global_scoring: false,
        global_entry: false,
        teacher_recommendations_shown: false
      },
      {
        performer_name: 'David Kim',
        performance_title: 'Hip Hop Battle - "Street Kings"',
        performance_description: 'High-energy hip hop routine with intricate footwork and urban storytelling.',
        video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        email: 'david@example.com',
        feedback_type: 'PAID' as const,
        country: 'South Korea',
        language: 'English',
        dance_genre: 'Hip Hop',
        platinum_upgrade: true,
        global_scoring: true,
        global_entry: true,
        teacher_recommendations_shown: false
      }
    ];

    console.log('Creating demo performances...');
    for (const performanceData of demoPerformances) {
      try {
        const result = await databaseService.createPerformance(performanceData);
        if (result) {
          console.log(`Created performance: ${performanceData.performance_title}`);
        } else {
          console.error(`Failed to create performance: ${performanceData.performance_title}`);
        }
      } catch (error) {
        console.error(`Error creating performance ${performanceData.performance_title}:`, error);
      }
    }

    console.log('Demo data initialization completed');
  } catch (error) {
    console.error('Error initializing demo data:', error);
  }
};
