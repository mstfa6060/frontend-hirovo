import apiClient, { apiCall } from "../client";
import { API_CONFIG } from "../config";

const HIROVO = API_CONFIG.HIROVO_URL;

// ── Social Posts ──

export async function getFeed(page?: number): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialPosts/Feed`, {
      pageRequest: {
        currentPage: page || 1,
        perPageCount: 20,
        listAll: false,
      },
    })
  );
}

export async function getTrending(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialPosts/Trending`, {})
  );
}

export async function getPopular(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialPosts/Popular`, {})
  );
}

export async function getPostDetail(id: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Detail`, { id })
  );
}

export async function createPost(content: string, imageUrls?: string[]): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Create`, {
      content,
      imageUrls: imageUrls || [],
    })
  );
}

export async function deletePost(id: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Delete`, { id })
  );
}

export async function likePost(postId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Like`, { postId })
  );
}

export async function unlikePost(postId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Unlike`, { postId })
  );
}

export async function commentOnPost(postId: string, content: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Comment`, { postId, content })
  );
}

export async function repostPost(originalPostId: string, content?: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialPosts/Repost`, { originalPostId, content })
  );
}

export async function getUserPosts(userId: string): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialPosts/UserPosts`, { userId })
  );
}

// ── User Follow ──

export async function followUser(followedUserId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserFollows/Follow`, { followedUserId })
  );
}

export async function unfollowUser(followedUserId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserFollows/Unfollow`, { followedUserId })
  );
}

export async function getFollowers(userId: string): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserFollows/Followers`, { userId })
  );
}

export async function getFollowing(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserFollows/Following`, {})
  );
}

export async function isFollowing(userId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserFollows/IsFollowing`, { userId })
  );
}

export async function getFollowCounts(userId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/UserFollows/Counts`, { userId })
  );
}

// ── User Search ──

export async function searchUsers(query: string, page?: number): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserSearchs/Search`, {
      searchTerm: query,
      pageRequest: {
        currentPage: page || 1,
        perPageCount: 20,
        listAll: false,
      },
    })
  );
}

// ── User Discovery ──

export async function getSimilarSkills(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserDiscoverys/SimilarSkills`, {})
  );
}

export async function getSuggestedFollows(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/UserDiscoverys/SuggestedFollows`, {})
  );
}

// ── Groups ──

export async function getAllGroups(searchTerm?: string): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialGroups/All`, {
      searchTerm: searchTerm || "",
    })
  );
}

export async function getMyGroups(): Promise<any[]> {
  return apiCall<any[]>(
    apiClient.post(`${HIROVO}/SocialGroups/MyGroups`, {})
  );
}

export async function getGroupDetail(id: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialGroups/Detail`, { id })
  );
}

export async function joinGroup(groupId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialGroups/Join`, { groupId })
  );
}

export async function leaveGroup(groupId: string): Promise<any> {
  return apiCall<any>(
    apiClient.post(`${HIROVO}/SocialGroups/Leave`, { groupId })
  );
}
