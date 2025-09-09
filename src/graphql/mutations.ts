
export const createJudge = `
  mutation CreateJudge($input: CreateJudgeInput!) {
    createJudge(input: $input) {
      id
      name
      email
      username
      role
      country
      languages
      danceGenres
      isPlatinum
      bio
      hourlyRate
      availableForHire
      rating
      reviewCount
      createdAt
      updatedAt
    }
  }
`;

export const createPerformance = `
  mutation CreatePerformance($input: CreatePerformanceInput!) {
    createPerformance(input: $input) {
      id
      performerName
      performanceTitle
      performanceDescription
      videoUrl
      email
      feedbackType
      status
      country
      language
      danceGenre
      platinumUpgrade
      globalScoring
      globalEntry
      teacherRecommendationsShown
      assignedJudgeId
      assignedJudgeName
      platinumJudgeId
      submittedAt
      createdAt
      updatedAt
    }
  }
`;

export const updatePerformance = `
  mutation UpdatePerformance($input: UpdatePerformanceInput!) {
    updatePerformance(input: $input) {
      id
      status
      updatedAt
    }
  }
`;

export const createPerformanceFeedback = `
  mutation CreatePerformanceFeedback($input: CreatePerformanceFeedbackInput!) {
    createPerformanceFeedback(input: $input) {
      id
      performanceId
      judgeId
      judgeName
      textFeedback
      videoFeedbackUrl
      timing
      reflex
      smoothness
      creativity
      technique
      overall
      submittedAt
      createdAt
    }
  }
`;

export const createFeedbackRequest = `
  mutation CreateFeedbackRequest($input: CreateFeedbackRequestInput!) {
    createFeedbackRequest(input: $input) {
      id
      judgeId
      judgeName
      performerName
      performerEmail
      performanceTitle
      performanceDescription
      videoUrl
      message
      status
      requestedAt
      createdAt
    }
  }
`;
