export interface AboutMe {
  firstName: string;
  middleName?: string;
  lastName: string;
  designation: string;
  profileImagePath: string;
  avatarImagePath: string;
  whoamiChipsText: Array<string>;
  details: Array<Detail>;
}
export interface Detail {
  label: string;
  description?: string;
  details: string | Array<SubDetail>;
}

export interface SubDetail {
  title?: string;
  detail?: string;
}
