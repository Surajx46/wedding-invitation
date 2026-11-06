const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add lock styles after .game-orb-caught
const styleTarget = `.game-orb-caught {
      transform: scale(0) rotate(180deg) !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: transform 0.4s ease-in, opacity 0.3s ease !important;
    }`;

const styleReplacement = `.game-orb-caught {
      transform: scale(0) rotate(180deg) !important;
      opacity: 0 !important;
      pointer-events: none !important;
      transition: transform 0.4s ease-in, opacity 0.3s ease !important;
    }

    @keyframes lockWiggle {
      0%, 100% { transform: translateX(0); }
      15%, 45%, 75% { transform: translateX(-6px) rotate(-1.5deg); }
      30%, 60%, 90% { transform: translateX(6px) rotate(1.5deg); }
    }

    .shake-locked {
      animation: lockWiggle 0.45s cubic-bezier(0.36, 0.07, 0.19, 0.97) !important;
    }

    @keyframes orbHighlightPulse {
      0%, 100% {
        box-shadow: 0 8px 24px rgba(139, 18, 32, 0.28), 0 0 16px rgba(212, 175, 55, 0.45);
        transform: scale(1);
      }
      50% {
        box-shadow: 0 0 35px rgba(212, 175, 55, 1), 0 0 50px rgba(139, 18, 32, 0.75);
        transform: scale(1.35);
      }
    }

    .orb-locked-highlight {
      animation: orbHighlightPulse 0.6s ease-in-out 3 !important;
    }`;

if (!content.includes(styleTarget)) {
  console.error('ERROR: styleTarget not found');
  process.exit(1);
}
content = content.replace(styleTarget, styleReplacement);

// 2. Update HUD section
const hudTarget = `      <!-- Mini-Game: Catch 3 Blessings to Unlock Invitation -->
      <div id="minigame-hud" class="absolute top-5 inset-x-4 z-40 flex flex-col items-center pointer-events-auto">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#D4AF37] shadow-xl text-[11px] font-bold text-[#8B1220] transition-all">
          <span class="animate-bounce">🎮</span>
          <span>Catch 3 Blessings to Open!</span>
          <!-- Blessing Checkmarks -->
          <div class="flex items-center gap-2 ml-1 bg-[#8B1220]/10 px-2.5 py-0.5 rounded-full">
            <span id="game-target-1-icon" class="opacity-35 transition-all text-xs" title="Sacred Rose">🌸</span>
            <span id="game-target-2-icon" class="opacity-35 transition-all text-xs" title="Wedding Ring">💍</span>
            <span id="game-target-3-icon" class="opacity-35 transition-all text-xs" title="Love Knot">💖</span>
          </div>
        </div>
        <p class="text-[9px] text-white font-medium drop-shadow-md mt-1.5 bg-black/45 px-3 py-0.5 rounded-full">
          Tap the floating 🌸 💍 💖 or tap ribbon to open directly
        </p>
      </div>`;

const hudReplacement = `      <!-- Mini-Game: Catch 3 Blessings to Unlock Invitation (Mandatory to Open) -->
      <div id="minigame-hud" class="absolute top-5 inset-x-4 z-40 flex flex-col items-center pointer-events-auto transition-transform">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border-2 border-[#D4AF37] shadow-xl text-[11px] font-bold text-[#8B1220] transition-all">
          <span class="animate-bounce">🎮</span>
          <span>Catch 3 Blessings to Unlock!</span>
          <!-- Blessing Checkmarks -->
          <div class="flex items-center gap-2 ml-1 bg-[#8B1220]/10 px-2.5 py-0.5 rounded-full">
            <span id="game-target-1-icon" class="opacity-35 transition-all text-xs" title="Sacred Rose">🌸</span>
            <span id="game-target-2-icon" class="opacity-35 transition-all text-xs" title="Wedding Ring">💍</span>
            <span id="game-target-3-icon" class="opacity-35 transition-all text-xs" title="Love Knot">💖</span>
          </div>
          <span id="blessing-count-badge" class="ml-1 bg-[#8B1220] text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">0/3</span>
        </div>
        <p id="minigame-subtext" class="text-[10px] text-white font-medium drop-shadow-md mt-1.5 bg-black/60 px-3.5 py-0.5 rounded-full flex items-center gap-1.5">
          <span>🔒 Card Locked: Tap all 3 floating blessings to open!</span>
        </p>
        <!-- Floating Lock Notification Toast -->
        <div id="game-locked-banner" class="opacity-0 pointer-events-none transition-all duration-300 transform -translate-y-2 mt-2 px-4 py-1.5 rounded-full bg-[#8B1220] text-[#FFF9E6] border border-[#D4AF37] shadow-2xl text-[11px] font-bold flex items-center gap-1.5">
          <span>🔒</span>
          <span id="game-locked-banner-text">Catch all 3 blessings to unlock the card! 🌸💍💖</span>
        </div>
      </div>`;

