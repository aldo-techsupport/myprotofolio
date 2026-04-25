import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    // Total visitors
    const [totalVisitors] = await pool.execute(
      'SELECT COUNT(DISTINCT ip_address) as count FROM visitor_analytics WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY)',
      [days]
    );

    // Total visits
    const [totalVisits] = await pool.execute(
      'SELECT COUNT(*) as count FROM visitor_analytics WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY)',
      [days]
    );

    // Admin visits
    const [adminVisits] = await pool.execute(
      'SELECT COUNT(*) as count FROM visitor_analytics WHERE is_admin = TRUE AND visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY)',
      [days]
    );

    // Visits by country
    const [visitsByCountry] = await pool.execute(
      `SELECT country, COUNT(*) as count 
       FROM visitor_analytics 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY) AND country IS NOT NULL
       GROUP BY country 
       ORDER BY count DESC 
       LIMIT 10`,
      [days]
    );

    // Visits by city
    const [visitsByCity] = await pool.execute(
      `SELECT city, country, COUNT(*) as count 
       FROM visitor_analytics 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY) AND city IS NOT NULL
       GROUP BY city, country 
       ORDER BY count DESC 
       LIMIT 10`,
      [days]
    );

    // Recent visitors
    const [recentVisitors] = await pool.execute(
      `SELECT ip_address, country, city, region, isp, page_url, is_admin, visited_at 
       FROM visitor_analytics 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       ORDER BY visited_at DESC 
       LIMIT 50`,
      [days]
    );

    // Daily visits trend
    const [dailyTrend] = await pool.execute(
      `SELECT DATE(visited_at) as date, COUNT(*) as count, COUNT(DISTINCT ip_address) as unique_visitors
       FROM visitor_analytics 
       WHERE visited_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY DATE(visited_at) 
       ORDER BY date ASC`,
      [days]
    );

    return NextResponse.json({
      summary: {
        totalVisitors: (totalVisitors as any)[0].count,
        totalVisits: (totalVisits as any)[0].count,
        adminVisits: (adminVisits as any)[0].count,
      },
      visitsByCountry,
      visitsByCity,
      recentVisitors,
      dailyTrend
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
  }
}
