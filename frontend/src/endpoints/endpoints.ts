import type { cId, CreateGameDto, CreateUserDto, GameDetailsDto, UpdateGameDto, UpdateUserDto, UserDetailsDto } from "@/interfaces/interfaces";
import api from "@/tools/api";
import useSWR, { mutate } from "swr";

const fetcher = (url: string) => api.get(url).then((res) => res.data);


// ----------gameEndp---------------

export function getGames() {
  const { data, error, isLoading, mutate } = useSWR("/games", fetcher);

  return {
    games: data,
    isLoading,
    isError: error,
    mutate // force-refresh the data
  };
}

export function getGame(id: cId) {
  const { data, error, isLoading } = useSWR<GameDetailsDto>(
    id ? `/games/${id}` : null, 
    fetcher
  );

  return { 
    game: data, 
    isLoading, 
    isError: error 
  };
}

export async function addGame(newGameData: CreateGameDto) {
  const response = await api.post("/games", newGameData);
  
  mutate("/games"); 
  
  return response.data;
}

export async function updateGame(id: number, updateGameData: UpdateGameDto) {
  const response = await api.put(`/games/${id}`, updateGameData);
  
  mutate("/games"); 
  mutate(`/games/${id}`); 
  
  return response.data;
}

export async function deleteGame(id: number) {
  await api.delete(`/games/${id}`);
  
  mutate("/games");
}

// ----------adminEndp---------------

export function getUsers() {
  const { data, error, isLoading, mutate } = useSWR("/admin", fetcher);

  return {
    games: data,
    isLoading,
    isError: error,
    mutate // force-refresh the data
  };
}

export function getUser(id: cId) {
  const { data, error, isLoading } = useSWR<UserDetailsDto>(
    id ? `/admin/${id}` : null, 
    fetcher
  );

  return { 
    game: data, 
    isLoading, 
    isError: error 
  };
}

export async function addUser(newUserData: CreateUserDto) {
  const response = await api.post("/admin", newUserData);
  
  mutate("/admin");  
  
  return response.data;
}

export async function updateUser(id: number, updateUserData: UpdateUserDto) {
  const response = await api.put(`/admin/${id}`, updateUserData);
  
  mutate("/admin");
  mutate(`/admin/${id}`); 
  
  return response.data;
}

export async function deleteUser(id: number) {
  await api.delete(`/admin/${id}`);
  
  mutate("/admin");
}

// ----------authEndp---------------

export function authUser() {
  const { data, error, isLoading } = useSWR("/auth/google", fetcher);
  return { user: data, isLoading, isError: error };
}