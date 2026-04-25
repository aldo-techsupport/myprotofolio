require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');

async function setupAnalytics() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'myprotofolio'
  });

  try {
    console.log('🔄 Membuat tabel analytics...');

    // Tabel untuk tracking visitor
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS visitor_analytics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        user_agent TEXT,
        country VARCHAR(100),
        city VARCHAR(100),
        region VARCHAR(100),
        timezone VARCHAR(100),
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        isp VARCHAR(255),
        page_url VARCHAR(500),
        referrer VARCHAR(500),
        is_admin BOOLEAN DEFAULT FALSE,
        session_id VARCHAR(100),
        visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_ip (ip_address),
        INDEX idx_visited_at (visited_at),
        INDEX idx_is_admin (is_admin)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Tabel visitor_analytics berhasil dibuat!');

    // Tabel untuk tracking page views
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS page_views (
        id INT AUTO_INCREMENT PRIMARY KEY,
        session_id VARCHAR(100),
        page_url VARCHAR(500),
        duration_seconds INT DEFAULT 0,
        viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_session (session_id),
        INDEX idx_viewed_at (viewed_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Tabel page_views berhasil dibuat!');
    console.log('✅ Setup analytics selesai!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    throw error;
  } finally {
    await connection.end();
  }
}

setupAnalytics().catch(console.error);
