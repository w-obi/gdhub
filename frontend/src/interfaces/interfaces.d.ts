interface RouterContext {
}

interface gamePics {
  Name: string;
  Pic: string;
}

interface gameSummary {
  Name: string;
  Pic: string;
  Rating: number;
  Summary: string;
}

export type AuthSearch = {
  redirect?: string;
};