const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../src/data/commands.json');
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

const targets = ['curl', 'wget', 'rsync', 'ufw', 'lsof', 'ss', 'ps', 'kill', 'journalctl', 'certbot', 'nginx'];
targets.forEach(t => {
  const matches = commands.filter(cmd => {
    const name = typeof cmd.name === 'string' ? cmd.name : JSON.stringify(cmd.name);
    return name.toLowerCase().includes(t.toLowerCase());
  });
  console.log(`Target: ${t} | Found: ${matches.length} matches`);
  matches.forEach(m => {
    console.log(`  - ID: ${m.id} | Name: ${JSON.stringify(m.name)} | Category: ${m.categorySlug}`);
  });
});
