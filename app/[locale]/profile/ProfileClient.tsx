"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { workersApi, skillsApi, authApi } from "@/lib/api";
import type { WorkerDetail, SkillModel, WorkerSkill } from "@/lib/api/types";
import { useAuth } from "@/lib/auth/AuthContext";
import Spinner from "@/app/components/ui/Spinner";
import Badge from "@/app/components/ui/Badge";

export default function ProfileClient({ locale }: { locale: string }) {
  const t = useTranslations("profile");
  const { user } = useAuth();

  const [worker, setWorker] = useState<WorkerDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Profile form
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");

  // Skills
  const [workerSkills, setWorkerSkills] = useState<WorkerSkill[]>([]);
  const [allSkills, setAllSkills] = useState<SkillModel[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");

  // Password
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    async function fetch() {
      if (!user) return;
      try {
        const [workerData, skills, allSkillsData] = await Promise.all([
          workersApi.getWorkerDetail(user.id).catch(() => null),
          skillsApi.getWorkerSkills(user.id).catch(() => []),
          skillsApi.getAllSkills(locale).catch(() => []),
        ]);

        if (workerData) {
          setWorker(workerData);
          setDescription(workerData.description || "");
          setPhone(workerData.phoneNumber || "");
          setCity(workerData.city || "");
          setDistrict(workerData.district || "");
        }
        setWorkerSkills(skills || []);
        setAllSkills(allSkillsData || []);
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [user, locale]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !worker) return;
    setSaving(true);
    setMessage(null);

    try {
      await workersApi.updateWorkerProfile({
        userId: user.id,
        description,
        bucketId: worker.bucketId || "",
        phoneNumber: phone,
        birthDate: worker.birthDate || "",
        city,
        district,
        isAvailable: worker.isAvailable,
      });
      setMessage({ type: "success", text: t("saveSuccess") });
    } catch {
      setMessage({ type: "error", text: t("saveError") });
    } finally {
      setSaving(false);
    }
  };

  const handleAddSkill = async () => {
    if (!selectedSkill) return;
    try {
      const result = await skillsApi.addWorkerSkill(selectedSkill);
      setWorkerSkills((prev) => [...prev, result]);
      setSelectedSkill("");
    } catch {
      // ignore
    }
  };

  const handleRemoveSkill = async (skillId: string) => {
    try {
      await skillsApi.removeWorkerSkill(skillId);
      setWorkerSkills((prev) => prev.filter((s) => s.skillId !== skillId));
    } catch {
      // ignore
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (passwordForm.newPass !== passwordForm.confirm) {
      setMessage({ type: "error", text: t("confirmPassword") });
      return;
    }
    setChangingPassword(true);
    setMessage(null);

    try {
      await authApi.updatePassword(user.id, passwordForm.current, passwordForm.newPass);
      setPasswordForm({ current: "", newPass: "", confirm: "" });
      setMessage({ type: "success", text: t("passwordChanged") });
    } catch {
      setMessage({ type: "error", text: t("passwordChangeError") });
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) return <Spinner className="py-32" />;

  const availableSkills = allSkills.filter(
    (s) => !workerSkills.some((ws) => ws.skillId === s.id)
  );

  return (
    <main className="flex-1">
      <div className="max-w-[700px] mx-auto px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-white/70">{t("subtitle")}</p>
        </div>

        {message && (
          <div
            className={`px-4 py-3 rounded-lg mb-4 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Profile Form */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="text-lg font-bold text-text mb-4">{t("personalInfo")}</h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-text mb-1">{t("city")}</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">{t("district")}</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">{t("phone")}</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text mb-1">{t("description")}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder={t("descriptionPlaceholder")}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all disabled:opacity-50"
            >
              {saving ? t("saving") : t("save")}
            </button>
          </form>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-2xl shadow-card p-6 mb-6">
          <h2 className="text-lg font-bold text-text mb-4">{t("skills")}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {workerSkills.map((ws) => (
              <Badge key={ws.skillId} variant="primary">
                {ws.skillName}
                <button
                  onClick={() => handleRemoveSkill(ws.skillId)}
                  className="ml-1.5 hover:text-red-500"
                >
                  x
                </button>
              </Badge>
            ))}
            {workerSkills.length === 0 && (
              <p className="text-sm text-muted">-</p>
            )}
          </div>

          {availableSkills.length > 0 && (
            <div className="flex gap-2">
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-white text-text text-sm outline-none"
              >
                <option value="">{t("addSkill")}</option>
                {availableSkills.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleAddSkill}
                disabled={!selectedSkill}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white btn-gradient disabled:opacity-50"
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-2xl shadow-card p-6">
          <h2 className="text-lg font-bold text-text mb-4">{t("changePassword")}</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text mb-1">{t("currentPassword")}</label>
              <input
                type="password"
                value={passwordForm.current}
                onChange={(e) => setPasswordForm((p) => ({ ...p, current: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">{t("newPassword")}</label>
              <input
                type="password"
                value={passwordForm.newPass}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPass: e.target.value }))}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1">{t("confirmPassword")}</label>
              <input
                type="password"
                value={passwordForm.confirm}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirm: e.target.value }))}
                required
                minLength={8}
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text focus:ring-2 focus:ring-hirovo-blue focus:border-transparent outline-none transition"
              />
            </div>
            <button
              type="submit"
              disabled={changingPassword}
              className="px-6 py-3 rounded-lg font-semibold text-white btn-gradient shadow-btn hover:shadow-btn-hover transition-all disabled:opacity-50"
            >
              {changingPassword ? t("saving") : t("changePassword")}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
