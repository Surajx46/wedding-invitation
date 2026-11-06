const fs = require('fs');
const path = 'C:/Users/HP/.gemini/antigravity/brain/a5c79c0b-a671-40dd-8dab-49ec8f89b55b/scratch/validate_full.js';
let content = fs.readFileSync(path, 'utf8');

const target = `// 9. Check YouTube Song Integration ("Bardali" - ID: HAcLoqZO-Z0)
assert(html.includes('HAcLoqZO-Z0'), 'Contains YouTube video ID HAcLoqZO-Z0');
assert(!html.includes('T36r-O5k8Tc'), 'Old video ID T36r-O5k8Tc is completely removed');
assert(html.includes('https://www.youtube.com/iframe_api'), 'Contains YouTube Iframe API');
assert(html.includes('id="yt-player"'), 'Contains #yt-player container');
assert(html.includes('onYouTubeIframeAPIReady'), 'Contains onYouTubeIframeAPIReady handler');
assert(html.includes('Bardali'), 'Displays song title "Bardali"');`;

const replacement = `// 9. Check Native HTML5 Audio Player ("Bardali" by Sushant KC)
assert(html.includes('id="wedding-audio"'), 'Contains #wedding-audio player');
assert(html.includes('audio/bardali.mp3'), 'Contains audio/bardali.mp3 source');
assert(!html.includes('T36r-O5k8Tc'), 'Old video ID T36r-O5k8Tc is completely removed');
assert(!html.includes('6OW5CnhgGOw'), 'Old video ID 6OW5CnhgGOw is completely removed');
assert(html.includes('Bardali'), 'Displays song title "Bardali"');`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log('validate_full.js updated successfully.');
} else {
  console.error('Target not found in validate_full.js');
}

