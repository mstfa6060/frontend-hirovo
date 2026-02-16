export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.hirovo.com",
  WP_URL: process.env.NEXT_PUBLIC_WP_URL || "https://cms.hirovo.com/wp-json",
  COMPANY_ID: process.env.NEXT_PUBLIC_COMPANY_ID || "c9d8c846-10fc-466d-8f45-a4fa4e856abd",
  get HIROVO_URL() {
    return `${this.BASE_URL}/hirovo`;
  },
  get IAM_URL() {
    return `${this.BASE_URL}/iam`;
  },
  get FILE_PROVIDER_URL() {
    return `${this.BASE_URL}/fileprovider`;
  },
};
