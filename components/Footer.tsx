"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E1E2E] py-10 relative">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display font-bold text-lg"
        >
          <span className="text-[#00FFB2]">A</span>
          <span className="text-[#E8E8F0]">ldo</span>
          <span className="text-[#7B61FF]">.</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-xs text-[#4A4A6A] font-mono text-center"
        >
          © {new Date().getFullYear()} Aldo Aditya Putra — Built with Next.js & Framer Motion
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-1 text-xs font-mono text-[#4A4A6A]"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
          <span>Open to work</span>
        </motion.div>
      </div>
    </footer>
  );
}
