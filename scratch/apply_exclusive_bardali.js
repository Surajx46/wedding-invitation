const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Clean iframe container
const iframeTarget = `  <!-- Dedicated YouTube Audio Player: "Bardali" by Sushant KC (HAcLoqZO-Z0) -->
  <div id="youtube-audio-container" style="position: fixed; z-index: -9999; bottom: 0; right: 0; width: 300px; height: 200px; opacity: 0.001; pointer-events: none; overflow: hidden;">
    <iframe id="yt-player"
      width="300"
      height="200"
      src="https://www.youtube.com/embed/HAcLoqZO-Z0?enablejsapi=1&autoplay=0&loop=1&playlist=HAcLoqZO-Z0&playsinline=1&controls=0&rel=0&modestbranding=1"
      title="Bardali - Sushant KC"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      style="width: 300px; height: 200px; border: 0;">
    </iframe>
  </div>`;

const iframeReplacement = `  <!-- Dedicated YouTube Audio Player: "Bardali" by Sushant KC (HAcLoqZO-Z0) -->
  <div id="youtube-audio-container" style="position: fixed; z-index: -9999; bottom: 0; right: 0; width: 300px; height: 200px; opacity: 0.001; pointer-events: none; overflow: hidden;">
    <iframe id="yt-player"
      width="300"
      height="200"
      src="https://www.youtube.com/embed/HAcLoqZO-Z0?enablejsapi=1&autoplay=0&playsinline=1&controls=0&rel=0"
      title="Bardali - Sushant KC"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      style="width: 300px; height: 200px; border: 0;">
    </iframe>
  </div>`;

if (!content.includes(iframeTarget)) {
  console.error('ERROR: iframeTarget not found');
  process.exit(1);
}
content = content.replace(iframeTarget, iframeReplacement);

// 2. Remove the onError fallback that was loading 6OW5CnhgGOw
const errorBlockTarget = `            onError: function(e) {
              console.warn('YouTube Player notice (Code ' + e.data + '). Falling back to compatible stream...');
              // If video owner disables external embedding for HAcLoqZO-Z0 (Error 150/101), fallback
              if (e.data === 150 || e.data === 101 || e.data === 100 || e.data === 2) {
                if (ytPlayer && typeof ytPlayer.loadVideoById === 'function') {
                  try {
                    ytPlayer.loadVideoById('6OW5CnhgGOw');
                    ytPlayer.unMute();
                    ytPlayer.setVolume(100);
                    ytPlayer.playVideo();
                  } catch(err){}
                }
              }
            }`;

const errorBlockReplacement = `            onError: function(e) {
              console.warn('YouTube Player notice for HAcLoqZO-Z0:', e.data);
            }`;

if (!content.includes(errorBlockTarget)) {
  console.error('ERROR: errorBlockTarget not found');
  process.exit(1);
}
content = content.replace(errorBlockTarget, errorBlockReplacement);

// 3. Make loop seekTo(0) when ended
const endedTarget = `            onStateChange: function(e) {
              // When song ends, loop automatically
              if (e.data === 0) { // YT.PlayerState.ENDED
                try {
                  if (typeof e.target.playVideo === 'function') e.target.playVideo();
                } catch(err){}
              }`;

const endedReplacement = `            onStateChange: function(e) {
              // When song ends, loop automatically
              if (e.data === 0) { // YT.PlayerState.ENDED
                try {
                  if (typeof e.target.seekTo === 'function') e.target.seekTo(0);
                  if (typeof e.target.playVideo === 'function') e.target.playVideo();
                } catch(err){}
              }`;

if (content.includes(endedTarget)) {
  content = content.replace(endedTarget, endedReplacement);
}

// 4. Update song pill to include direct YouTube link
const pillTarget = `    <!-- Song Title Badge Pill -->
    <div id="song-title-pill" class="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-lg text-[10px] font-bold text-[#8B1220]">
      <span class="animate-pulse">🎵</span>
      <span>Bardali &bull; Sushant KC</span>
    </div>`;

const pillReplacement = `    <!-- Song Title Badge Pill with Direct YouTube Link -->
    <a id="song-title-pill" href="https://youtu.be/HAcLoqZO-Z0?si=9V4AgCNNmYXmOrfZ" target="_blank" rel="noopener noreferrer" title="Listen to Bardali by Sushant KC on YouTube" class="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-lg text-[10px] font-bold text-[#8B1220] hover:bg-[#FAFBF9] hover:scale-105 transition-all">
      <span class="animate-pulse">🎵</span>
      <span>Bardali &bull; Sushant KC</span>
      <span class="text-[9px] opacity-60">↗</span>
    </a>`;

if (content.includes(pillTarget)) {
  content = content.replace(pillTarget, pillReplacement);
}

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated index.html with exclusive Bardali song!');

