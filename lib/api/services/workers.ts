import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type { WorkerDetail, WorkerListItem, XSorting, XFilterItem, XPageRequest } from "../types";
import { XSortingDirection } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getWorkerDetail(userId: string): Promise<WorkerDetail> {
  return apiCall<WorkerDetail>(
    apiClient.post(`${HIROVO}/Workers/Detail`, { userId })
  );
}

export async function getAllWorkers(params?: {
  page?: number;
  perPage?: number;
  filters?: XFilterItem[];
}): Promise<WorkerListItem[]> {
  const pageRequest: XPageRequest = {
    currentPage: params?.page || 1,
    perPageCount: params?.perPage || 20,
    listAll: false,
  };

  const sorting: XSorting = {
    key: "CreatedAt",
    direction: XSortingDirection.Descending,
  };

  return apiCall<WorkerListItem[]>(
    apiClient.post(`${HIROVO}/Workers/All`, {
      sorting,
      filters: params?.filters || [],
      pageRequest,
    })
  );
}

export async function updateWorkerProfile(params: {
  userId: string;
  description: string;
  bucketId: string;
  phoneNumber: string;
  birthDate: string;
  city: string;
  district: string;
  isAvailable?: boolean;
}): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Workers/UpdateProfile`, params)
  );
}
