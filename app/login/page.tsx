"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Username atau password salah!");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-bold text-[#E8E8F0] mb-2">
            Admin <span className="text-[#00FFB2]">Login</span>
          </h1>
          <p className="text-[#8888AA] text-sm">Masuk untuk mengedit portfolio</p>
        </div>

        <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none transition-colors"
                placeholder="Masukkan username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#E8E8F0] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none transition-colors"
                placeholder="Masukkan password"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00FFB2] text-[#0A0A0F] font-bold rounded-lg hover:bg-[#00FFB2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Login"}
            </button>
          </form>


        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-[#8888AA] hover:text-[#00FFB2] transition-colors">
            ← Kembali ke Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
