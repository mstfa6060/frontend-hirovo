import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type { AppliedJob } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function createApplication(params: {
  jobId: string;
  workerId: string;
}): Promise<{ jobApplicationId: string }> {
  return apiCall<{ jobApplicationId: string }>(
    apiClient.post(`${HIROVO}/JobApplications/Create`, {
      ...params,
      companyId: API_CONFIG.COMPANY_ID,
    })
  );
}

export async function getAppliedJobs(workerId: string): Promise<AppliedJob[]> {
  return apiCall<AppliedJob[]>(
    apiClient.post(`${HIROVO}/JobApplications/AppliedJobs`, { workerId })
  );
}

export async function getApplicationDetail(jobApplicationId: string) {
  return apiCall(
    apiClient.post(`${HIROVO}/JobApplications/Detail`, { jobApplicationId })
  );
}

export async function cancelApplication(jobApplicationId: string) {
  return apiCall(
    apiClient.post(`${HIROVO}/JobApplications/Delete`, { jobApplicationId })
  );
}
