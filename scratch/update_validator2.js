const fs = require('fs');
const path = 'C:/Users/HP/.gemini/antigravity/brain/a5c79c0b-a671-40dd-8dab-49ec8f89b55b/scratch/validate_full.js';
let content = fs.readFileSync(path, 'utf8');

const target = `assert(!html.includes('6OW5CnhgGOw'), 'Old video ID 6OW5CnhgGOw is completely removed');`;
const replacement = `assert(!html.includes('6OW5CnhgGOw'), 'Old video ID 6OW5CnhgGOw is completely removed');
assert(!html.toLowerCase().includes('youtube.com') && !html.toLowerCase().includes('youtu.be') && !html.includes('HAcLoqZO-Z0'), 'All YouTube links and IDs are completely removed');`;

if (content.includes(target) && !content.includes('All YouTube links and IDs are completely removed')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log('validate_full.js updated.');
} else {
  console.log('Done.');
}

