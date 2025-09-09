
import { Judge, Performance } from '@/types/performance';
import { databaseService } from './databaseService';

export class JudgeAllocationService {
  static async allocateStandardJudge(performance: Performance): Promise<Judge | null> {
    console.log('Allocating standard judge for performance:', performance.id);
    
    try {
      // Get all judges from database instead of localStorage
      const allJudges = await databaseService.getJudges();
      
      if (allJudges.length === 0) {
        console.log('No judges available');
        return null;
      }

      // Filter judges by dance genre (most important criteria)
      const genreMatchingJudges = allJudges.filter(judge => 
        judge.dance_genres && judge.dance_genres.includes(performance.dance_genre)
      );

      if (genreMatchingJudges.length === 0) {
        // Fallback: assign any judge who speaks the language
        const fallbackJudges = allJudges.filter(judge => 
          judge.languages && judge.languages.includes(performance.language)
        );
        return fallbackJudges.length > 0 ? fallbackJudges[0] : allJudges[0];
      }

      // Sort by best match and return the first one
      const sortedJudges = genreMatchingJudges.sort((a, b) => {
        const scoreA = this.calculateMatchScore(a, performance);
        const scoreB = this.calculateMatchScore(b, performance);
        return scoreB - scoreA;
      });

      console.log('Allocated standard judge:', sortedJudges[0].name);
      return sortedJudges[0];
    } catch (error) {
      console.error('Error allocating standard judge:', error);
      return null;
    }
  }

  static async allocatePlatinumJudge(): Promise<Judge | null> {
    console.log('Allocating platinum judge');
    
    try {
      const allJudges = await databaseService.getJudges();
      const platinumJudges = allJudges.filter(judge => judge.is_platinum);
      
      if (platinumJudges.length === 0) {
        console.log('No platinum judges available');
        return null;
      }

      // Randomly select a platinum judge
      const randomIndex = Math.floor(Math.random() * platinumJudges.length);
      const selectedJudge = platinumJudges[randomIndex];
      
      console.log('Allocated platinum judge:', selectedJudge.name);
      return selectedJudge;
    } catch (error) {
      console.error('Error allocating platinum judge:', error);
      return null;
    }
  }

  private static calculateMatchScore(judge: Judge, performance: Performance): number {
    let score = 0;
    
    if (judge.country === performance.country) score += 3;
    if (judge.languages && judge.languages.includes(performance.language)) score += 2;
    if (judge.dance_genres && judge.dance_genres.includes(performance.dance_genre)) score += 5; // Higher weight for genre match
    
    return score;
  }

  static async getJudgeById(judgeId: string): Promise<Judge | null> {
    try {
      const allJudges = await databaseService.getJudges();
      return allJudges.find(judge => judge.id === judgeId) || null;
    } catch (error) {
      console.error('Error getting judge by ID:', error);
      return null;
    }
  }

  static async getAllJudges(): Promise<Judge[]> {
    try {
      return await databaseService.getJudges();
    } catch (error) {
      console.error('Error getting all judges:', error);
      return [];
    }
  }
}
