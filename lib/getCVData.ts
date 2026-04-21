import pool from './db';
import { cvData } from './data';

// Server-side only function to fetch data from database
export async function getCVData() {
  try {
    const [rows] = await pool.execute<any[]>(
      'SELECT data_key, data_value FROM cv_data'
    );

    const data: any = {};
    
    rows.forEach((row: any) => {
      const value = typeof row.data_value === 'string' 
        ? JSON.parse(row.data_value) 
        : row.data_value;
      
      if (row.data_key === 'personal') {
        data.name = value.name;
        data.title = value.title;
        data.tagline = value.tagline;
        data.about = value.about;
        data.contact = value.contact;
      } else {
        data[row.data_key] = value;
      }
    });

    return data;
  } catch (error) {
    console.error('Error fetching CV data:', error);
    return cvData;
  }
}
