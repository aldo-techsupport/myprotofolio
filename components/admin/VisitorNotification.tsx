"use client";
import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';

interface Visitor {
  ip_address: string;
  country: string;
  city: string;
  visited_at: string;
  is_admin: boolean;
}

export default function VisitorNotification() {
  const [newVisitors, setNewVisitors] = useState<Visitor[]>([]);
  const [lastCheck, setLastCheck] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check for new visitors every 30 seconds
    const interval = setInterval(async () => {
      try {
        const response = await fetch('/api/analytics?days=1');
        if (response.ok) {
          const data = await response.json();
          const recent = data.recentVisitors.filter((v: Visitor) => 
            new Date(v.visited_at) > lastCheck
          );
          
          if (recent.length > 0) {
            setNewVisitors(recent);
            setShow(true);
            setLastCheck(new Date());
            
            // Auto hide after 10 seconds
            setTimeout(() => setShow(false), 10000);
          }
        }
      } catch (error) {
        console.error('Failed to check visitors:', error);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [lastCheck]);

  if (!show || newVisitors.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="bg-[#111118] border-2 border-[#00FFB2] rounded-xl p-4 shadow-2xl max-w-sm">
        <div className="flex items-start gap-3">
          <div className="bg-[#00FFB2]/20 p-2 rounded-lg">
            <Bell className="text-[#00FFB2]" size={20} />
          </div>
          <div className="flex-1">
            <h3 className="text-[#E8E8F0] font-bold mb-1">
              🎉 New Visitor{newVisitors.length > 1 ? 's' : ''}!
            </h3>
            {newVisitors.slice(0, 3).map((visitor, index) => (
              <p key={index} className="text-sm text-[#8888AA] mb-1">
                {visitor.is_admin ? '👔 Admin' : '👤 Visitor'} from{' '}
                <span className="text-[#00FFB2]">
                  {visitor.city || visitor.country || 'Unknown'}
                </span>
              </p>
            ))}
            {newVisitors.length > 3 && (
              <p className="text-xs text-[#8888AA] mt-2">
                +{newVisitors.length - 3} more visitors
              </p>
            )}
          </div>
          <button
            onClick={() => setShow(false)}
            className="text-[#8888AA] hover:text-[#E8E8F0]"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
