const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../src/data/commands.json');
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

const nginxCmds = commands.filter(cmd => cmd.categorySlug === 'nginx');
console.log(`Total Nginx commands: ${nginxCmds.length}`);
nginxCmds.forEach((cmd, idx) => {
  console.log(`${idx + 1}. ID: ${cmd.id} | Name: ${JSON.stringify(cmd.name)}`);
});
