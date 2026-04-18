"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cvData } from "@/lib/data";

export default function ExperienceSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[#00FFB2] text-sm">02.</span>
            <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">Work History</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0]">
            Pengalaman <span className="text-[#00FFB2]">Kerja</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-0">
          {/* Sidebar tabs */}
          <div className="relative md:border-r border-[#1E1E2E]">
            {cvData.experience.map((exp, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`w-full text-left px-6 py-5 border-b border-[#1E1E2E] transition-all duration-200 relative ${
                  active === i ? "text-[#E8E8F0]" : "text-[#4A4A6A] hover:text-[#8888AA] hover:bg-[#111118]/60"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 rounded-r"
                    style={{ background: exp.color }}
                  />
                )}
                <div className="font-display font-semibold text-sm truncate">{exp.company}</div>
                <div className="text-xs font-mono mt-0.5 truncate" style={{ color: active === i ? exp.color : undefined }}>
                  {exp.period}
                </div>
                <span
                  className="inline-block mt-1 px-2 py-0.5 rounded text-xs font-mono"
                  style={{
                    background: `${exp.color}15`,
                    color: exp.color,
                  }}
                >
                  {exp.type}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-2 p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {(() => {
                  const exp = cvData.experience[active];
                  return (
                    <>
                      <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                        <div>
                          <h3 className="font-display text-xl font-bold text-[#E8E8F0]">
                            {exp.role}
                          </h3>
                          <div className="text-base mt-0.5" style={{ color: exp.color }}>
                            @ {exp.company}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-xs text-[#4A4A6A]">{exp.period}</div>
                          <div className="font-mono text-xs text-[#4A4A6A] mt-0.5">📍 {exp.location}</div>
                        </div>
                      </div>

                      <p className="text-[#8888AA] text-sm mb-6 leading-relaxed">{exp.description}</p>

                      <ul className="space-y-3 mb-6">
                        {exp.tasks.map((task, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-start gap-3 text-sm text-[#8888AA] leading-relaxed"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                            {task}
                          </motion.li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full text-xs font-mono tag-pulse"
                            style={{ background: `${exp.color}15`, color: exp.color, border: `1px solid ${exp.color}30` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
