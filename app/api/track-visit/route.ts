import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pageUrl, referrer, sessionId, isAdmin } = body;

    // Get IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 
               request.headers.get('x-real-ip') || 
               'unknown';

    const userAgent = request.headers.get('user-agent') || '';

    // Get geolocation data from IP
    let geoData = null;
    try {
      const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city,regionName,timezone,lat,lon,isp`);
      if (geoResponse.ok) {
        geoData = await geoResponse.json();
      }
    } catch (error) {
      console.error('Geolocation error:', error);
    }

    // Insert visitor data
    await pool.execute(
      `INSERT INTO visitor_analytics 
       (ip_address, user_agent, country, city, region, timezone, latitude, longitude, isp, page_url, referrer, is_admin, session_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ip,
        userAgent,
        geoData?.country || null,
        geoData?.city || null,
        geoData?.regionName || null,
        geoData?.timezone || null,
        geoData?.lat || null,
        geoData?.lon || null,
        geoData?.isp || null,
        pageUrl,
        referrer,
        isAdmin || false,
        sessionId
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track visit error:', error);
    return NextResponse.json({ error: 'Failed to track visit' }, { status: 500 });
  }
}
