export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://api.hirovo.com",
  STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
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
