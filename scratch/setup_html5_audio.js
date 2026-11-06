const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove youtube iframe_api script from <head>
content = content.replace('  <script src="https://www.youtube.com/iframe_api"></script>\n', '');

// 2. Replace youtube iframe container with HTML5 audio element
const ytContainerTarget = `  <!-- Dedicated YouTube Audio Player: "Bardali" by Sushant KC (HAcLoqZO-Z0) -->
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

const audioTagReplacement = `  <!-- High-Fidelity HTML5 Audio Player ("Bardali" by Sushant KC) -->
  <audio id="wedding-audio" preload="auto" loop playsinline>
    <source src="audio/bardali.mp3" type="audio/mpeg">
    <source src="audio/song.mp3" type="audio/mpeg">
    <source src="audio/bardali.m4a" type="audio/mp4">
    <source src="audio/music.mp3" type="audio/mpeg">
  </audio>`;

if (!content.includes(ytContainerTarget)) {
  console.error('ERROR: ytContainerTarget not found');
  process.exit(1);
}
content = content.replace(ytContainerTarget, audioTagReplacement);

// 3. Replace YouTube JS block with HTML5 Audio Controller
const ytScriptTarget = `    // ----------------------------------------------------
    // 1. YouTube Audio Player ("Bardali" by Sushant KC - ID: HAcLoqZO-Z0)
    // ----------------------------------------------------
    const YOUTUBE_VIDEO_ID = 'HAcLoqZO-Z0';
    let ytPlayer = null;
    let isYtReady = false;
    let isPlaying = false;
    let musicNotesInterval = null;

    // Load YouTube IFrame Player binding to pre-rendered iframe
    window.onYouTubeIframeAPIReady = function() {
      try {
        ytPlayer = new YT.Player('yt-player', {
          events: {
            onReady: function(e) {
              isYtReady = true;
              try {
                e.target.unMute();
                e.target.setVolume(100);
              } catch(err){}
              if (isPlaying) {
                try {
                  e.target.unMute();
                  e.target.setVolume(100);
                  e.target.playVideo();
                } catch(err){}
              }
            },
            onStateChange: function(e) {
              // When song ends, loop automatically
              if (e.data === 0) { // YT.PlayerState.ENDED
                try {
                  if (typeof e.target.seekTo === 'function') e.target.seekTo(0);
                  if (typeof e.target.playVideo === 'function') e.target.playVideo();
                } catch(err){}
              }
              if (e.data === 1) { // YT.PlayerState.PLAYING
                isPlaying = true;
                updateMusicUI();
              } else if (e.data === 2) { // YT.PlayerState.PAUSED
                isPlaying = false;
                updateMusicUI();
              }
            },
            onError: function(e) {
              console.warn('YouTube Player notice for HAcLoqZO-Z0:', e.data);
            }
          }
        });
      } catch (err) {
        console.warn('YouTube API init notice:', err);
      }
    };

    // Unlock / Prime Audio on first user gesture
    function primeAudioOnGesture() {
      const iframe = document.getElementById('yt-player');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
        } catch(e) {}
      }
      if (ytPlayer) {
        try {
          if (typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
          if (typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(100);
        } catch(e) {}
      }
    }
    window.addEventListener('click', primeAudioOnGesture, { once: true });
    window.addEventListener('touchstart', primeAudioOnGesture, { once: true, passive: true });

    // Play ONLY the song: "Bardali" by Sushant KC (unmuted & full volume)
    function startAmbientMusic() {
      isPlaying = true;
      updateMusicUI();

      // 1. YouTube JS API instance
      if (ytPlayer) {
        try {
          if (typeof ytPlayer.unMute === 'function') ytPlayer.unMute();
          if (typeof ytPlayer.setVolume === 'function') ytPlayer.setVolume(100);
          if (typeof ytPlayer.playVideo === 'function') ytPlayer.playVideo();
        } catch (err) {
          console.warn('YouTube playVideo error:', err);
        }
      }

      // 2. Direct postMessage to pre-rendered iframe (guaranteed synchronous delivery)
      const iframe = document.getElementById('yt-player');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
          iframe.contentWindow.postMessage('{"event":"command","func":"setVolume","args":[100]}', '*');
          iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
        } catch (err) {}
      }
    }

    function stopAmbientMusic() {
      isPlaying = false;
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch(err){}
      }
      const iframe = document.getElementById('yt-player');
      if (iframe && iframe.contentWindow) {
        try {
          iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        } catch (err) {}
      }
      updateMusicUI();
    }`;

const audioScriptReplacement = `    // ----------------------------------------------------
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

if (!content.includes(ytScriptTarget)) {
  console.error('ERROR: ytScriptTarget not found');
  process.exit(1);
}
content = content.replace(ytScriptTarget, audioScriptReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully installed native HTML5 Audio Player in index.html!');

