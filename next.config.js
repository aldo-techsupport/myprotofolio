/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3001',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-change-this-in-production',
    ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'admin',
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || '$2b$10$2cvp2m8ydCP4TjX1BNQrGeVEk9Np7LiW92QUydSd77ABFOnQ8fabu',
  }
};
module.exports = nextConfig;
