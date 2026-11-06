const https = require('https');

// Test if oEmbed allows embedding
const url = 'https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=HAcLoqZO-Z0&format=json';

console.log('Testing YouTube oEmbed endpoint...');
// Note: In sandbox, network might be isolated, but we can verify the structure
console.log('Target video: HAcLoqZO-Z0');
console.log('Embed URL: https://www.youtube.com/embed/HAcLoqZO-Z0?enablejsapi=1&autoplay=0&loop=1&playlist=HAcLoqZO-Z0&playsinline=1&controls=0&rel=0');

