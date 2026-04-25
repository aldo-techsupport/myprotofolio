import pool from './db';
import { cvData } from './data';

export async function getCVData() {
  try {
    const [rows] = await pool.execute<any[]>(
      'SELECT data_key, data_value FROM cv_data'
    );

    if (!rows || rows.length === 0) {
      console.warn('No data in database, using fallback');
      return cvData;
    }

    const data: any = {};
    
    rows.forEach((row: any) => {
      try {
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
      } catch (parseError) {
        console.error(`Error parsing row ${row.data_key}:`, parseError);
      }
    });

    return Object.keys(data).length > 0 ? data : cvData;
  } catch (error) {
    console.error('Database error, using fallback data:', error);
    return cvData;
  }
}
