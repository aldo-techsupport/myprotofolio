const bcrypt = require('bcryptjs');

// Ganti dengan password yang Anda inginkan
const password = 'admin123'; // GANTI INI!

bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('\n=================================');
  console.log('Password Hash Generated!');
  console.log('=================================');
  console.log('Password:', password);
  console.log('Hash:', hash);
  console.log('\nCopy hash ini ke .env.local sebagai ADMIN_PASSWORD_HASH');
  console.log('=================================\n');
});
