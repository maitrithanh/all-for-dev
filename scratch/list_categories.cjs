const fs = require('fs');
const path = require('path');

const categoriesPath = path.join(__dirname, '../src/data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));

categories.forEach(cat => {
  console.log(`ID: ${cat.id} | Slug: ${cat.slug} | Name: ${JSON.stringify(cat.name)}`);
});
