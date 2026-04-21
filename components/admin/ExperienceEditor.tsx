"use client";
import { useState } from "react";

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  color: string;
  description: string;
  tasks: string[];
  tags: string[];
}

export default function ExperienceEditor({ experience, onChange }: { experience: Experience[], onChange: (experience: Experience[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const emptyExperience: Experience = {
    company: "",
    role: "",
    period: "",
    location: "",
    type: "Full Time",
    color: "#00FFB2",
    description: "",
    tasks: [""],
    tags: [""]
  };

  const [newExperience, setNewExperience] = useState<Experience>(emptyExperience);

  const handleAdd = () => {
    onChange([...experience, newExperience]);
    setNewExperience(emptyExperience);
    setShowAddForm(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus pengalaman kerja ini?")) {
      onChange(experience.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (index: number, updatedExp: Experience) => {
    const updated = [...experience];
    updated[index] = updatedExp;
    onChange(updated);
  };

  const colorOptions = [
    { value: "#00FFB2", label: "Cyan" },
    { value: "#7B61FF", label: "Purple" },
    { value: "#FF6B6B", label: "Red" },
    { value: "#FFB800", label: "Yellow" },
    { value: "#00B8FF", label: "Blue" },
  ];

  const typeOptions = ["Full Time", "Part Time", "Internship", "Contract", "Freelance"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E8E8F0]">Pengalaman Kerja ({experience.length})</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors"
        >
          {showAddForm ? "❌ Batal" : "➕ Tambah Pengalaman"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-6 bg-[#0A0A0F] border-2 border-[#00FFB2] rounded-xl space-y-4">
          <h3 className="text-lg font-bold text-[#00FFB2]">Tambah Pengalaman Kerja Baru</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Nama Perusahaan</label>
              <input
                type="text"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: PT Menara Agung"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Posisi/Role</label>
              <input
                type="text"
                value={newExperience.role}
                onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: IT Support"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Periode</label>
              <input
                type="text"
                value={newExperience.period}
                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: Mei 2025 – Sekarang"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Lokasi</label>
              <input
                type="text"
                value={newExperience.location}
                onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: Jakarta"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Tipe Pekerjaan</label>
              <select
                value={newExperience.type}
                onChange={(e) => setNewExperience({ ...newExperience, type: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {typeOptions.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Warna</label>
              <select
                value={newExperience.color}
                onChange={(e) => setNewExperience({ ...newExperience, color: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Deskripsi Singkat</label>
            <textarea
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              placeholder="Deskripsi singkat pekerjaan..."
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Tugas & Tanggung Jawab (pisahkan dengan Enter)</label>
            <textarea
              value={newExperience.tasks.join("\n")}
              onChange={(e) => setNewExperience({ ...newExperience, tasks: e.target.value.split("\n").filter(t => t.trim()) })}
              rows={6}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none font-mono"
              placeholder="Memberikan dukungan teknis L1/L2&#10;Instalasi dan konfigurasi perangkat&#10;Monitoring infrastruktur jaringan"
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Tags/Skills (pisahkan dengan koma)</label>
            <input
              type="text"
              value={newExperience.tags.join(", ")}
              onChange={(e) => setNewExperience({ ...newExperience, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t) })}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              placeholder="IT Support, LAN/WAN, VPN, Helpdesk"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!newExperience.company || !newExperience.role}
            className="w-full py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✅ Simpan Pengalaman
          </button>
        </div>
      )}

      {/* Experience List */}
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <div key={index} className="p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg hover:border-[#00FFB2]/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-[#E8E8F0]">{exp.company}</h3>
                  <span className="px-2 py-0.5 rounded text-xs font-mono" style={{ background: `${exp.color}20`, color: exp.color }}>
                    {exp.type}
                  </span>
                </div>
                <p className="text-sm text-[#00FFB2] mb-1">{exp.role}</p>
                <div className="flex items-center gap-3 text-xs text-[#8888AA]">
                  <span>📅 {exp.period}</span>
                  <span>📍 {exp.location}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  className="px-3 py-1 bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30 rounded text-sm hover:bg-[#00FFB2]/30 transition-colors"
                >
                  {expandedIndex === index ? "▲ Tutup" : "▼ Edit Detail"}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Expanded Edit Form */}
            {expandedIndex === index && (
              <div className="mt-4 pt-4 border-t border-[#1E1E2E] space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Perusahaan</label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdate(index, { ...exp, company: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Posisi</label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdate(index, { ...exp, role: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Periode</label>
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => handleUpdate(index, { ...exp, period: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Lokasi</label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdate(index, { ...exp, location: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Tipe</label>
                    <select
                      value={exp.type}
                      onChange={(e) => handleUpdate(index, { ...exp, type: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    >
                      {typeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Warna</label>
                    <select
                      value={exp.color}
                      onChange={(e) => handleUpdate(index, { ...exp, color: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    >
                      {colorOptions.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#8888AA] mb-1">Deskripsi</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => handleUpdate(index, { ...exp, description: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8888AA] mb-1">Tugas & Tanggung Jawab (pisahkan dengan Enter)</label>
                  <textarea
                    value={exp.tasks?.join("\n") || ""}
                    onChange={(e) => handleUpdate(index, { ...exp, tasks: e.target.value.split("\n").filter(t => t.trim()) })}
                    rows={6}
                    className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8888AA] mb-1">Tags (pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={exp.tags?.join(", ") || ""}
                    onChange={(e) => handleUpdate(index, { ...exp, tags: e.target.value.split(",").map(t => t.trim()).filter(t => t) })}
                    className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Preview */}
            {expandedIndex !== index && (
              <div className="mt-3 pt-3 border-t border-[#1E1E2E]">
                <p className="text-xs text-[#8888AA] mb-2">{exp.description}</p>
                <div className="flex flex-wrap gap-1">
                  {exp.tags?.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 bg-[#111118] border border-[#1E1E2E] rounded text-xs" style={{ color: exp.color }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
