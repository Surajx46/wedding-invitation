const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');

console.log('styleIdx found:', content.indexOf('.game-orb-caught {') !== -1);
console.log('hudIdx found:', content.indexOf('id="minigame-hud"') !== -1);
console.log('btnIdx found:', content.indexOf('id="open-btn"') !== -1);
console.log('scriptIdx found:', content.indexOf('function openInvitation()') !== -1);

