import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";
import type { SkillModel, WorkerSkill } from "../types";
import { XSortingDirection } from "../types";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getAllSkills(languageCode: string): Promise<SkillModel[]> {
  return apiCall<SkillModel[]>(
    apiClient.post(`${HIROVO}/Skills/All`, {
      languageCode,
      sorting: { key: "Name", direction: XSortingDirection.Ascending },
      filters: [],
      pageRequest: { currentPage: 1, perPageCount: 200, listAll: true },
    })
  );
}

export async function addWorkerSkill(skillId: string): Promise<WorkerSkill> {
  return apiCall<WorkerSkill>(
    apiClient.post(`${HIROVO}/WorkerSkills/AddSkill`, { skillId })
  );
}

export async function removeWorkerSkill(skillId: string): Promise<{ userId: string; skillId: string }> {
  return apiCall<{ userId: string; skillId: string }>(
    apiClient.post(`${HIROVO}/WorkerSkills/RemoveSkill`, { skillId })
  );
}

export async function getWorkerSkills(userId: string): Promise<WorkerSkill[]> {
  return apiCall<WorkerSkill[]>(
    apiClient.post(`${HIROVO}/WorkerSkills/GetWorkerSkills`, { userId })
  );
}