if (!content.includes(hudTarget)) {
  console.error('ERROR: hudTarget not found');
  process.exit(1);
}
content = content.replace(hudTarget, hudReplacement);

// 3. Update Open Button section
const btnTarget = `        <!-- Tap To Open CTA Container -->
        <div id="open-btn-container" class="flex flex-col items-center mt-2 z-10">
          <button id="open-btn"
            class="relative bg-gradient-to-r from-white via-[#FFF5F6] to-white text-[#9B1D2C] border-2 border-[#9B1D2C]/40 text-xs font-bold tracking-[0.25em] uppercase py-2.5 px-6 rounded-full shadow-2xl hover:shadow-[#9B1D2C]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
            <span class="animate-pulse text-sm">✨</span>
            <span>Tap to Open</span>
            <span class="animate-pulse text-sm">✨</span>
          </button>
          <p class="text-[9px] uppercase tracking-widest text-[#5A6B5D] font-medium mt-1.5 animate-bounce">
            With Love &amp; Auspicious Blessings
          </p>
        </div>`;

const btnReplacement = `        <!-- Tap To Open CTA Container (Locked until 3 blessings caught) -->
        <div id="open-btn-container" class="flex flex-col items-center mt-2 z-10">
          <button id="open-btn"
            class="relative bg-gradient-to-r from-white via-[#FFF5F6] to-white text-[#9B1D2C] border-2 border-[#9B1D2C]/40 text-xs font-bold tracking-[0.16em] uppercase py-2.5 px-6 rounded-full shadow-2xl hover:shadow-[#9B1D2C]/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2">
            <span id="open-btn-icon" class="text-sm">🔒</span>
            <span id="open-btn-text">Catch 3 Blessings to Unlock</span>
            <span id="open-btn-subicon" class="text-xs">🌸</span>
          </button>
          <p id="open-btn-hint" class="text-[9px] uppercase tracking-wider text-[#5A6B5D] font-bold mt-1.5 transition-colors">
            Tap the 3 floating blessings 🌸 💍 💖
          </p>
        </div>`;

if (!content.includes(btnTarget)) {
  console.error('ERROR: btnTarget not found');
  process.exit(1);
}
content = content.replace(btnTarget, btnReplacement);

// 4. Update JS logic
const jsTarget = `    // ----------------------------------------------------
    // 4. Magical Gatefold Opening Sequence
    // ----------------------------------------------------
    const gatefoldCover = document.getElementById('gatefold-cover');
    const openBtn = document.getElementById('open-btn');
    const ribbonCenter = document.getElementById('ribbon-center');
    const mainInvitation = document.getElementById('main-invitation');
    let hasOpened = false;

    function openInvitation() {
      if (hasOpened) return;
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

      // 5. Start looping romantic background music after a gentle pause
      setTimeout(() => {
        startAmbientMusic();
      }, 1200);

      // 6. Fade out and remove gatefold from DOM flow so user can scroll freely
      setTimeout(() => {
        gatefoldCover.style.opacity = '0';
        gatefoldCover.style.pointerEvents = 'none';
        setTimeout(() => {
          gatefoldCover.style.display = 'none';
        }, 900);
      }, 1400);
    }

    openBtn.addEventListener('click', openInvitation);
    ribbonCenter.addEventListener('click', openInvitation);

    // ----------------------------------------------------
    // Mini-Game: "Catch 3 Blessings to Unlock" Logic
    // ----------------------------------------------------
    let blessingsCaught = 0;
    const orb1 = document.getElementById('game-orb-1');
    const orb2 = document.getElementById('game-orb-2');
    const orb3 = document.getElementById('game-orb-3');
    const hud1 = document.getElementById('game-target-1-icon');
    const hud2 = document.getElementById('game-target-2-icon');
    const hud3 = document.getElementById('game-target-3-icon');

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

      // When all 3 are caught: victory fanfare & unlock the card!
      if (blessingsCaught >= 3) {
        setTimeout(() => {
          // Play fanfare chord
          playChimeNote(1046.50, 0, 0.7);
          playChimeNote(1318.51, 90, 0.9);
          playChimeNote(1567.98, 180, 1.1);
          playChimeNote(2093.00, 270, 1.5);
          // Unlock the card automatically!
          openInvitation();
        }, 300);
      }
    }

    if (orb1) orb1.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb1, hud1, 1046.50, '🌸'); });
    if (orb2) orb2.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb2, hud2, 1318.51, '💍'); });
    if (orb3) orb3.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb3, hud3, 1567.98, '💖'); });`;

