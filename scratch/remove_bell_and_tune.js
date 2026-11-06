const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Remove bell widget in HTML
const bellHtmlTarget = `  <!-- ============================================== -->
  <!-- FLOATING CONTROLS (ROTATING DISC & BELL)      -->
  <!-- ============================================== -->
  <!-- Bottom Left: Cute Temple Bell & Shower Blessings Widget -->
  <div class="fixed bottom-5 left-5 z-40">
    <button id="love-btn" aria-label="Ring wedding bell and shower blessings"
      class="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-xl border border-[#CCD8CC] flex items-center gap-2 hover:bg-[#FDF2F4] hover:border-[#9B1D2C]/40 active:scale-95 transition-all group">
      <!-- Swinging Golden Temple Bell Icon -->
      <span id="bell-icon"
        class="text-base inline-block transform group-hover:scale-125 transition-transform origin-top">🔔</span>
      <span class="text-[11px] font-bold text-[#9B1D2C] tracking-wide" id="love-count-text">Ring Bell &bull; 48
        Loves</span>
    </button>
  </div>`;

const bellHtmlReplacement = `  <!-- ============================================== -->
  <!-- FLOATING CONTROLS (ROTATING MUSIC PLAYER DISC) -->
  <!-- ============================================== -->`;

if (!content.includes(bellHtmlTarget)) {
  console.error('ERROR: bellHtmlTarget not found');
  process.exit(1);
}
content = content.replace(bellHtmlTarget, bellHtmlReplacement);

// 2. Remove bell script in JS
const bellJsTarget = `    // Temple Bell Ring & Blessings button handler
    let loveCount = 48;
    const loveBtn = document.getElementById('love-btn');
    const loveText = document.getElementById('love-count-text');
    const bellIcon = document.getElementById('bell-icon');

    loveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      loveCount++;
      loveText.textContent = \`Ring Bell • \${loveCount} Loves!\`;

      // Animate swinging bell
      if (bellIcon) {
        bellIcon.classList.remove('swinging-bell');
        void bellIcon.offsetWidth; // trigger reflow
        bellIcon.classList.add('swinging-bell');
      }

      // Play temple bell chime
      initAudio();
      playTempleBell();

      const rect = loveBtn.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top;

      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          spawnTapHeart(originX + (Math.random() - 0.5) * 55, originY + (Math.random() - 0.5) * 20);
        }, i * 50);
      }
    });`;

if (!content.includes(bellJsTarget)) {
  console.error('ERROR: bellJsTarget not found');
  process.exit(1);
}
content = content.replace(bellJsTarget, '');

// Also remove e.target.closest('#love-btn') || from document click listener
const docClickTarget = `        e.target.closest('#open-btn') ||
        e.target.closest('#music-toggle') ||
        e.target.closest('#love-btn') ||
        e.target.closest('a') ||`;

const docClickReplacement = `        e.target.closest('#open-btn') ||
        e.target.closest('#music-toggle') ||
        e.target.closest('a') ||`;

if (!content.includes(docClickTarget)) {
  console.error('ERROR: docClickTarget not found');
  process.exit(1);
}
content = content.replace(docClickTarget, docClickReplacement);

