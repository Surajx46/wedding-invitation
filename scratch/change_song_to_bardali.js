const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// Replace video ID and title/artist everywhere
content = content.replace(/6OW5CnhgGOw/g, 'HAcLoqZO-Z0');
content = content.replace(/Behuli &bull; Subani Moktan/g, 'Bardali &bull; Sushant KC');
content = content.replace(/Toggle wedding song: Behuli/g, 'Toggle wedding song: Bardali');
content = content.replace(/Song: Behuli - Subani Moktan/g, 'Song: Bardali - Sushant KC & Indrakala Rai');
content = content.replace(/"Behuli" by Subani Moktan/g, '"Bardali" by Sushant KC');
content = content.replace(/"Behuli"/g, '"Bardali"');

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated wedding song to "Bardali" by Sushant KC (HAcLoqZO-Z0)!');

