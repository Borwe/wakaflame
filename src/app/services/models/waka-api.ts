export interface WakaEditors{
  id: string;
  name: string;
  released: boolean;
  repository: string;
  version: string;
  website: string
}

export interface WakaUserStatusEditor{
  text: number
  name: string
}

export interface Language{
  name: string
  total_seconds: number
}

/**
 * Hold information on language, and count of how many users use interface
 */
export class LanguageCount{
  position: number;
  name: string;
  users: number;
  seconds: number;

  constructor(lang: Language){
    this.position = 0;
    this.name = lang.name;
    this.users = 1;
    this.seconds = lang.total_seconds;
  }
}

export class EditorCount{
  name: string;
  users: number;

  constructor(name: string){
    this.name = name;
    this.users = 0;
  }
}

export interface RunningTotal{
  human_readable_total: string
  human_readable_daily_average: string
  languages: Array<Language>
}

export interface LeaderCity{
  name: string
  state: string
  title: string
  country_code: string
  country: string
}

export interface LeaderUser{
  city?: LeaderCity
  display_name: string
  email?: string
  full_name: string
  is_hireable: boolean
  username: string
  human_readable_website: string
  photo: string
}

export interface LeaderJson{
  rank: number;
  running_total: RunningTotal;
  user: LeaderUser;
}

export interface WakaReplyJson{
  data: any;
  total?: number;
  total_pages: number;
}


export interface WakaStatsReplyJson{
  data: any;
}
