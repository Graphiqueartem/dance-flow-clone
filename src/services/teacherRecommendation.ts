
import { Teacher, Judge } from '@/types/performance';

// Mock teachers data
const MOCK_TEACHERS: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'Alex Dance Master',
    image: '/placeholder.svg',
    price: '$75/hour',
    rating: 4.9,
    danceGenres: ['Hip Hop', 'Street Dance', 'Breaking'],
    description: 'International Hip Hop champion with 15+ years experience'
  },
  {
    id: 'teacher-2',
    name: 'Isabella Martinez',
    image: '/placeholder.svg',
    price: '$85/hour',
    rating: 4.8,
    danceGenres: ['Salsa', 'Bachata', 'Latin'],
    description: 'Professional Latin dance instructor and choreographer'
  },
  {
    id: 'teacher-3',
    name: 'Raj Patel',
    image: '/placeholder.svg',
    price: '$70/hour',
    rating: 4.7,
    danceGenres: ['Bollywood', 'Classical', 'Fusion'],
    description: 'Traditional and modern Indian dance specialist'
  },
  {
    id: 'teacher-4',
    name: 'Sophie Chen',
    image: '/placeholder.svg',
    price: '$90/hour',
    rating: 4.9,
    danceGenres: ['Contemporary', 'Modern', 'Jazz'],
    description: 'Former principal dancer, now teaching contemporary techniques'
  },
  {
    id: 'teacher-5',
    name: 'Viktor Petrov',
    image: '/placeholder.svg',
    price: '$100/hour',
    rating: 5.0,
    danceGenres: ['Ballet', 'Classical', 'Contemporary'],
    description: 'Royal Ballet Academy graduate and master teacher'
  }
];

export class TeacherRecommendationService {
  static getRecommendedTeachers(danceGenre: string): Teacher[] {
    console.log('Getting teacher recommendations for genre:', danceGenre);
    
    // First, try to get judges who are available for hire and match the genre
    const availableJudges = this.getAvailableJudgesAsTeachers(danceGenre);
    
    // Find teachers that match the dance genre
    const matchingTeachers = MOCK_TEACHERS.filter(teacher => 
      teacher.danceGenres.includes(danceGenre)
    );

    // Combine judges and teachers
    const allRecommendations = [...availableJudges, ...matchingTeachers];

    // If no exact matches, return general teachers
    if (allRecommendations.length === 0) {
      return MOCK_TEACHERS.slice(0, 3);
    }

    // Return up to 5 recommendations, sorted by rating
    const sortedRecommendations = allRecommendations.sort((a, b) => b.rating - a.rating);
    return sortedRecommendations.slice(0, 5);
  }

  static getAvailableJudgesAsTeachers(danceGenre: string): Teacher[] {
    const storedJudges: Judge[] = JSON.parse(localStorage.getItem('judges') || '[]');
    
    // Filter judges who are available for hire and match the genre
    const availableJudges = storedJudges.filter(judge => 
      judge.available_for_hire && judge.dance_genres?.includes(danceGenre)
    );

    // Convert judges to teacher format
    return availableJudges.map(judge => ({
      id: judge.id,
      name: judge.name,
      image: judge.profile_image || '/placeholder.svg',
      price: `$${judge.hourly_rate || 75}/hour`,
      rating: judge.rating || 5.0,
      danceGenres: judge.dance_genres || [],
      description: judge.bio || `Professional ${judge.is_platinum ? 'Platinum ' : ''}judge with expertise in ${judge.dance_genres?.join(', ') || 'dance'}`
    }));
  }
}
