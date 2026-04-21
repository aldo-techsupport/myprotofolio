import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Simpan ke database
    const dataEntries = [
      { 
        key: 'personal', 
        value: {
          name: data.name,
          title: data.title,
          tagline: data.tagline,
          about: data.about,
          contact: data.contact
        }
      },
      { key: 'stats', value: data.stats },
      { key: 'experience', value: data.experience },
      { key: 'projects', value: data.projects },
      { key: 'skills', value: data.skills },
      { key: 'education', value: data.education },
      { key: 'certifications', value: data.certifications },
      { key: 'organization', value: data.organization },
    ];

    for (const entry of dataEntries) {
      await pool.execute(
        `INSERT INTO cv_data (data_key, data_value) VALUES (?, ?)
         ON DUPLICATE KEY UPDATE data_value = ?`,
        [entry.key, JSON.stringify(entry.value), JSON.stringify(entry.value)]
      );
    }
    
    return NextResponse.json({ success: true, message: "Data berhasil disimpan!" });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
