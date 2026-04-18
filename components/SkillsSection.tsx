"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cvData } from "@/lib/data";

function SkillBar({ name, level, color, index }: { name: string; level: number; color: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-sm text-[#8888AA] font-body group-hover:text-[#E8E8F0] transition-colors">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-[#1E1E2E] overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}99, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: 0.3 + index * 0.08, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="py-24 relative">
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
            <span className="font-mono text-[#00FFB2] text-sm">04.</span>
            <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">Expertise</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0]">
            Keahlian <span className="text-[#00FFB2]">Teknis</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {cvData.skills.map((cat, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                active === i
                  ? "text-[#0A0A0F] font-semibold"
                  : "text-[#4A4A6A] border border-[#1E1E2E] hover:border-[#4A4A6A]"
              }`}
              style={active === i ? { background: cat.color } : {}}
            >
              <span>{cat.icon}</span>
              {cat.category}
            </motion.button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Skill bars */}
          <div className="space-y-5">
            {cvData.skills[active].items.map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={cvData.skills[active].color}
                index={i}
              />
            ))}
          </div>

          {/* All skills tag cloud */}
          <div>
            <h3 className="font-display font-semibold text-[#E8E8F0] mb-4 text-sm uppercase tracking-wider">
              All Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {cvData.skills.flatMap((cat) =>
                cat.items.map((s) => (
                  <motion.span
                    key={s.name + cat.category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                    className="px-3 py-1.5 rounded-full text-xs font-mono cursor-default transition-all duration-200"
                    style={{
                      background: `${cat.color}10`,
                      color: cat.color,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    {s.name}
                  </motion.span>
                ))
              )}
            </div>

            {/* Soft skills */}
            <h3 className="font-display font-semibold text-[#E8E8F0] mb-3 mt-8 text-sm uppercase tracking-wider">
              Soft Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Problem Solving", "Team & Independent", "Technical Communication", "Adaptive", "Detail-Oriented", "Time Management"].map(
                (s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full text-xs font-mono bg-[#16161F] text-[#8888AA] border border-[#1E1E2E]"
                  >
                    {s}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
