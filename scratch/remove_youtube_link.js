const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace the <a> link with clean <div> pill that directly toggles local MP3
const targetLink = `    <!-- Song Title Badge Pill with Direct YouTube Link -->
    <a id="song-title-pill" href="https://youtu.be/HAcLoqZO-Z0?si=9V4AgCNNmYXmOrfZ" target="_blank" rel="noopener noreferrer" title="Listen to Bardali by Sushant KC on YouTube" class="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-lg text-[10px] font-bold text-[#8B1220] hover:bg-[#FAFBF9] hover:scale-105 transition-all">
      <span class="animate-pulse">🎵</span>
      <span>Bardali &bull; Sushant KC</span>
      <span class="text-[9px] opacity-60">↗</span>
    </a>`;

const replacementDiv = `    <!-- Song Title Badge Pill (Plays Local MP3 Audio) -->
    <div id="song-title-pill" title="Click to play / pause Bardali" class="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-lg text-[10px] font-bold text-[#8B1220] hover:bg-[#FAFBF9] hover:scale-105 active:scale-95 transition-all cursor-pointer select-none">
      <span class="animate-pulse">🎵</span>
      <span>Bardali &bull; Sushant KC</span>
    </div>`;

if (!content.includes(targetLink)) {
  console.error('ERROR: targetLink not found');
  process.exit(1);
}
content = content.replace(targetLink, replacementDiv);

// 2. Add click listener on song-title-pill so clicking the pill toggles MP3 audio too
const toggleScriptTarget = `    // Floating audio button toggle (Plays ONLY "Bardali" song)
    document.getElementById('music-toggle').addEventListener('click', () => {
      if (isPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    });`;

const toggleScriptReplacement = `    // Floating audio button toggle (Plays ONLY local "Bardali" MP3)
    const toggleAudioPlayState = () => {
      if (isPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    };
    document.getElementById('music-toggle').addEventListener('click', toggleAudioPlayState);
    const songPill = document.getElementById('song-title-pill');
    if (songPill) {
      songPill.addEventListener('click', toggleAudioPlayState);
    }`;

if (!content.includes(toggleScriptTarget)) {
  console.error('ERROR: toggleScriptTarget not found');
  process.exit(1);
}
content = content.replace(toggleScriptTarget, toggleScriptReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully removed YouTube link and configured local MP3 toggle!');

