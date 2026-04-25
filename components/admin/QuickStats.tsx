"use client";
import { useEffect, useState } from 'react';
import { Eye, Users, TrendingUp } from 'lucide-react';

export default function QuickStats() {
  const [stats, setStats] = useState({
    todayVisits: 0,
    weekVisits: 0,
    totalVisitors: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/analytics?days=7');
      if (response.ok) {
        const data = await response.json();
        
        // Calculate today's visits
        const today = new Date().toISOString().split('T')[0];
        const todayData = data.dailyTrend.find((d: any) => 
          d.date.startsWith(today)
        );
        
        setStats({
          todayVisits: todayData?.count || 0,
          weekVisits: data.summary.totalVisits,
          totalVisitors: data.summary.totalVisitors
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-[#111118] border border-[#1E1E2E] rounded-xl p-4 flex items-center gap-4">
        <div className="bg-[#00FFB2]/10 p-3 rounded-lg">
          <Eye className="text-[#00FFB2]" size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#E8E8F0]">{stats.todayVisits}</p>
          <p className="text-sm text-[#8888AA]">Visits Today</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1E1E2E] rounded-xl p-4 flex items-center gap-4">
        <div className="bg-blue-500/10 p-3 rounded-lg">
          <TrendingUp className="text-blue-400" size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#E8E8F0]">{stats.weekVisits}</p>
          <p className="text-sm text-[#8888AA]">This Week</p>
        </div>
      </div>

      <div className="bg-[#111118] border border-[#1E1E2E] rounded-xl p-4 flex items-center gap-4">
        <div className="bg-purple-500/10 p-3 rounded-lg">
          <Users className="text-purple-400" size={24} />
        </div>
        <div>
          <p className="text-2xl font-bold text-[#E8E8F0]">{stats.totalVisitors}</p>
          <p className="text-sm text-[#8888AA]">Unique Visitors</p>
        </div>
      </div>
    </div>
  );
}
