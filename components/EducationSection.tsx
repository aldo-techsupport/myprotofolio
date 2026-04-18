"use client";
import { motion } from "framer-motion";
import { cvData } from "@/lib/data";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-15" />
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
            <span className="font-mono text-[#00FFB2] text-sm">05.</span>
            <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">Background</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0]">
            Pendidikan &amp; <span className="text-[#00FFB2]">Sertifikasi</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl border border-[#1E1E2E] bg-[#111118] p-7 overflow-hidden group hover:border-[#00FFB2]/30 transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00FFB2] to-transparent opacity-60" />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#00FFB2]/5 group-hover:bg-[#00FFB2]/10 transition-colors" />

            <div className="text-4xl mb-4">🎓</div>
            <div className="font-mono text-xs text-[#4A4A6A] mb-1">{cvData.education.period}</div>
            <h3 className="font-display text-xl font-bold text-[#E8E8F0] mb-1">{cvData.education.degree}</h3>
            <div className="text-[#00FFB2] font-medium mb-4">{cvData.education.institution}</div>

            <div className="flex items-center gap-3 mb-5 p-3 rounded-xl bg-[#00FFB2]/5 border border-[#00FFB2]/10">
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-[#00FFB2]">3.62</div>
                <div className="text-xs text-[#4A4A6A] font-mono">/4.00 GPA</div>
              </div>
              <div className="w-px h-10 bg-[#1E1E2E]" />
              <div className="text-xs text-[#8888AA]">
                Cumulative GPA<br />
                <span className="text-[#00FFB2]">Memuaskan</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#16161F] border border-[#1E1E2E]">
              <div className="text-xs font-mono text-[#4A4A6A] mb-1 uppercase">Tugas Akhir</div>
              <p className="text-xs text-[#8888AA] leading-relaxed">{cvData.education.thesis}</p>
            </div>
          </motion.div>

          {/* Right column: Certification + Organization */}
          <div className="space-y-6">
            {/* Certification */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="rounded-2xl border border-[#1E1E2E] bg-[#111118] p-6 overflow-hidden group hover:border-[#FF9900]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">☁️</div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-[#4A4A6A] mb-1">{cvData.certifications[0].period}</div>
                  <h3 className="font-display font-bold text-[#E8E8F0] mb-0.5">{cvData.certifications[0].name}</h3>
                  <div className="text-sm mb-3" style={{ color: cvData.certifications[0].color }}>
                    {cvData.certifications[0].issuer}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cvData.certifications[0].topics.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{ background: `${cvData.certifications[0].color}15`, color: cvData.certifications[0].color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Organization */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-[#1E1E2E] bg-[#111118] p-6 overflow-hidden group hover:border-[#7B61FF]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">🏛️</div>
                <div className="flex-1">
                  <div className="font-mono text-xs text-[#4A4A6A] mb-1">{cvData.organization.period}</div>
                  <h3 className="font-display font-bold text-[#E8E8F0] mb-0.5">{cvData.organization.name}</h3>
                  <div className="text-sm text-[#7B61FF] mb-3">{cvData.organization.role}</div>
                  <ul className="space-y-1.5">
                    {cvData.organization.tasks.map((t, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-[#8888AA]">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#7B61FF] flex-shrink-0" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
