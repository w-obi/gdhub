export interface RouterContext {
}

export type gamePics = {
  Name: string;
  Pic: string;
}

export type AuthSearch = {
  redirect?: string;
};

export type cId = {
  id: number | string | undefined;
}

export interface CreateUserDto {
  Email: string;
  Rank: string;
  Exp: number;
  GameRecords: Record<string, number>;
  Role: string;
}

export interface UpdateUserDto {
  Email: string;
  Rank: string;
  Exp: number;
  GameRecords: Record<string, number>;
  Role: string;
}

export interface UserDetailsDto {
  Id: number;
  Email: string;
  Rank: string;
  Exp: number;
  GameRecords: Record<string, number>;
  Role: string;
}

export interface UserSummaryDto {
  Id: number;
  Email: string;
  Rank: string;
  Exp: number;
  Role: string;
}

export interface CreateGameDto {
  Name: string;
  Owner: string;
  Rating: number;
  PicUrl: string;
  Summary: string;
  Details: string;
}

export interface UpdateGameDto {
  Name: string;
  Owner: string;
  Rating: number;
  PicUrl: string;
  Summary: string;
  Details: string;
}

export interface GameDetailsDto {
  Id: number;
  Name: string;
  Owner: string;
  Rating: number;
  PicUrl: string;
  Details: string;
}

export interface GameSummaryDto {
  Id: number;
  Name: string;
  Owner: string;
  Rating: number;
  PicUrl: string;
  Summary: string;
}