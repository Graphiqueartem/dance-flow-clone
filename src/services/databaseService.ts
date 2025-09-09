
import { supabase } from '@/integrations/supabase/client';
import { Judge, Performance, PerformanceFeedback } from '@/types/performance';

class DatabaseService {
  // File upload method using Supabase Storage
  async uploadFile(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('performance-files')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('performance-files')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    }
  }

  // Helper method to convert database judge to our Judge type
  private mapDatabaseJudgeToJudge(dbJudge: any): Judge {
    return {
      ...dbJudge,
      dance_genres: dbJudge.dance_genres || [],
      languages: dbJudge.languages || []
    };
  }

  // Helper method to convert database performance to our Performance type
  private mapDatabasePerformanceToPerformance(dbPerformance: any): Performance {
    return {
      ...dbPerformance,
      feedback_type: dbPerformance.feedback_type === 'free' ? 'FREE' as const : 'PAID' as const,
      status: this.mapDatabaseStatusToAppStatus(dbPerformance.status)
    };
  }

  // Helper method to convert app status to database status
  private mapAppStatusToDatabaseStatus(status: 'PENDING' | 'REVIEWED' | 'IN_PROGRESS'): 'pending' | 'reviewed' | 'in-progress' {
    switch (status) {
      case 'PENDING': return 'pending';
      case 'REVIEWED': return 'reviewed';
      case 'IN_PROGRESS': return 'in-progress';
      default: return 'pending';
    }
  }

  // Helper method to convert database status to app status
  private mapDatabaseStatusToAppStatus(status: 'pending' | 'reviewed' | 'in-progress'): 'PENDING' | 'REVIEWED' | 'IN_PROGRESS' {
    switch (status) {
      case 'pending': return 'PENDING';
      case 'reviewed': return 'REVIEWED';
      case 'in-progress': return 'IN_PROGRESS';
      default: return 'PENDING';
    }
  }

  // Judge methods
  async getJudges(): Promise<Judge[]> {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .order('name');

      if (error) throw error;
      return (data || []).map(judge => this.mapDatabaseJudgeToJudge(judge));
    } catch (error) {
      console.error('Error fetching judges:', error);
      throw error;
    }
  }

  async getJudge(id: string): Promise<Judge | null> {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? this.mapDatabaseJudgeToJudge(data) : null;
    } catch (error) {
      console.error('Error fetching judge:', error);
      throw error;
    }
  }

  async createJudge(judgeData: Partial<Judge>): Promise<Judge> {
    try {
      // Ensure required fields are present
      if (!judgeData.email || !judgeData.name) {
        throw new Error('Email and name are required for judge creation');
      }

      const { data, error } = await supabase
        .from('judges')
        .insert(judgeData as any)
        .select()
        .single();

      if (error) throw error;
      return this.mapDatabaseJudgeToJudge(data);
    } catch (error) {
      console.error('Error creating judge:', error);
      throw error;
    }
  }

  async updateJudge(id: string, judgeData: Partial<Judge>): Promise<Judge> {
    try {
      const { data, error } = await supabase
        .from('judges')
        .update(judgeData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return this.mapDatabaseJudgeToJudge(data);
    } catch (error) {
      console.error('Error updating judge:', error);
      throw error;
    }
  }

  // Auth methods
  async loginJudge(credentials: { email: string; password: string }): Promise<Judge | null> {
    try {
      const { data, error } = await supabase
        .from('judges')
        .select('*')
        .eq('email', credentials.email)
        .eq('password', credentials.password)
        .single();

      if (error) throw error;
      return data ? this.mapDatabaseJudgeToJudge(data) : null;
    } catch (error) {
      console.error('Error logging in judge:', error);
      throw error;
    }
  }

  async registerJudge(judgeData: Partial<Judge>): Promise<Judge> {
    try {
      // Ensure required fields are present
      if (!judgeData.email || !judgeData.name) {
        throw new Error('Email and name are required for judge registration');
      }

      const { data, error } = await supabase
        .from('judges')
        .insert(judgeData as any)
        .select()
        .single();

      if (error) throw error;
      return this.mapDatabaseJudgeToJudge(data);
    } catch (error) {
      console.error('Error registering judge:', error);
      throw error;
    }
  }

  // Performance methods
  async getPerformances(): Promise<Performance[]> {
    try {
      const { data, error } = await supabase
        .from('performances')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(performance => this.mapDatabasePerformanceToPerformance(performance));
    } catch (error) {
      console.error('Error fetching performances:', error);
      throw error;
    }
  }

  async getPerformancesByEmail(email: string): Promise<Performance[]> {
    try {
      const { data, error } = await supabase
        .from('performances')
        .select('*')
        .eq('email', email)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return (data || []).map(performance => this.mapDatabasePerformanceToPerformance(performance));
    } catch (error) {
      console.error('Error fetching performances by email:', error);
      throw error;
    }
  }

  async getPerformance(id: string): Promise<Performance | null> {
    try {
      const { data, error } = await supabase
        .from('performances')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data ? this.mapDatabasePerformanceToPerformance(data) : null;
    } catch (error) {
      console.error('Error fetching performance:', error);
      throw error;
    }
  }

  async createPerformance(performanceData: Partial<Performance>): Promise<Performance> {
    try {
      console.log('Creating performance with data:', performanceData);
      
      // Ensure required fields are present
      if (!performanceData.country || !performanceData.dance_genre || !performanceData.email || 
          !performanceData.language || !performanceData.performer_name || 
          !performanceData.performance_title || !performanceData.video_url) {
        throw new Error('Required fields missing for performance creation');
      }
      
      // Convert app types to database types
      const dbPerformanceData = {
        ...performanceData,
        feedback_type: performanceData.feedback_type === 'FREE' ? 'free' as const : 'paid' as const,
        status: performanceData.status ? this.mapAppStatusToDatabaseStatus(performanceData.status) : 'pending' as const
      };

      const { data, error } = await supabase
        .from('performances')
        .insert(dbPerformanceData as any)
        .select()
        .single();

      if (error) throw error;
      return this.mapDatabasePerformanceToPerformance(data);
    } catch (error) {
      console.error('Error creating performance:', error);
      throw error;
    }
  }

  async updatePerformance(id: string, performanceData: Partial<Performance>): Promise<Performance> {
    try {
      // Convert app types to database types
      const dbPerformanceData = {
        ...performanceData,
        feedback_type: performanceData.feedback_type === 'FREE' ? 'free' as const : 'paid' as const,
        status: performanceData.status ? this.mapAppStatusToDatabaseStatus(performanceData.status) : undefined
      };

      const { data, error } = await supabase
        .from('performances')
        .update(dbPerformanceData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return this.mapDatabasePerformanceToPerformance(data);
    } catch (error) {
      console.error('Error updating performance:', error);
      throw error;
    }
  }

  // Feedback methods
  async getFeedback(performanceId: string): Promise<PerformanceFeedback[]> {
    try {
      const { data, error } = await supabase
        .from('performance_feedback')
        .select('*')
        .eq('performance_id', performanceId)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching feedback:', error);
      throw error;
    }
  }

  async createFeedback(feedbackData: Partial<PerformanceFeedback>): Promise<PerformanceFeedback> {
    try {
      // Ensure required fields are present
      if (!feedbackData.judge_name || !feedbackData.text_feedback) {
        throw new Error('Judge name and text feedback are required for feedback creation');
      }

      const { data, error } = await supabase
        .from('performance_feedback')
        .insert(feedbackData as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating feedback:', error);
      throw error;
    }
  }

  // Feedback request methods
  async getFeedbackRequests(judgeId?: string): Promise<any[]> {
    try {
      let query = supabase
        .from('feedback_requests')
        .select('*')
        .order('requested_at', { ascending: false });

      if (judgeId) {
        query = query.eq('judge_id', judgeId);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching feedback requests:', error);
      throw error;
    }
  }

  async createFeedbackRequest(requestData: any): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('feedback_requests')
        .insert(requestData)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating feedback request:', error);
      throw error;
    }
  }

  async updateFeedbackRequest(id: string, status: 'accepted' | 'declined'): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('feedback_requests')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating feedback request:', error);
      throw error;
    }
  }
}

export const databaseService = new DatabaseService();
