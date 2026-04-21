"use client";
import { motion } from "framer-motion";

const highlights = [
  { icon: "🔌", label: "Mikrotik & OpenWrt", sub: "RouterOS, P2P, QoS" },
  { icon: "💻", label: "Laravel & PHP", sub: "REST API, MySQL, Chart.js" },
  { icon: "☁️", label: "AWS Cloud", sub: "EC2, S3, RDS, VPC, IAM" },
  { icon: "🛡️", label: "Network Security", sub: "VPN, Firewall, Bandwidth Mgmt" },
  { icon: "📡", label: "IoT Systems", sub: "MQTT, Sensor Monitoring" },
  { icon: "🖥️", label: "IT Support L1/L2", sub: "Helpdesk, SLA, Troubleshooting" },
];

export default function AboutSection({ data }: { data: any }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="font-mono text-[#00FFB2] text-sm">01.</span>
              <span className="font-mono text-[#4A4A6A] text-sm tracking-widest uppercase">About Me</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-[#E8E8F0] mb-6 leading-tight">
              Tentang <span className="text-[#00FFB2]">Saya</span>
            </h2>

            <div className="space-y-4 text-[#8888AA] leading-relaxed font-body">
              <p>
                Saya adalah fresh graduate{" "}
                <span className="text-[#E8E8F0] font-medium">D4 Teknik Telekomunikasi</span>{" "}
                dengan IPK{" "}
                <span className="text-[#00FFB2] font-semibold">3.62/4.00</span>, spesialis di
                bidang IT Support, jaringan komputer, dan pengembangan web.
              </p>
              <p>
                Keahlian utama saya meliputi konfigurasi{" "}
                <span className="text-[#E8E8F0]">Mikrotik RouterOS & OpenWrt</span>,
                implementasi cloud{" "}
                <span className="text-[#FF9900] font-medium">AWS</span>, dan pengembangan
                aplikasi web berbasis{" "}
                <span className="text-[#FF2D20] font-medium">Laravel/PHP</span>.
              </p>
              <p>
                Saat ini aktif sebagai{" "}
                <span className="text-[#00FFB2]">IT Support di PT Menara Agung</span>, mengelola
                infrastruktur IT dan memastikan uptime optimal untuk seluruh operasional perusahaan.
              </p>
            </div>

            {/* Quick facts */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                ["📍", "Padang"],
                ["🎓", "D4 Teknik Telekomunikasi"],
                ["💼", "PT Menara Agung"],
                ["📅", "Lulus 2024"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-2 text-sm text-[#8888AA]">
                  <span>{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.07 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-4 rounded-xl border border-[#1E1E2E] bg-[#111118] hover:border-[#00FFB2]/25 transition-all duration-200 cursor-default"
              >
                <div className="text-2xl mb-2">{h.icon}</div>
                <div className="font-display font-semibold text-[#E8E8F0] text-sm mb-0.5">{h.label}</div>
                <div className="text-xs text-[#4A4A6A] font-mono">{h.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
