"use client";
import { useState } from "react";

interface Project {
  title: string;
  type: string;
  year: string;
  color: string;
  emoji: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export default function ProjectsEditor({ projects, onChange }: { projects: Project[], onChange: (projects: Project[]) => void }) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const emptyProject: Project = {
    title: "",
    type: "",
    year: new Date().getFullYear().toString(),
    color: "#00FFB2",
    emoji: "🚀",
    description: "",
    highlights: [""],
    stack: [""]
  };

  const [newProject, setNewProject] = useState<Project>(emptyProject);

  const handleAdd = () => {
    onChange([...projects, newProject]);
    setNewProject(emptyProject);
    setShowAddForm(false);
  };

  const handleDelete = (index: number) => {
    if (confirm("Hapus proyek ini?")) {
      onChange(projects.filter((_, i) => i !== index));
    }
  };

  const handleUpdate = (index: number, updatedProject: Project) => {
    const updated = [...projects];
    updated[index] = updatedProject;
    onChange(updated);
  };

  const colorOptions = [
    { value: "#00FFB2", label: "Cyan" },
    { value: "#7B61FF", label: "Purple" },
    { value: "#FF6B6B", label: "Red" },
    { value: "#FFB800", label: "Yellow" },
    { value: "#00B8FF", label: "Blue" },
  ];

  const emojiOptions = ["🚀", "🔌", "📡", "☁️", "💻", "🌐", "⚡", "🎯", "🔥", "✨"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E8E8F0]">Proyek ({projects.length})</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors"
        >
          {showAddForm ? "❌ Batal" : "➕ Tambah Proyek"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="p-6 bg-[#0A0A0F] border-2 border-[#00FFB2] rounded-xl space-y-4">
          <h3 className="text-lg font-bold text-[#00FFB2]">Tambah Proyek Baru</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Judul Proyek</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: Mikrotik Monitoring Dashboard"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Tipe</label>
              <input
                type="text"
                value={newProject.type}
                onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: Web Developer – Personal Project"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Tahun</label>
              <input
                type="text"
                value={newProject.year}
                onChange={(e) => setNewProject({ ...newProject, year: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Warna</label>
              <select
                value={newProject.color}
                onChange={(e) => setNewProject({ ...newProject, color: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Emoji</label>
              <select
                value={newProject.emoji}
                onChange={(e) => setNewProject({ ...newProject, emoji: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {emojiOptions.map(emoji => (
                  <option key={emoji} value={emoji}>{emoji}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Deskripsi</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              placeholder="Deskripsi singkat proyek..."
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Highlights (pisahkan dengan Enter)</label>
            <textarea
              value={newProject.highlights.join("\n")}
              onChange={(e) => setNewProject({ ...newProject, highlights: e.target.value.split("\n").filter(h => h.trim()) })}
              rows={4}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none font-mono"
              placeholder="Real-time monitoring&#10;API integration&#10;Dashboard interaktif"
            />
          </div>

          <div>
            <label className="block text-sm text-[#8888AA] mb-2">Tech Stack (pisahkan dengan koma)</label>
            <input
              type="text"
              value={newProject.stack.join(", ")}
              onChange={(e) => setNewProject({ ...newProject, stack: e.target.value.split(",").map(s => s.trim()).filter(s => s) })}
              className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              placeholder="Laravel, PHP, MySQL, Bootstrap"
            />
          </div>

          <button
            onClick={handleAdd}
            disabled={!newProject.title || !newProject.description}
            className="w-full py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✅ Simpan Proyek
          </button>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project, index) => (
          <div key={index} className="p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg hover:border-[#00FFB2]/30 transition-colors">
            {editingIndex === index ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Judul</label>
                    <input
                      type="text"
                      value={project.title}
                      onChange={(e) => handleUpdate(index, { ...project, title: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#8888AA] mb-1">Tipe</label>
                    <input
                      type="text"
                      value={project.type}
                      onChange={(e) => handleUpdate(index, { ...project, type: e.target.value })}
                      className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={() => setEditingIndex(null)}
                  className="px-4 py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded text-sm"
                >
                  ✅ Selesai Edit
                </button>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{project.emoji}</span>
                    <h3 className="font-bold text-[#E8E8F0]">{project.title}</h3>
                    <span className="px-2 py-1 rounded text-xs font-mono" style={{ background: `${project.color}20`, color: project.color }}>
                      {project.year}
                    </span>
                  </div>
                  <p className="text-sm text-[#8888AA] mb-2">{project.type}</p>
                  <p className="text-xs text-[#8888AA] mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#111118] border border-[#1E1E2E] rounded text-xs text-[#8888AA]">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditingIndex(index)}
                    className="px-3 py-1 bg-[#7B61FF]/20 text-[#7B61FF] border border-[#7B61FF]/30 rounded text-sm hover:bg-[#7B61FF]/30 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-colors"
                  >
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
