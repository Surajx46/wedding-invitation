const fs = require('fs');
const content = fs.readFileSync('index.html', 'utf8');
const lines = content.split('\n');

function printSlice(start, end) {
  for (let i = start; i <= end; i++) {
    console.log((i+1) + ': ' + lines[i]);
  }
}

console.log('=== AUDIO SECTION ===');
printSlice(1508, 1720);

console.log('=== LOVE BTN SCRIPT SECTION ===');
printSlice(2150, 2205);

