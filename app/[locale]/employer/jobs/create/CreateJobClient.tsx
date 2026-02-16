"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { jobsApi, skillsApi } from "@/lib/api";
import type { SkillModel } from "@/lib/api/types";
import { HirovoJobType } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Spinner from "@/app/components/ui/Spinner";

export default function CreateJobClient({ locale }: { locale: string }) {
  const t = useTranslations("employer");
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [selectedType, setSelectedType] = useState(String(HirovoJobType.FullTime));
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [allSkills, setAllSkills] = useState<SkillModel[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSkills() {
      try {
        const skills = await skillsApi.getAllSkills(locale);
        setAllSkills(skills || []);
      } catch {
        setAllSkills([]);
      } finally {
        setLoadingSkills(false);
      }
    }
    fetchSkills();
  }, [locale]);

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skillId)
        ? prev.filter((id) => id !== skillId)
        : [...prev, skillId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSubmitting(true);
    setError("");

    try {
      await jobsApi.createJob({
        title,
        description,
        salary: Number(salary),
        type: Number(selectedType),
        employerId: user.id,
        latitude: 0,
        longitude: 0,
        notifyRadiusKm: 50,
        skillIds: selectedSkills,
      });
      router.push("/employer/jobs");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("jobForm.error"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-1">
      <div className="max-w-[700px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("jobForm.title")}</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t("jobForm.jobTitle")}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder={t("jobForm.jobTitlePlaceholder")}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                {t("jobForm.description")}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                placeholder={t("jobForm.descriptionPlaceholder")}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition resize-none"
              />
            </div>

            {/* Salary + Job Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {t("jobForm.salary")}
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  required
                  min={0}
                  placeholder={t("jobForm.salaryPlaceholder")}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">
                  {t("jobForm.jobType")}
                </label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                >
                  <option value={String(HirovoJobType.FullTime)}>
                    {t("jobForm.fullTime")}
                  </option>
                  <option value={String(HirovoJobType.PartTime)}>
                    {t("jobForm.partTime")}
                  </option>
                  <option value={String(HirovoJobType.Freelance)}>
                    {t("jobForm.freelance")}
                  </option>
                </select>
              </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                {t("jobForm.skills")}
              </label>
              {loadingSkills ? (
                <Spinner className="py-4" />
              ) : allSkills.length === 0 ? (
                <p className="text-sm text-muted">-</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill) => {
                    const isSelected = selectedSkills.includes(skill.id);
                    return (
                      <button
                        key={skill.id}
                        type="button"
                        onClick={() => toggleSkill(skill.id)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          isSelected
                            ? "bg-hirovo-blue text-white"
                            : "bg-gray-100 text-muted hover:bg-gray-200"
                        }`}
                      >
                        {skill.name}
                        {isSelected && (
                          <span className="ml-1.5">&times;</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover hover:-translate-y-0.5 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? t("jobForm.submitting") : t("jobForm.submit")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
