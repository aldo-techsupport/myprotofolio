"use client";
import { motion } from "framer-motion";

export default function ContactSection({ data }: { data: any }) {
  const contactItems = [
    { icon: "📞", label: "Phone", value: data.contact?.phone, href: `tel:${data.contact?.phone}`, color: "#00FFB2" },
    { icon: "✉️", label: "Email", value: data.contact?.email, href: `mailto:${data.contact?.email}`, color: "#7B61FF" },
    { icon: "🔗", label: "LinkedIn", value: data.contact?.linkedin, href: `https://${data.contact?.linkedin}`, color: "#0077B5" },
    { icon: "📍", label: "Location", value: data.contact?.location, href: "#", color: "#FF6B6B" },
  ];
  
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="orb w-96 h-96 bg-[#00FFB2]/6 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="font-mono text-[#00FFB2] text-sm">06.</span>
            <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">Get In Touch</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0] mb-4">
            Mari <span className="text-[#00FFB2]">Terhubung</span>
          </h2>
          <p className="text-[#8888AA] max-w-lg mx-auto leading-relaxed">
            Terbuka untuk peluang kerja baru, proyek freelance, atau sekadar ngobrol soal teknologi.
            Jangan ragu untuk menghubungi!
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className="grid sm:grid-cols-2 gap-4 mb-10 mt-12">
          {contactItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="flex items-center gap-4 p-5 rounded-2xl border border-[#1E1E2E] bg-[#111118] text-left group hover:border-opacity-50 transition-all duration-300"
              style={{ borderColor: `${item.color}20` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-[#4A4A6A] mb-0.5">{item.label}</div>
                <div className="text-sm text-[#E8E8F0] truncate group-hover:text-[#00FFB2] transition-colors">
                  {item.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href={`mailto:${data.contact.email}`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-full text-sm"
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,178,0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            ✉️ Kirim Email
          </motion.a>
          <motion.a
            href={`https://${data.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#7B61FF]/50 text-[#7B61FF] font-bold rounded-full text-sm hover:bg-[#7B61FF]/10 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔗 LinkedIn
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
