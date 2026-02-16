import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type {
  JobListItem,
  ApplicationListItem,
  EmployerDetail,
  EmployerStats,
  EmployerJobListItem,
  UpdateJobRequest,
  XSorting,
  XFilterItem,
  XPageRequest,
} from "../types";
import { XSortingDirection, ApplicationStatus } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

// Get employer's own jobs
export async function getEmployerJobs(params?: {
  page?: number;
  perPage?: number;
  filters?: XFilterItem[];
}): Promise<JobListItem[]> {
  const pageRequest: XPageRequest = {
    currentPage: params?.page || 1,
    perPageCount: params?.perPage || 20,
    listAll: false,
  };

  const sorting: XSorting = {
    key: "CreatedAt",
    direction: XSortingDirection.Descending,
  };

  return apiCall<JobListItem[]>(
    apiClient.post(`${HIROVO}/Jobs/EmployerJobs`, {
      sorting,
      filters: params?.filters || [],
      pageRequest,
    })
  );
}

// Get applications for a specific job
export async function getJobApplications(params: {
  jobId: string;
  page?: number;
  perPage?: number;
}): Promise<ApplicationListItem[]> {
  const pageRequest: XPageRequest = {
    currentPage: params.page || 1,
    perPageCount: params.perPage || 20,
    listAll: false,
  };

  const sorting: XSorting = {
    key: "CreatedAt",
    direction: XSortingDirection.Descending,
  };

  return apiCall<ApplicationListItem[]>(
    apiClient.post(`${HIROVO}/JobApplications/JobApplications`, {
      jobId: params.jobId,
      sorting,
      filters: [],
      pageRequest,
    })
  );
}

// Get all applications for employer (across all jobs)
export async function getAllEmployerApplications(params?: {
  page?: number;
  perPage?: number;
}): Promise<ApplicationListItem[]> {
  const pageRequest: XPageRequest = {
    currentPage: params?.page || 1,
    perPageCount: params?.perPage || 20,
    listAll: false,
  };

  const sorting: XSorting = {
    key: "CreatedAt",
    direction: XSortingDirection.Descending,
  };

  return apiCall<ApplicationListItem[]>(
    apiClient.post(`${HIROVO}/JobApplications/EmployerApplications`, {
      sorting,
      filters: [],
      pageRequest,
    })
  );
}

// Update application status (accept/reject)
export async function updateApplicationStatus(params: {
  jobApplicationId: string;
  status: ApplicationStatus;
}): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/JobApplications/UpdateStatus`, params)
  );
}

// Get employer profile
export async function getEmployerDetail(userId: string): Promise<EmployerDetail> {
  return apiCall<EmployerDetail>(
    apiClient.post(`${HIROVO}/Employers/Detail`, { userId })
  );
}

// Update employer profile
export async function updateEmployerProfile(params: {
  userId: string;
  description: string;
  phoneNumber: string;
  city: string;
  district: string;
}): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Employers/UpdateProfile`, params)
  );
}

// Update an existing job
export async function updateJob(params: UpdateJobRequest): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Jobs/Update`, {
      ...params,
      companyId: API_CONFIG.COMPANY_ID,
    })
  );
}

// Close a job listing
export async function closeJob(jobId: string): Promise<{ id: string }> {
  return apiCall<{ id: string }>(
    apiClient.post(`${HIROVO}/Jobs/Close`, { jobId })
  );
}

// Employer dashboard stats
export async function getEmployerStats(): Promise<EmployerStats> {
  return apiCall<EmployerStats>(
    apiClient.post(`${HIROVO}/Dashboards/EmployerStats`, {})
  );
}
