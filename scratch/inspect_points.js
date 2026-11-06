const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

function printRange(title, startMatch, endMatch) {
  console.log('=== ' + title + ' ===');
  let start = -1;
  let end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (start === -1 && lines[i].includes(startMatch)) start = Math.max(0, i - 2);
    if (start !== -1 && lines[i].includes(endMatch)) {
      end = Math.min(lines.length - 1, i + 3);
      break;
    }
  }
  for (let i = start; i <= end; i++) {
    console.log((i+1) + ': ' + lines[i]);
  }
}

printRange('STYLE SECTION', '.game-target-orb', '.game-orb-caught');
printRange('HUD SECTION', 'id="minigame-hud"', 'id="game-orb-3"');
printRange('OPEN BTN SECTION', 'id="open-btn-container"', 'id="love-btn"');
printRange('SCRIPT SECTION', 'const gatefoldCover', 'catchBlessing(orb3');

