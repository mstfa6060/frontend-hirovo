import { IAMAPI } from "../api/base_modules/iam";
import { HirovoAPI } from "../api/business_modules/hirovo";

export interface CompanyProfile {
    // Company data (from IAMAPI.Companies.Detail)
    companyId: string;
    companyName: string;
    taxNumber: string;
    address: string;
    companyPhone: string;

    // Employer data (from HirovoAPI.Employers.Detail) - optional
    employerId?: string;
    employerEmail?: string;
    employerPhone?: string;
    city?: string;
    district?: string;
    description?: string;
}

export class CompanyService {
    /**
     * Get full company profile combining company and employer data.
     * Fetches IAMAPI.Companies.Detail and optionally HirovoAPI.Employers.Detail,
     * then merges them into a single CompanyProfile object.
     */
    static async getCompanyProfile(companyId: string, employerId?: string): Promise<CompanyProfile> {
        // Fetch company details from IAM
        const company = await IAMAPI.Companies.Detail.Request({ id: companyId });

        // Optionally fetch employer details from Hirovo
        let employerData: HirovoAPI.Employers.Detail.IResponseModel | null = null;
        if (employerId) {
            try {
                employerData = await HirovoAPI.Employers.Detail.Request({ userId: employerId });
            } catch {
                // Employer data is non-critical; silently ignore errors
            }
        }

        return {
            companyId: company.id,
            companyName: company.name,
            taxNumber: company.taxNumber,
            address: company.address,
            companyPhone: company.phone,
            ...(employerData ? {
                employerId: employerData.id,
                employerEmail: employerData.email,
                employerPhone: employerData.phoneNumber,
                city: employerData.city,
                district: employerData.district,
                description: employerData.description,
            } : {}),
        };
    }

    /**
     * Update company details via IAMAPI.Companies.Update.
     */
    static async updateCompany(data: IAMAPI.Companies.Update.IRequestModel): Promise<{ id: string }> {
        return IAMAPI.Companies.Update.Request(data);
    }

    /**
     * Update employer profile details via HirovoAPI.Employers.UpdateProfile.
     */
    static async updateEmployerProfile(data: HirovoAPI.Employers.UpdateProfile.IRequestModel): Promise<{ id: string }> {
        return HirovoAPI.Employers.UpdateProfile.Request(data);
    }
}
