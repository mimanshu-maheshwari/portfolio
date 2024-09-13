export interface UserDataProfile {
  aboutMe: string;
  company?: string;
  countryName?: string;
  realName: string;
  birthday?: string;
  userAvatar: string;
  ranking: number;
  reputation: number;
  school?: string;
  skillTags: Array<string>;
  websites: Array<string>;
}

export interface MatchedUser {
  activeBadge: Badge;
  badges: Badge[];
  githubUrl: string;
  linkedinUrl?: string;
  profile: UserDataProfile;
  upcomingBadges: Badge[];
  username: string;
  twitterUrl?: string;
  submissionCalendar: { [key: string]: number };
  submitStats: {
    totalSubmissionNum: {
      difficulty: Difficulty;
      count: number;
      submissions: number;
    }[];
    acSubmissionNum: {
      difficulty: Difficulty;
      count: number;
      submissions: number;
    }[];
    count: number;
  };
}

export interface UserData {
  userContestRanking: null | {
    attendedContestsCount: number;
    badge: Badge;
    globalRanking: number;
    rating: number;
    totalParticipants: number;
    topPercentage: number;
  };
  userContestRankingHistory: {
    attended: boolean;
    rating: number;
    ranking: number;
    trendDirection: string;
    problemsSolved: number;
    totalProblems: number;
    finishTimeInSeconds: number;
    contest: {
      title: string;
      startTime: string;
    };
  }[];
  matchedUser: MatchedUser;
  recentAcSubmissionList: {}[];
  recentSubmissionList: Submission[];
}

export interface Badge {
  name: string;
  icon: string;
}

export enum Difficulty {
  ALL = 'All',
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

// type Difficulty = 'All' | 'Easy' | 'Medium' | 'Hard';

//User Details
// export type FetchUserDataRequest = Request<
//   { username: string },
//   {},
//   { username: string; limit: number },
//   { limit: number }
// >;

// export type TransformedUserDataRequest = Request<
//   {},
//   {},
//   { username: string; limit: number }
// >;

//  ProblemData
export interface ProblemSetQuestionListData {
  problemsetQuestionList: {
    total: number;
    questions: {}[];
  };
}

export interface Submission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

export interface Question {
  content: string;
  companyTagStats: string[];
  difficulty: Difficulty;
  dislikes: number;
  exampleTestcases: {}[];
  hints: {}[];
  isPaidOnly: boolean;
  likes: number;
  questionId: number;
  questionFrontendId: number;
  solution: string;
  similarQuestions: {}[];
  title: string;
  titleSlug: string;
  topicTags: string[];
}

export interface DailyProblemData {
  activeDailyCodingChallengeQuestion: {
    date: string;
    link: string;
    question: Question;
  };
}

export interface SelectProblemData {
  question: Question;
}

export interface TrendingDiscussionObject {
  data: {
    cachedTrendingCategoryTopics: {
      id: number;
      title: string;
      post: {
        id: number;
        creationDate: number;
        contentPreview: string;
        author: {
          username: string;
          isActive: boolean;
          profile: {
            userAvatar: string;
          };
        };
      };
    }[];
  };
}
