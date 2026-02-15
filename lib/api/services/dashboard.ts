import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type { WorkerStats, EmployerStats } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getWorkerStats(): Promise<WorkerStats> {
  return apiCall<WorkerStats>(
    apiClient.post(`${HIROVO}/Dashboards/WorkerStats`, {})
  );
}

export async function getEmployerStats(): Promise<EmployerStats> {
  return apiCall<EmployerStats>(
    apiClient.post(`${HIROVO}/Dashboards/EmployerStats`, {})
  );
}
