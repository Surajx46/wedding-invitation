const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

lines.forEach((l, idx) => {
  if (l.includes('<section') || l.includes('id="main-invitation"') || l.includes('hero') || l.includes('couple') || l.includes('mandala') || l.includes('journey')) {
    console.log((idx+1) + ': ' + l.trim());
  }
});

