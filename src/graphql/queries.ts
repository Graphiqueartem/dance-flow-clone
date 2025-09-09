
export const listJudges = `
  query ListJudges {
    listJudges {
      items {
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
  }
`;

export const listPerformances = `
  query ListPerformances {
    listPerformances {
      items {
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
  }
`;

export const listFeedbackRequests = `
  query ListFeedbackRequests {
    listFeedbackRequests {
      items {
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
  }
`;
