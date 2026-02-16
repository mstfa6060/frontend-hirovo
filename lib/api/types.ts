// Common API types matching the backend ArfBlocks framework

export interface ApiResponse<T> {
  hasError: boolean;
  error?: {
    code: string;
    message: string;
  };
  payload: T;
}

export interface XPageRequest {
  currentPage: number;
  perPageCount: number;
  listAll: boolean;
}

export enum XSortingDirection {
  Ascending = 0,
  Descending = 1,
}

export interface XSorting {
  key: string;
  direction: XSortingDirection;
}

export interface XFilterItem {
  key: string;
  type: string;
  isUsed: boolean;
  values: unknown[];
  min: unknown;
  max: unknown;
  conditionType: string;
}

// Hirovo enums
export enum HirovoJobType {
  FullTime = 0,
  PartTime = 1,
  Freelance = 2,
}

export enum HirovoJobStatus {
  Active = 0,
  Closed = 1,
  Filled = 2,
}

export enum ApplicationStatus {
  Pending = 0,
  Accepted = 1,
  Rejected = 2,
  Cancelled = 3,
}

export enum ReviewerType {
  Employer = 0,
  Worker = 1,
}

export enum ClientPlatforms {
  Web = 0,
  Mobile = 1,
  Service = 2,
  Unknown = 3,
}

export enum UserSources {
  Manual = 0,
  Google = 1,
  Apple = 2,
  Unknown = 3,
}

// Auth types
export interface LoginRequest {
  provider: string;
  userName: string;
  password: string;
  token: string;
  platform: ClientPlatforms;
  isCompanyHolding: boolean;
  companyId: string;
  firstName: string;
  surname: string;
  phoneNumber: string;
  birthDate?: string;
  externalProviderUserId: string;
}

export interface LoginResponse {
  jwt: string;
  refreshToken: string;
  sessionExpirationDate: string;
  user: {
    id: string;
    username: string;
    displayName: string;
    email: string;
    companyId: string;
    isCompanyHolding: boolean;
    companyName: string;
    isPhoneVerified: boolean;
  };
}

export interface RegisterRequest {
  userName: string;
  firstName: string;
  surname: string;
  email: string;
  password: string;
  providerId: string;
  companyId: string;
  userSource: UserSources;
  description: string;
  phoneNumber: string;
}

export interface RegisterResponse {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  surname: string;
  isActive: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
  platform: ClientPlatforms;
}

export interface RefreshTokenResponse {
  jwt: string;
  sessionExpirationDate: string;
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
  companyId: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// Job types
export interface JobListItem {
  id: string;
  title: string;
  salary: number;
  endDate: string;
  type: HirovoJobType;
  status: HirovoJobStatus;
  hirovoEmployer_Id: string;
  application: number;
  skills: SkillModel[];
}

export interface JobDetail {
  id: string;
  title: string;
  description: string;
  salary: number;
  type: HirovoJobType;
  status: HirovoJobStatus;
  employerId: string;
  employerDisplayName: string;
  latitude: number;
  longitude: number;
  notifyRadiusKm: number;
  endDate: string;
  skills: SkillModel[];
}

export interface SkillModel {
  id: string;
  name: string;
}

// Application types
export interface ApplicationListItem {
  id: string;
  jobId: string;
  workerId: string;
  status: ApplicationStatus;
  appliedAt: string;
  endDate: string;
  jobTitle: string;
  phoneNumber: string;
  birthDate?: string;
  city: string;
  district: string;
  isAvailable?: boolean;
  displayName: string;
  description: string;
  bucketId: string;
}

export interface AppliedJob {
  jobId: string;
  title: string;
  description: string;
  salary: number;
  type: HirovoJobType;
  status: HirovoJobStatus;
  appliedAt: string;
  endDate: string;
  applicationStatus: ApplicationStatus;
}

// Worker types
export interface WorkerDetail {
  id: string;
  description: string;
  phoneNumber: string;
  birthDate?: string;
  city: string;
  district: string;
  isAvailable: boolean;
  fullName: string;
  bucketId: string;
  coverPictureUrl: string;
}

export interface WorkerListItem {
  id: string;
  phoneNumber: string;
  birthDate?: string;
  city: string;
  district: string;
  isAvailable?: boolean;
  displayName: string;
  description: string;
  bucketId: string;
}

// Employer types
export interface EmployerDetail {
  id: string;
  email: string;
  phoneNumber: string;
  city: string;
  district: string;
  description: string;
  birthDate: string;
  isAvailable: boolean;
  bucketId: string;
}

export interface EmployerJobListItem {
  id: string;
  title: string;
  salary: number;
  endDate: string;
  type: HirovoJobType;
  status: HirovoJobStatus;
  application: number;
  createdAt: string;
}

export interface UpdateJobRequest {
  jobId: string;
  title: string;
  description: string;
  salary: number;
  type: HirovoJobType;
  latitude: number;
  longitude: number;
  notifyRadiusKm: number;
  skillIds: string[];
}

export interface UpdateApplicationStatusRequest {
  jobApplicationId: string;
  status: ApplicationStatus;
}

// Favorites
export interface FavoriteItem {
  id: string;
  jobId: string;
  jobTitle: string;
  jobSalary: number;
  jobType: HirovoJobType;
  jobStatus: HirovoJobStatus;
  jobEndDate: string;
  createdAt: string;
}

// Skills
export interface WorkerSkill {
  userId: string;
  skillId: string;
  skillName: string;
  createdAt: string;
}

// Dashboard
export interface WorkerStats {
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  cancelledApplications: number;
  averageRating: number;
  totalReviews: number;
}

export interface EmployerStats {
  totalJobsPosted: number;
  activeJobs: number;
  closedJobs: number;
  filledJobs: number;
  totalApplicationsReceived: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
  averageRating: number;
  totalReviews: number;
}

// User detail
export interface UserDetail {
  userId: string;
  userName: string;
  email: string;
  fullName: string;
  language: string;
  isActive: boolean;
  isAvailable: boolean;
  phoneNumber: string;
  birthDate?: string;
  city: string;
  district: string;
  isPhoneVerified: boolean;
  companyName: string;
}