// 3. Replace audio player script block: remove synth tunes, play ONLY "Behuli"
const audioBlockTarget = `    // ----------------------------------------------------
    // 1. YouTube Audio Player ("Behuli" - ID: 6OW5CnhgGOw) & Audio Synthesizer
    // ----------------------------------------------------
    const YOUTUBE_VIDEO_ID = '6OW5CnhgGOw';
    let ytPlayer = null;
    let isYtReady = false;
    let isPlaying = false;
    let synthInterval = null;
    let audioCtx = null;

    // Load YouTube IFrame Player for "Behuli"
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

    function initAudio() {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
    }

    function playChimeNote(freq, delay = 0, duration = 1.6) {
      if (!audioCtx) return;
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
      }, delay);
    }

    // Authentic Resonant Temple Bell Chime
    function playTempleBell() {
      if (!audioCtx) return;
      const now = audioCtx.currentTime;
      [659.25, 1318.5, 1977.75, 2637].forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 2 - 1), now);
        const amp = 0.09 / (i + 1);
        gain.gain.setValueAtTime(amp, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + (2.6 - i * 0.4));
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 2.6);
      });
    }

    // Soft Satin Ribbon Rustle Whoosh
    function playRibbonRustle() {
      if (!audioCtx) return;
      try {
        const bufferSize = audioCtx.sampleRate * 0.32;
        const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = buffer;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, audioCtx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(350, audioCtx.currentTime + 0.3);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        whiteNoise.start();
      } catch (e) {}
    }

    // Grand Fairytale Opening Arpeggio with High Sparkle Bells
    function playOpeningArpeggio() {
      initAudio();
      playRibbonRustle();
      const chord = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      chord.forEach((freq, idx) => {
        playChimeNote(freq, idx * 95, 2.0);
      });
      setTimeout(() => {
        playChimeNote(1567.98, 0, 1.4);
        playChimeNote(2093.00, 110, 1.8);
      }, 760);
    }

    // Start playing the wedding song: "Behuli" by Subani Moktan
    function startAmbientMusic() {
      isPlaying = true;
      updateMusicUI();

      // Play official YouTube track "Behuli"
      if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
        try {
          ytPlayer.playVideo();
          if (!synthInterval) {
            synthInterval = setInterval(() => {
              if (isPlaying) spawnMusicNote();
            }, 2000);
          }
          return;
        } catch (err) {
          console.warn('Playing fallback:', err);
        }
      }

      // Elegant fallback chords if YouTube is loading or offline
      if (!synthInterval) {
        const progression = [
          [261.63, 329.63, 392.00], // C
          [220.00, 261.63, 329.63], // Am
          [174.61, 220.00, 261.63], // F
          [196.00, 246.94, 293.66]  // G
        ];
        let step = 0;
        synthInterval = setInterval(() => {
          if (!isPlaying) return;
          if (ytPlayer && isYtReady) {
            try {
              ytPlayer.playVideo();
              return;
            } catch(e) {}
          }
          const currentChord = progression[step % progression.length];
          currentChord.forEach((freq, idx) => {
            playChimeNote(freq * 1.5, idx * 220, 2.8);
          });
          step++;
          spawnMusicNote();
        }, 2800);
      }
    }

    function stopAmbientMusic() {
      isPlaying = false;
      if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
        try { ytPlayer.pauseVideo(); } catch(err){}
      }
      if (synthInterval) {
        clearInterval(synthInterval);
        synthInterval = null;
      }
      updateMusicUI();
    }

    function updateMusicUI() {
      const musicDisc = document.getElementById('music-disc');
      const musicMutedIcon = document.getElementById('music-icon-muted');
      if (isPlaying) {
        if (musicDisc) musicDisc.style.animationPlayState = 'running';
        musicMutedIcon.classList.add('hidden');
      } else {
        if (musicDisc) musicDisc.style.animationPlayState = 'paused';
        musicMutedIcon.classList.remove('hidden');
      }
    }`;

