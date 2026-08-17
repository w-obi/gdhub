export interface RouterContext {
}

export type gamePics = {
  Name: string;
  Pic: string;
}

export interface gameSummary {
  Name: string;
  Pic: string;
  Rating: number;
  Summary: string;
}

export type AuthSearch = {
  redirect?: string;
};