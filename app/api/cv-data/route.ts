import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET() {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT data_key, data_value FROM cv_data'
    );

    const cvData: any = {};
    
    rows.forEach((row: any) => {
      const value = typeof row.data_value === 'string' 
        ? JSON.parse(row.data_value) 
        : row.data_value;
      
      if (row.data_key === 'personal') {
        cvData.name = value.name;
        cvData.title = value.title;
        cvData.tagline = value.tagline;
        cvData.about = value.about;
        cvData.contact = value.contact;
      } else {
        cvData[row.data_key] = value;
      }
    });

    return NextResponse.json(cvData);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
