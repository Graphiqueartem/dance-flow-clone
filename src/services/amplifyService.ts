
import { generateClient } from 'aws-amplify/api';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { signUp, signIn, signOut, getCurrentUser } from 'aws-amplify/auth';
import { Judge, Performance, PerformanceFeedback, FeedbackRequest } from '@/types/performance';
import { createJudge, createPerformance, updatePerformance, createPerformanceFeedback, createFeedbackRequest } from '../graphql/mutations';
import { listJudges, listPerformances, listFeedbackRequests } from '../graphql/queries';

const client = generateClient();

// Judge operations
export const amplifyCreateJudge = async (judgeData: Partial<Judge>): Promise<Judge> => {
  try {
    const result = await client.graphql({
      query: createJudge,
      variables: { input: judgeData }
    });
    
    if ('data' in result && result.data) {
      return result.data.createJudge;
    }
    throw new Error('Failed to create judge');
  } catch (error) {
    console.error('Error creating judge:', error);
    throw error;
  }
};

export const amplifyListJudges = async (): Promise<Judge[]> => {
  try {
    const result = await client.graphql({
      query: listJudges
    });
    
    if ('data' in result && result.data) {
      return result.data.listJudges.items;
    }
    return [];
  } catch (error) {
    console.error('Error fetching judges:', error);
    return [];
  }
};

// Performance operations
export const amplifyCreatePerformance = async (performanceData: Partial<Performance>): Promise<Performance> => {
  try {
    const result = await client.graphql({
      query: createPerformance,
      variables: { input: performanceData }
    });
    
    if ('data' in result && result.data) {
      return result.data.createPerformance;
    }
    throw new Error('Failed to create performance');
  } catch (error) {
    console.error('Error creating performance:', error);
    throw error;
  }
};

export const amplifyListPerformances = async (): Promise<Performance[]> => {
  try {
    const result = await client.graphql({
      query: listPerformances
    });
    
    if ('data' in result && result.data) {
      return result.data.listPerformances.items;
    }
    return [];
  } catch (error) {
    console.error('Error fetching performances:', error);
    return [];
  }
};

export const amplifyUpdatePerformance = async (id: string, updates: Partial<Performance>): Promise<Performance> => {
  try {
    const result = await client.graphql({
      query: updatePerformance,
      variables: { input: { id, ...updates } }
    });
    
    if ('data' in result && result.data) {
      return result.data.updatePerformance;
    }
    throw new Error('Failed to update performance');
  } catch (error) {
    console.error('Error updating performance:', error);
    throw error;
  }
};

// Feedback operations
export const amplifyCreateFeedback = async (feedbackData: Partial<PerformanceFeedback>): Promise<PerformanceFeedback> => {
  try {
    const result = await client.graphql({
      query: createPerformanceFeedback,
      variables: { input: feedbackData }
    });
    
    if ('data' in result && result.data) {
      return result.data.createPerformanceFeedback;
    }
    throw new Error('Failed to create feedback');
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw error;
  }
};

// Feedback Request operations
export const amplifyCreateFeedbackRequest = async (requestData: Partial<FeedbackRequest>): Promise<FeedbackRequest> => {
  try {
    const result = await client.graphql({
      query: createFeedbackRequest,
      variables: { input: requestData }
    });
    
    if ('data' in result && result.data) {
      return result.data.createFeedbackRequest;
    }
    throw new Error('Failed to create feedback request');
  } catch (error) {
    console.error('Error creating feedback request:', error);
    throw error;
  }
};

export const amplifyListFeedbackRequests = async (): Promise<FeedbackRequest[]> => {
  try {
    const result = await client.graphql({
      query: listFeedbackRequests
    });
    
    if ('data' in result && result.data) {
      return result.data.listFeedbackRequests.items;
    }
    return [];
  } catch (error) {
    console.error('Error fetching feedback requests:', error);
    return [];
  }
};

// File upload operations
export const uploadFile = async (file: File, key: string): Promise<string> => {
  try {
    const result = await uploadData({
      key,
      data: file,
    }).result;

    const url = await getUrl({ key: result.key });
    return url.url.toString();
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Auth operations
export const amplifySignUp = async (email: string, password: string, name: string) => {
  return await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        name,
      },
    },
  });
};

export const amplifySignIn = async (email: string, password: string) => {
  return await signIn({ username: email, password });
};

export const amplifySignOut = async () => {
  return await signOut();
};

export const amplifyGetCurrentUser = async () => {
  return await getCurrentUser();
};
