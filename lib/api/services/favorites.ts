import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type { FavoriteItem } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function addFavorite(jobId: string): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Favorites/Create`, { jobId })
  );
}

export async function removeFavorite(favoriteId: string): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Favorites/Delete`, { id: favoriteId })
  );
}

export async function getAllFavorites(): Promise<FavoriteItem[]> {
  return apiCall<FavoriteItem[]>(
    apiClient.post(`${HIROVO}/Favorites/All`, {})
  );
}

export async function checkFavorite(jobId: string): Promise<{ isFavorite: boolean; favoriteId?: string }> {
  return apiCall<{ isFavorite: boolean; favoriteId?: string }>(
    apiClient.post(`${HIROVO}/Favorites/Check`, { jobId })
  );
}
