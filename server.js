const { exec } = require('child_process');
const path = require('path');

process.chdir('C:\\Users\\ashgh\\laksya-groups');
exec('npx next start -p 3000', (error, stdout, stderr) => {
  if (error) console.error(error);
  if (stdout) console.log(stdout);
  if (stderr) console.error(stderr);
});
