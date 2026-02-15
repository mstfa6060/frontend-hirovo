import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type {
  JobListItem,
  JobDetail,
  XSorting,
  XFilterItem,
  XPageRequest,
} from "../types";
import { XSortingDirection } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getAllJobs(params: {
  languageCode: string;
  searchTerm?: string;
  page?: number;
  perPage?: number;
  filters?: XFilterItem[];
}): Promise<JobListItem[]> {
  const pageRequest: XPageRequest = {
    currentPage: params.page || 1,
    perPageCount: params.perPage || 12,
    listAll: false,
  };

  const sorting: XSorting = {
    key: "CreatedAt",
    direction: XSortingDirection.Descending,
  };

  return apiCall<JobListItem[]>(
    apiClient.post(`${HIROVO}/Jobs/All`, {
      languageCode: params.languageCode,
      searchTerm: params.searchTerm || "",
      sorting,
      filters: params.filters || [],
      pageRequest,
    })
  );
}

export async function getJobDetail(jobId: string, languageCode: string): Promise<JobDetail> {
  return apiCall<JobDetail>(
    apiClient.post(`${HIROVO}/Jobs/Detail`, { jobId, languageCode })
  );
}

export async function createJob(params: {
  title: string;
  description: string;
  salary: number;
  type: number;
  employerId: string;
  latitude: number;
  longitude: number;
  notifyRadiusKm: number;
  skillIds: string[];
}): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Jobs/Create`, {
      ...params,
      companyId: API_CONFIG.COMPANY_ID,
    })
  );
}
