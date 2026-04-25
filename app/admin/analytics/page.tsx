"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart3, Globe, MapPin, Users, Eye, Shield } from "lucide-react";
import VisitorNotification from "@/components/admin/VisitorNotification";

interface AnalyticsData {
  summary: {
    totalVisitors: number;
    totalVisits: number;
    adminVisits: number;
  };
  visitsByCountry: Array<{ country: string; count: number }>;
  visitsByCity: Array<{ city: string; country: string; count: number }>;
  recentVisitors: Array<{
    ip_address: string;
    country: string;
    city: string;
    region: string;
    isp: string;
    page_url: string;
    is_admin: boolean;
    visited_at: string;
  }>;
  dailyTrend: Array<{ date: string; count: number; unique_visitors: number }>;
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter();
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (status === "authenticated") {
      fetchAnalytics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, days]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/analytics?days=${days}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-[#00FFB2]">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <VisitorNotification />
      {/* Header */}
      <div className="bg-[#111118] border-b border-[#1E1E2E] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-[#E8E8F0]">
            <BarChart3 className="inline-block mr-2 mb-1" size={24} />
            Analytics <span className="text-[#00FFB2]">Dashboard</span>
          </h1>
          <div className="flex items-center gap-4">
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="px-4 py-2 bg-[#0A0A0F] border border-[#1E1E2E] rounded-lg text-[#E8E8F0] focus:border-[#00FFB2] focus:outline-none"
            >
              <option value={7}>7 Hari Terakhir</option>
              <option value={30}>30 Hari Terakhir</option>
              <option value={90}>90 Hari Terakhir</option>
              <option value={365}>1 Tahun Terakhir</option>
            </select>
            <button
              onClick={() => router.push("/admin")}
              className="px-4 py-2 bg-[#111118] text-[#E8E8F0] border border-[#1E1E2E] rounded-lg text-sm hover:bg-[#1E1E2E] transition-colors"
            >
              ← Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="text-[#00FFB2]" size={32} />
              <span className="text-3xl font-bold text-[#E8E8F0]">
                {analytics?.summary.totalVisitors || 0}
              </span>
            </div>
            <p className="text-[#8888AA]">Unique Visitors</p>
          </div>

          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Eye className="text-blue-400" size={32} />
              <span className="text-3xl font-bold text-[#E8E8F0]">
                {analytics?.summary.totalVisits || 0}
              </span>
            </div>
            <p className="text-[#8888AA]">Total Visits</p>
          </div>

          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="text-yellow-400" size={32} />
              <span className="text-3xl font-bold text-[#E8E8F0]">
                {analytics?.summary.adminVisits || 0}
              </span>
            </div>
            <p className="text-[#8888AA]">Admin Visits (HRD)</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Visits by Country */}
          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#E8E8F0] mb-4 flex items-center">
              <Globe className="mr-2 text-[#00FFB2]" size={20} />
              Visitors by Country
            </h2>
            <div className="space-y-3">
              {analytics?.visitsByCountry.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#E8E8F0]">{item.country || 'Unknown'}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-[#0A0A0F] rounded-full h-2">
                      <div
                        className="bg-[#00FFB2] h-2 rounded-full"
                        style={{
                          width: `${(item.count / analytics.visitsByCountry[0].count) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-[#8888AA] w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visits by City */}
          <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#E8E8F0] mb-4 flex items-center">
              <MapPin className="mr-2 text-[#00FFB2]" size={20} />
              Visitors by City
            </h2>
            <div className="space-y-3">
              {analytics?.visitsByCity.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-[#E8E8F0]">
                    {item.city || 'Unknown'}, {item.country}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-[#0A0A0F] rounded-full h-2">
                      <div
                        className="bg-blue-400 h-2 rounded-full"
                        style={{
                          width: `${(item.count / analytics.visitsByCity[0].count) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-[#8888AA] w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Visitors Table */}
        <div className="bg-[#111118] border border-[#1E1E2E] rounded-2xl p-6">
          <h2 className="text-xl font-bold text-[#E8E8F0] mb-4">Recent Visitors</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1E1E2E]">
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">Time</th>
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">IP Address</th>
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">Location</th>
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">ISP</th>
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">Page</th>
                  <th className="text-left py-3 px-4 text-[#8888AA] font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {analytics?.recentVisitors.map((visitor: any, index: number) => (
                  <tr key={index} className="border-b border-[#1E1E2E] hover:bg-[#0A0A0F]">
                    <td className="py-3 px-4 text-[#E8E8F0] text-sm">
                      {new Date(visitor.visited_at).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-4 text-[#E8E8F0] font-mono text-sm">
                      {visitor.ip_address}
                    </td>
                    <td className="py-3 px-4 text-[#E8E8F0] text-sm">
                      {visitor.city && visitor.country
                        ? `${visitor.city}, ${visitor.country}`
                        : visitor.country || 'Unknown'}
                    </td>
                    <td className="py-3 px-4 text-[#8888AA] text-sm">
                      {visitor.isp || '-'}
                    </td>
                    <td className="py-3 px-4 text-[#8888AA] text-sm truncate max-w-xs">
                      {visitor.page_url}
                    </td>
                    <td className="py-3 px-4">
                      {visitor.is_admin ? (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                          Admin
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-[#00FFB2]/20 text-[#00FFB2] rounded text-xs font-medium">
                          Public
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
