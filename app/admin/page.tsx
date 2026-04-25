"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { cvData } from "@/lib/data";
import ProjectsEditor from "@/components/admin/ProjectsEditor";
import SkillsEditor from "@/components/admin/SkillsEditor";
import ExperienceEditor from "@/components/admin/ExperienceEditor";
import VisitorTracker from "@/components/VisitorTracker";
import QuickStats from "@/components/admin/QuickStats";

export default function AdminPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      // Redirect akan dilakukan otomatis oleh middleware
    },
  });
  const router = useRouter();
  const [data, setData] = useState(cvData);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("personal");

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/cv-data");
      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jangan render apapun jika belum authenticated
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-[#00FFB2]">Loading...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-[#00FFB2]">Loading data...</div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/save-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("✅ Data berhasil disimpan!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ Gagal menyimpan data!");
      }
    } catch (error) {
      setMessage("❌ Terjadi kesalahan!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <VisitorTracker isAdmin={true} />
      {/* Header */}
      <div className="bg-[#111118] border-b border-[#1E1E2E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-[#E8E8F0]">
            Admin <span className="text-[#00FFB2]">Dashboard</span>
          </h1>
          <div className="flex items-center gap-4">
            <a
              href="/admin/analytics"
              className="px-4 py-2 bg-[#00FFB2]/10 text-[#00FFB2] border border-[#00FFB2]/30 rounded-lg text-sm hover:bg-[#00FFB2]/20 transition-colors"
            >
              📊 Analytics
            </a>
            <a
              href="/"
              target="_blank"
              className="text-sm text-[#8888AA] hover:text-[#00FFB2] transition-colors"
            >
              Lihat Portfolio →
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg text-sm hover:bg-red-500/20 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <QuickStats />

        {/* Save Button & Message */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-3 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "💾 Simpan Perubahan"}
            </button>
            {message && (
              <div className="px-4 py-3 bg-[#111118] border border-[#1E1E2E] rounded-lg text-[#E8E8F0]">
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: "personal", label: "📝 Data Personal" },
            { id: "experience", label: "💼 Pengalaman" },
            { id: "projects", label: "🚀 Proyek" },
            { id: "skills", label: "⚡ Skills" },
            { id: "education", label: "🎓 Pendidikan" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#00FFB2] text-[#0A0A0F]"
                  : "bg-[#111118] text-[#8888AA] border border-[#1E1E2E] hover:text-[#E8E8F0]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
          {activeTab === "personal" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#E8E8F0] mb-4">Data Personal</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Nama</label>
                <input
                  type="text"
                  value={data.name}
                  onChange={(e) => setData({ ...data, name: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Title</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={(e) => setData({ ...data, title: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Tagline</label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => setData({ ...data, tagline: e.target.value })}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">About</label>
                <textarea
                  value={data.about}
                  onChange={(e) => setData({ ...data, about: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Phone</label>
                  <input
                    type="text"
                    value={data.contact.phone}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, phone: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Email</label>
                  <input
                    type="email"
                    value={data.contact.email}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, email: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Lokasi</label>
                  <input
                    type="text"
                    value={data.contact.location}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, location: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                    placeholder="Contoh: Padang Barat, Kota Padang"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">LinkedIn</label>
                  <input
                    type="text"
                    value={data.contact.linkedin}
                    onChange={(e) => setData({ ...data, contact: { ...data.contact, linkedin: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                    placeholder="linkedin.com/in/username"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "experience" && (
            <ExperienceEditor 
              experience={data.experience || []}
              onChange={(experience) => setData({ ...data, experience })}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsEditor 
              projects={data.projects || []}
              onChange={(projects) => setData({ ...data, projects })}
            />
          )}

          {activeTab === "skills" && (
            <SkillsEditor 
              skills={data.skills || []}
              onChange={(skills) => setData({ ...data, skills })}
            />
          )}

          {activeTab === "education" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-[#E8E8F0] mb-4">Pendidikan</h2>
              
              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Gelar</label>
                <input
                  type="text"
                  value={data.education.degree}
                  onChange={(e) => setData({ ...data, education: { ...data.education, degree: e.target.value } })}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Institusi</label>
                <input
                  type="text"
                  value={data.education.institution}
                  onChange={(e) => setData({ ...data, education: { ...data.education, institution: e.target.value } })}
                  className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">Periode</label>
                  <input
                    type="text"
                    value={data.education.period}
                    onChange={(e) => setData({ ...data, education: { ...data.education, period: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E8E8F0] mb-2">IPK</label>
                  <input
                    type="text"
                    value={data.education.gpa}
                    onChange={(e) => setData({ ...data, education: { ...data.education, gpa: e.target.value } })}
                    className="w-full px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
