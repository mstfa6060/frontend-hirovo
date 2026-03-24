import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";

const HIROVO = API_CONFIG.HIROVO_URL;

export async function getConversations(page?: number): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/Messagings/GetConversations`, {
      sorting: {
        key: "LastMessageAt",
        direction: 1,
      },
      filters: [],
      pageRequest: {
        currentPage: page || 1,
        perPageCount: 20,
        listAll: false,
      },
    })
  );
}

export async function getMessages(
  conversationId: string,
  page?: number
): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/Messagings/GetMessages`, {
      conversationId,
      pageRequest: {
        currentPage: page || 1,
        perPageCount: 50,
        listAll: false,
      },
    })
  );
}

export async function sendMessage(params: {
  conversationId?: string;
  recipientUserId?: string;
  content: string;
}): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/Messagings/SendMessage`, {
      conversationId: params.conversationId || null,
      recipientUserId: params.recipientUserId || null,
      content: params.content,
      messageType: 0,
      mediaUrl: null,
      mediaFileName: null,
      mediaFileSize: null,
    })
  );
}

export async function markAsRead(conversationId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/Messagings/MarkAsRead`, { conversationId })
  );
}

export async function getUnreadCount(): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/Messagings/GetUnreadCount`, {})
  );
}

export async function deleteMessage(messageId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/Messagings/DeleteMessage`, { messageId })
  );
}
