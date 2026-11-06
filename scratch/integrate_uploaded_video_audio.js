const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update HTML audio/video elements
const audioHtmlTarget = `  <!-- High-Fidelity HTML5 Audio Player ("Bardali" by Sushant KC) -->
  <audio id="wedding-audio" preload="auto" loop playsinline>
    <source src="audio/bardali.mp3" type="audio/mpeg">
    <source src="audio/song.mp3" type="audio/mpeg">
    <source src="audio/bardali.m4a" type="audio/mp4">
    <source src="audio/music.mp3" type="audio/mpeg">
  </audio>`;

const audioHtmlReplacement = `  <!-- High-Fidelity Native Audio & Media Player ("Bardali" by Sushant KC) -->
  <audio id="wedding-audio" preload="auto" loop playsinline>
    <source src="audio/bardali.mp3" type="audio/mpeg">
    <source src="audio/bardali.m4a" type="audio/mp4">
    <source src="audio/bardali.mp4" type="audio/mp4">
    <source src="audio/Sushant KC - Bardali ft. Indrakala Rai (Official Music Video).mp4" type="audio/mp4">
  </audio>
  <video id="wedding-media" preload="auto" loop playsinline style="position: fixed; z-index: -9999; bottom: 0; right: 0; width: 1px; height: 1px; opacity: 0.001; pointer-events: none;">
    <source src="audio/bardali.mp4" type="video/mp4">
    <source src="audio/Sushant KC - Bardali ft. Indrakala Rai (Official Music Video).mp4" type="video/mp4">
  </video>`;

if (!content.includes(audioHtmlTarget)) {
  console.error('ERROR: audioHtmlTarget not found');
  process.exit(1);
}
content = content.replace(audioHtmlTarget, audioHtmlReplacement);

// 2. Update JavaScript logic to handle both audio and media seamlessly
const scriptTarget = `    // ----------------------------------------------------
    // 1. HTML5 Native Audio Player ("Bardali" by Sushant KC)
    // ----------------------------------------------------
    const weddingAudio = document.getElementById('wedding-audio');
    let isPlaying = false;
    let musicNotesInterval = null;

    if (weddingAudio) {
      weddingAudio.volume = 1.0;
      weddingAudio.addEventListener('play', () => {
        isPlaying = true;
        updateMusicUI();
      });
      weddingAudio.addEventListener('pause', () => {
        isPlaying = false;
        updateMusicUI();
      });
      weddingAudio.addEventListener('ended', () => {
        weddingAudio.currentTime = 0;
        weddingAudio.play().catch(e => console.warn(e));
      });
    }

    // Pre-warm audio element on first touch
    function primeAudioOnGesture() {
      if (!weddingAudio) return;
      if (weddingAudio.paused && !isPlaying) {
        weddingAudio.load();
      }
    }
    window.addEventListener('click', primeAudioOnGesture, { once: true });
    window.addEventListener('touchstart', primeAudioOnGesture, { once: true, passive: true });

    // Play "Bardali" immediately with volume 100%
    function startAmbientMusic() {
      if (!weddingAudio) return;
      weddingAudio.volume = 1.0;
      const playPromise = weddingAudio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          isPlaying = true;
          updateMusicUI();
        }).catch(err => {
          console.warn('Audio play notice (user interaction required or file pending in audio/):', err);
        });
      }
    }

    function stopAmbientMusic() {
      if (!weddingAudio) return;
      weddingAudio.pause();
      isPlaying = false;
      updateMusicUI();
    }`;

const scriptReplacement = `    // ----------------------------------------------------
    // 1. High-Fidelity Audio Player ("Bardali" by Sushant KC)
    // ----------------------------------------------------
    const weddingAudio = document.getElementById('wedding-audio');
    const weddingMedia = document.getElementById('wedding-media');
    let isPlaying = false;
    let musicNotesInterval = null;

    if (weddingAudio) {
      weddingAudio.volume = 1.0;
      weddingAudio.addEventListener('play', () => { isPlaying = true; updateMusicUI(); });
      weddingAudio.addEventListener('pause', () => { if (!weddingMedia || weddingMedia.paused) { isPlaying = false; updateMusicUI(); } });
      weddingAudio.addEventListener('ended', () => { weddingAudio.currentTime = 0; weddingAudio.play().catch(e => {}); });
    }
    if (weddingMedia) {
      weddingMedia.volume = 1.0;
      weddingMedia.addEventListener('play', () => { isPlaying = true; updateMusicUI(); });
      weddingMedia.addEventListener('pause', () => { if (!weddingAudio || weddingAudio.paused) { isPlaying = false; updateMusicUI(); } });
      weddingMedia.addEventListener('ended', () => { weddingMedia.currentTime = 0; weddingMedia.play().catch(e => {}); });
    }

    // Pre-warm audio and media on first user gesture
    function primeAudioOnGesture() {
      if (weddingAudio && weddingAudio.paused && !isPlaying) {
        weddingAudio.load();
      }
      if (weddingMedia && weddingMedia.paused && !isPlaying) {
        weddingMedia.load();
      }
    }
    window.addEventListener('click', primeAudioOnGesture, { once: true });
    window.addEventListener('touchstart', primeAudioOnGesture, { once: true, passive: true });

    // Play "Bardali" with dual audio/media fallback
    function startAmbientMusic() {
      let started = false;

      // 1. Try standard audio element first
      if (weddingAudio) {
        weddingAudio.volume = 1.0;
        const p1 = weddingAudio.play();
        if (p1 !== undefined) {
          p1.then(() => {
            started = true;
            isPlaying = true;
            updateMusicUI();
          }).catch(err => {
            console.warn('Audio element notice, falling back to media:', err);
            // 2. If audio container has video stream, media element plays it directly!
            if (weddingMedia && !started) {
              weddingMedia.volume = 1.0;
              weddingMedia.play().then(() => {
                isPlaying = true;
                updateMusicUI();
              }).catch(e => console.warn('Media play notice:', e));
            }
          });
        }
      } else if (weddingMedia) {
        weddingMedia.volume = 1.0;
        weddingMedia.play().then(() => {
          isPlaying = true;
          updateMusicUI();
        }).catch(e => console.warn(e));
      }
    }

    function stopAmbientMusic() {
      if (weddingAudio) weddingAudio.pause();
      if (weddingMedia) weddingMedia.pause();
      isPlaying = false;
      updateMusicUI();
    }`;

if (!content.includes(scriptTarget)) {
  console.error('ERROR: scriptTarget not found');
  process.exit(1);
}
content = content.replace(scriptTarget, scriptReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully integrated uploaded Bardali video/audio in index.html!');

