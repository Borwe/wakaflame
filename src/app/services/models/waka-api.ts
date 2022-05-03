export interface WakaEditors{
  id: string;
  name: string;
  released: boolean;
  repository: string;
  version: string;
  website: string
}

export interface WakaReplyJson{
  data: any;
  total: number;
  total_pages: number;
}
