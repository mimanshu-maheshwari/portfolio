export interface AboutMe {
  firstName: string;
  middleName?: string;
  lastName: string;
  designation: string;
  profileImage: string;
  avatarImage: string;
  whoamiChips: Array<string>;
  details: Array<Detail>;
  profiles?: Array<Profile>;
  contact?: ContactDetail;
  publications?: Array<Publication>;
  projects?: Array<Project>;
  resume?: string;
}
export interface Detail {
  label: string;
  description?: string;
  details: Array<string> | Array<SubDetail>;
}

export interface SubDetail {
  title?: string;
  detail?: string;
}

export enum ProfileType {
  LEETCODE = 'leetcode',
  GITHUB = 'github',
  INSTAGRAM = 'instagram',
  MEDIUM = 'medium',
  LINKEDIN = 'linkedin',
  MASTADON = 'mastadon',
}
export interface Profile {
  type: ProfileType;
  username: string;
}

export interface ContactDetail {
  numbers: Array<string>;
  mails: Array<{ type?: 'gmail' | 'outlook' | 'hotmail'; mailId: string }>;
}
export interface Publication {
  title: string;
  description?: string;
  link?: string;
  image?: string;
}

export interface Project {
  name: string;
  link?: string;
  description?: string;
  image?: string;
}