const audioBlockReplacement = `    // ----------------------------------------------------
    // 1. YouTube Audio Player ("Behuli" by Subani Moktan - ID: 6OW5CnhgGOw)
    // ----------------------------------------------------
    const YOUTUBE_VIDEO_ID = '6OW5CnhgGOw';
    let ytPlayer = null;
    let isYtReady = false;
    let isPlaying = false;
    let musicNotesInterval = null;

    // Load YouTube IFrame Player for "Behuli"
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

    // Play ONLY the song: "Behuli" by Subani Moktan (no synthetic tunes)
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

if (!content.includes(audioBlockTarget)) {
  console.error('ERROR: audioBlockTarget not found');
  process.exit(1);
}
content = content.replace(audioBlockTarget, audioBlockReplacement);

// 4. Update showMiniGameLockedHint (remove playChimeNote)
const hintTarget = `    // Friendly feedback when user tries to open before catching all 3 blessings
    function showMiniGameLockedHint() {
      initAudio();
      // Play two soft alert tones (musical lock hint)
      playChimeNote(440.00, 0, 0.22);
      playChimeNote(349.23, 110, 0.35);

      const remaining = Math.max(0, 3 - blessingsCaught);`;

const hintReplacement = `    // Friendly feedback when user tries to open before catching all 3 blessings
    function showMiniGameLockedHint() {
      const remaining = Math.max(0, 3 - blessingsCaught);`;

if (!content.includes(hintTarget)) {
  console.error('ERROR: hintTarget not found');
  process.exit(1);
}
content = content.replace(hintTarget, hintReplacement);

// 5. Update openInvitation (remove playOpeningArpeggio)
const openTarget = `    function openInvitation() {
      if (hasOpened) return;
      // Safety guard: Must have all 3 blessings
      if (blessingsCaught < 3) {
        showMiniGameLockedHint();
        return;
      }
      hasOpened = true;

      // 1. Play magical chime cascade & whoosh
      playOpeningArpeggio();

      // 2. Untie the silk ribbon & burst the wax seal
      ribbonCenter.classList.add('untying');

      // 3. At 350ms, swing the 3D doors open & shower petals
      setTimeout(() => {
        gatefoldCover.classList.add('gates-opened');
        launchOpeningPetals();
      }, 350);

      // 4. At 550ms, reveal the invitation card smoothly
      setTimeout(() => {
        if (mainInvitation) {
          mainInvitation.classList.add('invitation-revealed');
        }
      }, 550);

      // 5. Start looping romantic background music ("Behuli" by Subani Moktan)
      setTimeout(() => {
        startAmbientMusic();
      }, 1200);`;

const openReplacement = `    function openInvitation() {
      if (hasOpened) return;
      // Safety guard: Must have all 3 blessings
      if (blessingsCaught < 3) {
        showMiniGameLockedHint();
        return;
      }
      hasOpened = true;

      // 1. Untie the silk ribbon & burst the wax seal
      ribbonCenter.classList.add('untying');

      // 2. At 350ms, swing the 3D doors open & shower petals
      setTimeout(() => {
        gatefoldCover.classList.add('gates-opened');
        launchOpeningPetals();
      }, 350);

      // 3. At 550ms, reveal the invitation card smoothly
      setTimeout(() => {
        if (mainInvitation) {
          mainInvitation.classList.add('invitation-revealed');
        }
      }, 550);

      // 4. Play song ONLY: "Behuli" by Subani Moktan
      setTimeout(() => {
        startAmbientMusic();
      }, 600);`;

if (!content.includes(openTarget)) {
  console.error('ERROR: openTarget not found');
  process.exit(1);
}
content = content.replace(openTarget, openReplacement);

// 6. Update catchBlessing and orb listeners (remove synth notes)
const catchTarget = `    // ----------------------------------------------------
    // Mini-Game: Catch 3 Blessings Implementation
    // ----------------------------------------------------
    function catchBlessing(orbElement, hudElement, noteFreq, symbol) {
      if (!orbElement || orbElement.classList.contains('game-orb-caught')) return;
      initAudio();

      // Mark caught visually
      orbElement.classList.add('game-orb-caught');
      if (hudElement) {
        hudElement.classList.remove('opacity-35');
        hudElement.classList.add('opacity-100', 'scale-125');
      }

      // Play joyful chime note
      playChimeNote(noteFreq, 0, 0.8);

      // Burst sparkles at touch point
      const rect = orbElement.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          spawnTapHeart(originX + (Math.random() - 0.5) * 45, originY + (Math.random() - 0.5) * 45);
        }, i * 25);
      }

      blessingsCaught++;

      // Update HUD and Open Button State
      if (countBadge) countBadge.textContent = \`\${blessingsCaught}/3\`;

      if (blessingsCaught === 1) {
        if (openBtnText) openBtnText.textContent = '1/3 Caught • 2 Left!';
        if (openBtnHint) openBtnHint.textContent = 'Catch 2 more blessings floating around! 💍 💖';
      } else if (blessingsCaught === 2) {
        if (openBtnText) openBtnText.textContent = '2/3 Caught • 1 More Left!';
        if (openBtnHint) openBtnHint.textContent = 'Almost unlocked! Catch the last blessing! 💖';
      } else if (blessingsCaught >= 3) {
        if (openBtnIcon) openBtnIcon.textContent = '🔓';
        if (openBtnText) openBtnText.textContent = '✨ All Blessings Caught! ✨';
        if (openBtnHint) openBtnHint.textContent = '🎉 Opening Mannu & Sulav\\'s Invitation...';
        if (countBadge) {
          countBadge.textContent = '3/3 🎉';
          countBadge.classList.remove('bg-[#8B1220]');
          countBadge.classList.add('bg-emerald-600');
        }

        // When all 3 are caught: victory fanfare & unlock the card!
        setTimeout(() => {
          // Play fanfare chord
          playChimeNote(1046.50, 0, 0.7);
          playChimeNote(1318.51, 90, 0.9);
          playChimeNote(1567.98, 180, 1.1);
          playChimeNote(2093.00, 270, 1.5);
          // Unlock the card automatically!
          openInvitation();
        }, 350);
      }
    }

    if (orb1) orb1.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb1, hud1, 1046.50, '🌸'); });
    if (orb2) orb2.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb2, hud2, 1318.51, '💍'); });
    if (orb3) orb3.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb3, hud3, 1567.98, '💖'); });


    // Floating audio button toggle
    document.getElementById('music-toggle').addEventListener('click', () => {
      initAudio();
      if (isPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    });`;

const catchReplacement = `    // ----------------------------------------------------
    // Mini-Game: Catch 3 Blessings Implementation
    // ----------------------------------------------------
    function catchBlessing(orbElement, hudElement, symbol) {
      if (!orbElement || orbElement.classList.contains('game-orb-caught')) return;

      // Mark caught visually
      orbElement.classList.add('game-orb-caught');
      if (hudElement) {
        hudElement.classList.remove('opacity-35');
        hudElement.classList.add('opacity-100', 'scale-125');
      }

      // Burst sparkles at touch point
      const rect = orbElement.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          spawnTapHeart(originX + (Math.random() - 0.5) * 45, originY + (Math.random() - 0.5) * 45);
        }, i * 25);
      }

      blessingsCaught++;

      // Update HUD and Open Button State
      if (countBadge) countBadge.textContent = \`\${blessingsCaught}/3\`;

      if (blessingsCaught === 1) {
        if (openBtnText) openBtnText.textContent = '1/3 Caught • 2 Left!';
        if (openBtnHint) openBtnHint.textContent = 'Catch 2 more blessings floating around! 💍 💖';
      } else if (blessingsCaught === 2) {
        if (openBtnText) openBtnText.textContent = '2/3 Caught • 1 More Left!';
        if (openBtnHint) openBtnHint.textContent = 'Almost unlocked! Catch the last blessing! 💖';
      } else if (blessingsCaught >= 3) {
        if (openBtnIcon) openBtnIcon.textContent = '🔓';
        if (openBtnText) openBtnText.textContent = '✨ All Blessings Caught! ✨';
        if (openBtnHint) openBtnHint.textContent = '🎉 Opening Mannu & Sulav\\'s Invitation...';
        if (countBadge) {
          countBadge.textContent = '3/3 🎉';
          countBadge.classList.remove('bg-[#8B1220]');
          countBadge.classList.add('bg-emerald-600');
        }

        // When all 3 are caught: open card and play song directly!
        setTimeout(() => {
          openInvitation();
        }, 250);
      }
    }

    if (orb1) orb1.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb1, hud1, '🌸'); });
    if (orb2) orb2.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb2, hud2, '💍'); });
    if (orb3) orb3.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb3, hud3, '💖'); });

    // Floating audio button toggle (Plays ONLY "Behuli" song)
    document.getElementById('music-toggle').addEventListener('click', () => {
      if (isPlaying) {
        stopAmbientMusic();
      } else {
        startAmbientMusic();
      }
    });`;

if (!content.includes(catchTarget)) {
  console.error('ERROR: catchTarget not found');
  process.exit(1);
}
content = content.replace(catchTarget, catchReplacement);

// 7. Update openWelcomeModal (remove synth chime & bell)
const modalTarget = `      // Play joyful greeting chime
      initAudio();
      playTempleBell();
      setTimeout(() => {
        playChimeNote(1046.50, 0, 0.8);
        playChimeNote(1318.51, 100, 1.0);
        playChimeNote(1567.98, 200, 1.2);
      }, 150);

      // Reveal modal with spring animation`;

const modalReplacement = `      // Reveal modal with spring animation`;

if (!content.includes(modalTarget)) {
  console.error('ERROR: modalTarget not found');
  process.exit(1);
}
content = content.replace(modalTarget, modalReplacement);

// 8. Update journeyCar click handler (remove synth horn chords)
const carTarget = `        initAudio();
        // Cheerful multi-tone wedding car horn arpeggio
        playChimeNote(784.00, 0, 0.35);   // G5
        playChimeNote(987.77, 80, 0.45);  // B5
        playChimeNote(1318.51, 160, 0.55); // E6
        playChimeNote(1567.98, 240, 0.7);  // G6

        // Playful hop animation`;

const carReplacement = `        // Playful hop animation`;

if (!content.includes(carTarget)) {
  console.error('ERROR: carTarget not found');
  process.exit(1);
}
content = content.replace(carTarget, carReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully removed bell button and all synth tunes. Now ONLY the YouTube song plays!');

