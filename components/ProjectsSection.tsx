"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cvData } from "@/lib/data";

export default function ProjectsSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[#00FFB2] text-sm">03.</span>
            <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">Portfolio</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0]">
            Proyek &amp; <span className="text-[#00FFB2]">Portfolio</span>
          </h2>
          <p className="text-[#4A4A6A] mt-3 font-body max-w-lg">
            Kumpulan proyek personal dan akademik yang menunjukkan kemampuan teknis di bidang web dev, networking, dan cloud.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {cvData.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              className="card-hover group relative rounded-2xl border border-[#1E1E2E] bg-[#111118] p-6 cursor-default overflow-hidden"
            >
              {/* Top gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, transparent)`,
                  opacity: hovered === i ? 1 : 0.4,
                }}
              />

              {/* Corner decoration */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                style={{ background: project.color }}
              />

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{project.emoji}</div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#4A4A6A]">{project.year}</span>
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: project.color, boxShadow: `0 0 6px ${project.color}` }}
                  />
                </div>
              </div>

              <h3 className="font-display text-lg font-bold text-[#E8E8F0] mb-1 leading-tight">
                {project.title}
              </h3>
              <div className="text-xs font-mono mb-3" style={{ color: project.color }}>
                {project.type}
              </div>
              <p className="text-[#8888AA] text-sm leading-relaxed mb-4">{project.description}</p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5">
                {project.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-[#8888AA]">
                    <span className="mt-1 w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.color }} />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded text-xs font-mono"
                    style={{ background: `${project.color}12`, color: project.color }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
