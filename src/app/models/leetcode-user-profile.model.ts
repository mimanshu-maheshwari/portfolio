export interface UserDataProfile {
  realName: string;
  userAvatar: string;
  birthday?: string;
  ranking: number;
  reputation: number;
  websites: Array<string>;
  countryName?: string;
  company?: string;
  school?: string;
  skillTags: Array<string>;
  starRating: number;
  aboutMe: string;
}

export interface MatchedUser {
  username: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  contributions: Contributions;
  profile: UserDataProfile;
  badges?: Array<Badge>;
  upcomingBadges: Array<Badge>;
  activeBadge?: Badge;
  submitStats: SubmitStats;
  submissionCalendar: { [key: string]: number };
}

export interface SubmitStats {
  totalSubmissionNum: Array<SubmissionNum>;
  acSubmissionNum: Array<SubmissionNum>;
  count: number;
}

export interface SubmissionNum {
  difficulty: Difficulty;
  count: number;
  submissions: number;
}

export interface Contributions {
  points?: number;
  questionCount?: number;
  testcaseCount?: number;
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
  userContestRankingHistory: Array<{
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
  }>;
  matchedUser: MatchedUser;
  recentAcSubmissionList: Array<{}>;
  recentSubmissionList: Array<Submission>;
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
    questions: Array<Question>;
  };
}

export interface Submission {
  title: string;
  titleSlug: string;
  timestamp: number;
  statusDisplay: string;
  lang: string;
}

export interface Question {
  content: string;
  companyTagStats: Array<string>;
  difficulty: Difficulty;
  dislikes: number;
  exampleTestcases: Array<{}>;
  hints: Array<{}>;
  isPaidOnly: boolean;
  likes: number;
  questionId: number;
  questionFrontendId: number;
  solution: string;
  similarQuestions: Array<Question>;
  title: string;
  titleSlug: string;
  topicTags: Array<string>;
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
    cachedTrendingCategoryTopics: Array<{
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
    }>;
  };
}
export interface Publication {
  link: string;
  heading: string;
  detail: string;
  img: string;
}
