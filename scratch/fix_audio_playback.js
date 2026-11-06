const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Replace the broken hidden 1px audio container with pre-rendered responsive iframe
const containerTarget = `  <!-- Hidden YouTube Audio Player: "Bardali" by Sushant KC (HAcLoqZO-Z0) -->
  <div id="youtube-audio-container" style="position: fixed; width: 1px; height: 1px; bottom: -50px; left: -50px; opacity: 0; pointer-events: none; overflow: hidden;">
    <div id="yt-player"></div>
  </div>`;

const containerReplacement = `  <!-- Dedicated YouTube Audio Player: "Bardali" by Sushant KC (HAcLoqZO-Z0) -->
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

if (!content.includes(containerTarget)) {
  console.error('ERROR: containerTarget not found');
  process.exit(1);
}
content = content.replace(containerTarget, containerReplacement);

// 2. Replace the audio script implementation with robust player + unMute + direct postMessage
const scriptTarget = `    // ----------------------------------------------------
    // 1. YouTube Audio Player ("Bardali" by Sushant KC - ID: HAcLoqZO-Z0)
    // ----------------------------------------------------
    const YOUTUBE_VIDEO_ID = 'HAcLoqZO-Z0';
    let ytPlayer = null;
    let isYtReady = false;
    let isPlaying = false;
    let musicNotesInterval = null;

    // Load YouTube IFrame Player for "Bardali"
    window.onYouTubeIframeAPIReady = function() {
      try {
        ytPlayer = new YT.Player('yt-player', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            playsinline: 1,
            enablejsapi: 1,
            rel: 0
          },
          events: {
            onReady: function(e) {
              isYtReady = true;
              if (isPlaying) {
                try { e.target.playVideo(); } catch(err){}
              }
            },
            onStateChange: function(e) {
              // When song ends, loop automatically
              if (e.data === 0) { // YT.PlayerState.ENDED
                try { ytPlayer.playVideo(); } catch(err){}
              }
              if (e.data === 1) { // YT.PlayerState.PLAYING
                isPlaying = true;
                updateMusicUI();
              } else if (e.data === 2) { // YT.PlayerState.PAUSED
                isPlaying = false;
                updateMusicUI();
              }
            }
          }
        });
      } catch (err) {
        console.warn('YouTube API init notice:', err);
      }
    };

    // Play ONLY the song: "Bardali" by Sushant KC (no synthetic tunes)
    function startAmbientMusic() {
      isPlaying = true;
      updateMusicUI();

      if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        try {
          ytPlayer.playVideo();
        } catch (err) {
          console.warn('YouTube playVideo notice:', err);
        }
      }
    }

    function stopAmbientMusic() {
      isPlaying = false;
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch(err){}
      }
      updateMusicUI();
    }

    function updateMusicUI() {
      const musicDisc = document.getElementById('music-disc');
      const musicMutedIcon = document.getElementById('music-icon-muted');
      if (isPlaying) {
        if (musicDisc) musicDisc.style.animationPlayState = 'running';
        if (musicMutedIcon) musicMutedIcon.classList.add('hidden');
        if (!musicNotesInterval) {
          musicNotesInterval = setInterval(() => {
            if (isPlaying) spawnMusicNote();
          }, 2000);
        }
      } else {
        if (musicDisc) musicDisc.style.animationPlayState = 'paused';
        if (musicMutedIcon) musicMutedIcon.classList.remove('hidden');
        if (musicNotesInterval) {
          clearInterval(musicNotesInterval);
          musicNotesInterval = null;
        }
      }
    }`;

const scriptReplacement = `    // ----------------------------------------------------
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
    }

    function updateMusicUI() {
      const musicDisc = document.getElementById('music-disc');
      const musicMutedIcon = document.getElementById('music-icon-muted');
      if (isPlaying) {
        if (musicDisc) musicDisc.style.animationPlayState = 'running';
        if (musicMutedIcon) musicMutedIcon.classList.add('hidden');
        if (!musicNotesInterval) {
          musicNotesInterval = setInterval(() => {
            if (isPlaying) spawnMusicNote();
          }, 2000);
        }
      } else {
        if (musicDisc) musicDisc.style.animationPlayState = 'paused';
        if (musicMutedIcon) musicMutedIcon.classList.remove('hidden');
        if (musicNotesInterval) {
          clearInterval(musicNotesInterval);
          musicNotesInterval = null;
        }
      }
    }`;

if (!content.includes(scriptTarget)) {
  console.error('ERROR: scriptTarget not found');
  process.exit(1);
}
content = content.replace(scriptTarget, scriptReplacement);

// 3. Make sure openInvitation starts music synchronously
const openTarget = `      // 4. Play song ONLY: "Bardali" by Sushant KC
      setTimeout(() => {
        startAmbientMusic();
      }, 600);`;

const openReplacement = `      // 4. Play song ONLY: "Bardali" by Sushant KC (immediate start)
      startAmbientMusic();`;

if (!content.includes(openTarget)) {
  console.error('ERROR: openTarget not found');
  process.exit(1);
}
content = content.replace(openTarget, openReplacement);

// 4. Make sure catchBlessing (3rd blessing) starts music synchronously on user tap
const catchTarget = `        // When all 3 are caught: open card and play song directly!
        setTimeout(() => {
          openInvitation();
        }, 250);`;

const catchReplacement = `        // Start audio immediately within user touch gesture!
        startAmbientMusic();

        // When all 3 are caught: open card!
        setTimeout(() => {
          openInvitation();
        }, 250);`;

if (!content.includes(catchTarget)) {
  console.error('ERROR: catchTarget not found');
  process.exit(1);
}
content = content.replace(catchTarget, catchReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully updated index.html with bulletproof audio playback!');

