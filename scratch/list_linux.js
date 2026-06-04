const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../src/data/commands.json');
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

const linuxCmds = commands.filter(cmd => cmd.categorySlug === 'linux');
console.log(`Total Linux commands: ${linuxCmds.length}`);
linuxCmds.forEach((cmd, idx) => {
  console.log(`${idx + 1}. ID: ${cmd.id} | Name: ${JSON.stringify(cmd.name)} | Group: ${cmd.group}`);
});
