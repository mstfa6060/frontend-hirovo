import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getAllNotifications(page?: number): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserNotifications/All`, {
      page: page || 1,
      pageSize: 20,
    })
  );
}

export async function getUnreadCount(): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserNotifications/UnreadCount`, {})
  );
}

export async function markAsRead(notificationId?: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserNotifications/MarkAsRead`, {
      notificationId: notificationId || null,
    })
  );
}
