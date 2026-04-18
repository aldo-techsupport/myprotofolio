"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#1E1E2E]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display font-bold text-lg tracking-tight"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-[#00FFB2]">A</span>
            <span className="text-[#E8E8F0]">ldo</span>
            <span className="text-[#7B61FF]">.</span>
          </motion.a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-body font-medium transition-colors anim-underline ${
                  active === link.href.slice(1)
                    ? "text-[#00FFB2]"
                    : "text-[#8888AA] hover:text-[#E8E8F0]"
                }`}
                whileHover={{ y: -1 }}
              >
                {link.label}
                {active === link.href.slice(1) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00FFB2] rounded"
                    style={{ boxShadow: "0 0 8px #00FFB2" }}
                  />
                )}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="mailto:aldoadityaputra24@gmail.com"
              className="px-4 py-1.5 text-sm font-medium border border-[#00FFB2] text-[#00FFB2] rounded-full hover:bg-[#00FFB2] hover:text-[#0A0A0F] transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#E8E8F0] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                className="h-0.5 bg-current rounded"
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="h-0.5 bg-current rounded"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="h-0.5 bg-current rounded"
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#111118]/95 backdrop-blur-xl border-b border-[#1E1E2E] md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm text-[#8888AA] hover:text-[#00FFB2] transition-colors rounded-lg hover:bg-[#16161F]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
