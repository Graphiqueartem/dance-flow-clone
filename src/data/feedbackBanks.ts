export interface FeedbackCategory {
  id: string;
  label: string;
  sentences: string[];
}

export const FEEDBACK_BANKS: FeedbackCategory[] = [
  {
    id: 'technique',
    label: 'Technique',
    sentences: [
      'Strong control and clear lines throughout.',
      'Good posture and alignment.',
      'Excellent extension in legs and arms.',
      'Clean and precise footwork.',
      'Turns were controlled and well-placed.',
      'Jumps were light and well-executed.',
      'Smooth transitions between movements.',
      'Needs stronger core engagement for stability.',
      'Footwork lacked clarity at times.',
      'Balance wavered slightly during turns.',
      'Jumps could have more height and power.',
      'Transitions between steps felt rushed.',
      'Lines and shapes could be more refined.',
      'Floorwork was fluid and grounded.',
      'Energy dropped towards the end.',
    ],
  },
  {
    id: 'musicality',
    label: 'Musicality',
    sentences: [
      'Strong sense of rhythm throughout.',
      'Good connection to the music.',
      'Musical phrasing was clear and intentional.',
      'Lovely interpretation of tempo changes.',
      'Movements matched dynamics of the music.',
      'Excellent timing on accents.',
      'Could use stronger awareness of musical pauses.',
      'Movement sometimes disconnected from rhythm.',
      'Musical expression needs more variety.',
      'Timing slipped slightly in sections.',
    ],
  },
  {
    id: 'performance_expression',
    label: 'Performance / Expression',
    sentences: [
      'Expressive and engaging stage presence.',
      'Strong projection of emotion.',
      'Connected well with the audience.',
      'Performance felt authentic and moving.',
      'Excellent use of facial expression.',
      'Engaging energy sustained throughout.',
      'Performance felt a little flat in parts.',
      'More facial expression would enhance impact.',
      'Could connect more strongly with the audience.',
      'Energy dipped towards the finish.',
      'Powerful and commanding presence.',
      'Very natural storytelling through movement.',
    ],
  },
  {
    id: 'choreography',
    label: 'Choreography',
    sentences: [
      'Routine showed creativity and originality.',
      'Strong use of levels and dynamics.',
      'Great use of stage space.',
      'Movements flowed naturally from one to the next.',
      'Transitions between sections were smooth.',
      'Choreography highlighted dancer strengths.',
      'Routine had strong variety and contrast.',
      'Could use more innovative movement choices.',
      'Repetition weakened impact slightly.',
      'Transitions felt abrupt in places.',
      'Staging could use more variety.',
    ],
  },
  {
    id: 'overall_impression',
    label: 'Overall Impression',
    sentences: [
      'A confident and captivating performance.',
      'Very professional stage presence.',
      'Polished and well-rehearsed routine.',
      'Great potential - keep developing artistry.',
      'Lovely performance with room for refinement.',
      'Outstanding - a real highlight of the showcase.',
      'Mature and accomplished performance for age.',
      'Clear passion and love for dance.',
      'Strong foundation - exciting future ahead.',
      'Needs more consistency overall but very promising.',
    ],
  },
];

export interface CategoryFeedback {
  score: number;
  selectedSentences: string[];
  customComment: string;
}

export interface CompleteFeedback {
  technique: CategoryFeedback;
  musicality: CategoryFeedback;
  performance_expression: CategoryFeedback;
  choreography: CategoryFeedback;
  overall_impression: CategoryFeedback;
}