const jsReplacement = `    // ----------------------------------------------------
    // 4. Magical Gatefold Opening Sequence & Mini-Game Gate
    // ----------------------------------------------------
    const gatefoldCover = document.getElementById('gatefold-cover');
    const openBtn = document.getElementById('open-btn');
    const ribbonCenter = document.getElementById('ribbon-center');
    const mainInvitation = document.getElementById('main-invitation');
    let hasOpened = false;
    let lockPromptTimeout = null;

    // Mini-game progress state
    let blessingsCaught = 0;
    const orb1 = document.getElementById('game-orb-1');
    const orb2 = document.getElementById('game-orb-2');
    const orb3 = document.getElementById('game-orb-3');
    const hud1 = document.getElementById('game-target-1-icon');
    const hud2 = document.getElementById('game-target-2-icon');
    const hud3 = document.getElementById('game-target-3-icon');
    const countBadge = document.getElementById('blessing-count-badge');
    const openBtnIcon = document.getElementById('open-btn-icon');
    const openBtnText = document.getElementById('open-btn-text');
    const openBtnHint = document.getElementById('open-btn-hint');

    // Friendly feedback when user tries to open before catching all 3 blessings
    function showMiniGameLockedHint() {
      initAudio();
      // Play two soft alert tones (musical lock hint)
      playChimeNote(440.00, 0, 0.22);
      playChimeNote(349.23, 110, 0.35);

      const remaining = Math.max(0, 3 - blessingsCaught);
      const banner = document.getElementById('game-locked-banner');
      const bannerText = document.getElementById('game-locked-banner-text');

      if (banner && bannerText) {
        bannerText.textContent = remaining > 1 
          ? \`Catch \${remaining} more blessings to unlock! 🌸💍💖\`
          : \`Catch the last blessing to unlock! 💖\`;
        banner.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
        banner.classList.add('opacity-100', 'translate-y-0');

        if (lockPromptTimeout) clearTimeout(lockPromptTimeout);
        lockPromptTimeout = setTimeout(() => {
          banner.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
          banner.classList.remove('opacity-100', 'translate-y-0');
        }, 2200);
      }

      // Wiggle HUD, Open Button & Ribbon
      const wiggleTargets = [document.getElementById('minigame-hud'), openBtn, ribbonCenter];
      wiggleTargets.forEach(el => {
        if (!el) return;
        el.classList.remove('shake-locked');
        void el.offsetWidth; // force browser layout recalculation for repeat animation
        el.classList.add('shake-locked');
        setTimeout(() => el.classList.remove('shake-locked'), 500);
      });

      // Highlight uncollected floating orbs with pulsating gold halo
      [orb1, orb2, orb3].forEach(orb => {
        if (orb && !orb.classList.contains('game-orb-caught')) {
          orb.classList.remove('orb-locked-highlight');
          void orb.offsetWidth;
          orb.classList.add('orb-locked-highlight');
          setTimeout(() => orb.classList.remove('orb-locked-highlight'), 1800);
        }
      });
    }

    function handleCardOpenAttempt(e) {
      if (e) {
        e.stopPropagation();
      }
      if (hasOpened) return;

      // MANDATORY GAME GATE: Without playing and catching all 3 blessings, card cannot open!
      if (blessingsCaught < 3) {
        showMiniGameLockedHint();
        return;
      }

      openInvitation();
    }

    function openInvitation() {
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
      }, 1200);

      // 6. Fade out and remove gatefold from DOM flow so user can scroll freely
      setTimeout(() => {
        gatefoldCover.style.opacity = '0';
        gatefoldCover.style.pointerEvents = 'none';
        setTimeout(() => {
          gatefoldCover.style.display = 'none';
        }, 900);
      }, 1400);
    }

    openBtn.addEventListener('click', handleCardOpenAttempt);
    ribbonCenter.addEventListener('click', handleCardOpenAttempt);

    // ----------------------------------------------------
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
    if (orb3) orb3.addEventListener('click', (e) => { e.stopPropagation(); catchBlessing(orb3, hud3, 1567.98, '💖'); });`;

if (!content.includes(jsTarget)) {
  console.error('ERROR: jsTarget not found');
  process.exit(1);
}
content = content.replace(jsTarget, jsReplacement);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully enforced mini-game gate in index.html!');

