"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cvData } from "@/lib/data";

const roles = ["IT Support", "Network Engineer", "Web Developer", "Cloud Enthusiast"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Typewriter effect
  useEffect(() => {
    const role = roles[roleIndex];
    if (typing) {
      if (displayed.length < role.length) {
        const t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  // Particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,178,${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0,255,178,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-60" />

      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-40 z-0" />

      {/* Orbs */}
      <div className="orb w-96 h-96 bg-[#00FFB2]/8 top-20 -left-32" />
      <div className="orb w-80 h-80 bg-[#7B61FF]/10 bottom-20 -right-20" />
      <div className="orb w-64 h-64 bg-[#FF6B6B]/6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#00FFB2]/30 bg-[#00FFB2]/5"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FFB2] animate-pulse" />
              <span className="text-xs font-mono text-[#00FFB2] tracking-widest uppercase">
                Available for work
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              <span className="text-[#E8E8F0]">Aldo</span>
              <br />
              <span className="gradient-text">Aditya Putra</span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-mono text-lg md:text-xl text-[#00FFB2] mb-6 h-8 flex items-center"
            >
              <span className="mr-2 text-[#4A4A6A]">&gt;</span>
              <span>{displayed}</span>
              <span className="ml-0.5 w-0.5 h-5 bg-[#00FFB2] animate-pulse inline-block" />
            </motion.div>

            {/* About short */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#8888AA] text-base leading-relaxed max-w-lg mb-8 font-body"
            >
              Fresh graduate D4 Teknik Telekomunikasi dengan IPK{" "}
              <span className="text-[#00FFB2] font-medium">3.62/4.00</span>. Spesialis
              jaringan Mikrotik & AWS, developer web berbasis Laravel, berbasis di{" "}
              <span className="text-[#E8E8F0]">Jakarta</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-[#00FFB2] text-[#0A0A0F] font-semibold rounded-full text-sm transition-all duration-200"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,255,178,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 border border-[#1E1E2E] text-[#E8E8F0] font-medium rounded-full text-sm hover:border-[#00FFB2]/50 hover:text-[#00FFB2] transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-6"
            >
              {cvData.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-[#00FFB2]">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#4A4A6A] font-mono mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Avatar / visual card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative float-anim">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-3xl border border-[#00FFB2]/20 scale-110 animate-pulse" />

              {/* Card */}
              <div className="relative w-72 rounded-3xl border border-[#1E1E2E] bg-[#111118] p-6 overflow-hidden">
                {/* Gradient top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00FFB2] via-[#7B61FF] to-[#FF6B6B]" />

                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#00FFB2]/20 to-[#7B61FF]/20 border border-[#1E1E2E] flex items-center justify-center text-4xl mb-4 mx-auto">
                  👨‍💻
                </div>

                <div className="text-center mb-4">
                  <div className="font-display font-bold text-[#E8E8F0] text-lg">Aldo Aditya Putra</div>
                  <div className="text-xs text-[#00FFB2] font-mono mt-1">IT Support & Net Eng</div>
                </div>

                <div className="space-y-2">
                  {[
                    { icon: "📍", text: "Jakarta Selatan" },
                    { icon: "📧", text: "aldoadityaputra24@gmail.com" },
                    { icon: "🎓", text: "D4 Teknik Telekomunikasi" },
                    { icon: "⭐", text: "IPK 3.62 / 4.00" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-xs text-[#8888AA]">
                      <span>{item.icon}</span>
                      <span className="truncate">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {["Mikrotik", "Laravel", "AWS", "IT Support"].map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-[#00FFB2]/10 text-[#00FFB2] text-xs font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-2 right-2 text-[#1E1E2E] font-mono text-xs">
                  v2025
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full bg-[#16161F] border border-[#7B61FF]/40 text-xs font-mono text-[#7B61FF]"
              >
                🔌 Network
              </motion.div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-full bg-[#16161F] border border-[#FF6B6B]/40 text-xs font-mono text-[#FF6B6B]"
              >
                ☁️ AWS Cloud
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#4A4A6A] font-mono tracking-widest uppercase">scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-[#00FFB2] to-transparent rounded"
          />
        </motion.div>
      </div>
    </section>
  );
}
