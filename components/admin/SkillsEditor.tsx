"use client";
import { useState } from "react";

interface SkillItem {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  icon: string;
  color: string;
  items: SkillItem[];
}

export default function SkillsEditor({ skills, onChange }: { skills: SkillCategory[], onChange: (skills: SkillCategory[]) => void }) {
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number | null>(null);
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  const emptyCategory: SkillCategory = {
    category: "",
    icon: "💻",
    color: "#00FFB2",
    items: []
  };

  const [newCategory, setNewCategory] = useState<SkillCategory>(emptyCategory);
  const [newSkill, setNewSkill] = useState<SkillItem>({ name: "", level: 50 });

  const iconOptions = ["💻", "🔗", "☁️", "⚡", "🎨", "📱", "🛠️", "🔧", "📊", "🎯"];
  const colorOptions = [
    { value: "#00FFB2", label: "Cyan" },
    { value: "#7B61FF", label: "Purple" },
    { value: "#FF6B6B", label: "Red" },
    { value: "#FFB800", label: "Yellow" },
    { value: "#00B8FF", label: "Blue" },
  ];

  const handleAddCategory = () => {
    onChange([...skills, newCategory]);
    setNewCategory(emptyCategory);
    setShowAddCategoryForm(false);
  };

  const handleDeleteCategory = (index: number) => {
    if (confirm("Hapus kategori skill ini?")) {
      onChange(skills.filter((_, i) => i !== index));
    }
  };

  const handleUpdateCategory = (index: number, updatedCategory: SkillCategory) => {
    const updated = [...skills];
    updated[index] = updatedCategory;
    onChange(updated);
  };

  const handleAddSkill = (categoryIndex: number) => {
    if (!newSkill.name) return;
    const updated = [...skills];
    updated[categoryIndex].items.push(newSkill);
    onChange(updated);
    setNewSkill({ name: "", level: 50 });
  };

  const handleDeleteSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...skills];
    updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== skillIndex);
    onChange(updated);
  };

  const handleUpdateSkill = (categoryIndex: number, skillIndex: number, updatedSkill: SkillItem) => {
    const updated = [...skills];
    updated[categoryIndex].items[skillIndex] = updatedSkill;
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#E8E8F0]">Skills ({skills.length} kategori)</h2>
        <button
          onClick={() => setShowAddCategoryForm(!showAddCategoryForm)}
          className="px-4 py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors"
        >
          {showAddCategoryForm ? "❌ Batal" : "➕ Tambah Kategori"}
        </button>
      </div>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <div className="p-6 bg-[#0A0A0F] border-2 border-[#00FFB2] rounded-xl space-y-4">
          <h3 className="text-lg font-bold text-[#00FFB2]">Tambah Kategori Skill Baru</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Nama Kategori</label>
              <input
                type="text"
                value={newCategory.category}
                onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                placeholder="Contoh: Web Development"
              />
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Icon</label>
              <select
                value={newCategory.icon}
                onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {iconOptions.map(icon => (
                  <option key={icon} value={icon}>{icon}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-[#8888AA] mb-2">Warna</label>
              <select
                value={newCategory.color}
                onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                className="w-full px-3 py-2 bg-[#111118] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
              >
                {colorOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleAddCategory}
            disabled={!newCategory.category}
            className="w-full py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ✅ Simpan Kategori
          </button>
        </div>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {skills.map((category, catIndex) => (
          <div key={catIndex} className="p-4 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-bold text-[#E8E8F0]">{category.category}</h3>
                  <p className="text-xs text-[#8888AA]">{category.items.length} skills</p>
                </div>
                <div className="w-4 h-4 rounded-full" style={{ background: category.color }}></div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setExpandedCategory(expandedCategory === catIndex ? null : catIndex)}
                  className="px-3 py-1 bg-[#00FFB2]/20 text-[#00FFB2] border border-[#00FFB2]/30 rounded text-sm hover:bg-[#00FFB2]/30 transition-colors"
                >
                  {expandedCategory === catIndex ? "▲ Tutup" : "▼ Kelola Skills"}
                </button>
                <button
                  onClick={() => handleDeleteCategory(catIndex)}
                  className="px-3 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-sm hover:bg-red-500/30 transition-colors"
                >
                  🗑️
                </button>
              </div>
            </div>

            {/* Skills Management */}
            {expandedCategory === catIndex && (
              <div className="mt-4 pt-4 border-t border-[#1E1E2E] space-y-4">
                {/* Add Skill Form */}
                <div className="p-4 bg-[#111118] rounded-lg space-y-3">
                  <h4 className="text-sm font-bold text-[#00FFB2]">➕ Tambah Skill Baru</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#8888AA] mb-1">Nama Skill</label>
                      <input
                        type="text"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full px-3 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                        placeholder="Contoh: Laravel / PHP"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#8888AA] mb-1">Level ({newSkill.level}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={newSkill.level}
                        onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddSkill(catIndex)}
                    disabled={!newSkill.name}
                    className="w-full py-2 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded text-sm hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50"
                  >
                    ✅ Tambah Skill
                  </button>
                </div>

                {/* Skills List */}
                <div className="space-y-2">
                  {category.items.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center gap-3 p-3 bg-[#111118] rounded">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => handleUpdateSkill(catIndex, skillIndex, { ...skill, name: e.target.value })}
                            className="flex-1 px-2 py-1 bg-[#0A0A0F] border border-[#1E1E2E] rounded text-[#E8E8F0] text-sm focus:border-[#00FFB2] focus:outline-none"
                          />
                          <span className="ml-2 text-sm font-mono text-[#00FFB2]">{skill.level}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={skill.level}
                          onChange={(e) => handleUpdateSkill(catIndex, skillIndex, { ...skill, level: parseInt(e.target.value) })}
                          className="w-full"
                        />
                      </div>
                      <button
                        onClick={() => handleDeleteSkill(catIndex, skillIndex)}
                        className="px-2 py-1 bg-red-500/20 text-red-400 border border-red-500/30 rounded text-xs hover:bg-red-500/30 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
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
