export interface WakaEditors{
  id: string;
  name: string;
  released: boolean;
  repository: string;
  version: string;
  website: string
}

export interface Language{
  name: string
  total_seconds: number
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
  is_hirable: boolean
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
