module.exports = {
  apps: [{
    name: 'myprotofolio',
    script: 'npm',
    args: 'start',
    cwd: '/www/wwwroot/myprotofolio',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
      NEXTAUTH_URL: 'http://localhost:3001',
      NEXTAUTH_SECRET: 'your-super-secret-key-change-this-in-production',
      ADMIN_USERNAME: 'admin',
      ADMIN_PASSWORD_HASH: '$2b$10$2cvp2m8ydCP4TjX1BNQrGeVEk9Np7LiW92QUydSd77ABFOnQ8fabu'
    }
  }]
};
