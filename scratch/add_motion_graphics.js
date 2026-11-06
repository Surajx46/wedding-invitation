const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Add new motion graphic keyframes in <style>
const styleAnchor = `    /* Golden Shimmer on Couple's Names */`;
const newStyles = `    /* Royal Golden Light Sheen Sweep across Couple's Names */
    @keyframes goldSheenSweep {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    .gold-sheen-title {
      background: linear-gradient(110deg, #7D0E1C 12%, #B82236 28%, #D4AF37 46%, #FFF9E6 50%, #D4AF37 54%, #B82236 72%, #7D0E1C 88%);
      background-size: 260% 100%;
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      animation: goldSheenSweep 4.8s ease-in-out infinite;
    }

    /* Counter-Rotating Sacred Mandala Layer */
    @keyframes mandalaCounterSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }
    .mandala-spin-reverse {
      animation: mandalaCounterSpin 50s linear infinite;
    }

    /* Subtle Floral Breathing Motion */
    @keyframes floralBreathe {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.05) rotate(1.8deg); }
    }
    .floral-breathe {
      animation: floralBreathe 4.5s ease-in-out infinite;
    }

    /* Rings 3D Floating Motion */
    @keyframes ringsFloat {
      0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
      50% { transform: translateY(-5px) rotate(-2.5deg) scale(1.04); }
    }
    .rings-float {
      animation: ringsFloat 3.6s ease-in-out infinite;
    }

    /* Countdown Jewels Golden Aura Pulse */
    @keyframes jewelGlow {
      0%, 100% {
        box-shadow: 0 4px 14px rgba(212, 175, 55, 0.18), inset 0 0 10px rgba(255, 255, 255, 0.1);
        border-color: rgba(212, 175, 55, 0.55);
      }
      50% {
        box-shadow: 0 8px 26px rgba(212, 175, 55, 0.5), inset 0 0 16px rgba(255, 215, 0, 0.25);
        border-color: rgba(212, 175, 55, 1);
      }
    }
    .jewel-glow {
      animation: jewelGlow 3.2s ease-in-out infinite;
    }

    /* Dangling Bell Clapper Sway */
    @keyframes bellClapperSway {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-22deg); }
      75% { transform: rotate(22deg); }
    }
    .bell-clapper {
      transform-origin: top center;
      animation: bellClapperSway 1.8s ease-in-out infinite;
    }

    /* Golden Pulse Glow for Badges */
    @keyframes badgeGlowPulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.5);
      }
      50% {
        box-shadow: 0 0 0 8px rgba(212, 175, 55, 0);
      }
    }
    .badge-pulse {
      animation: badgeGlowPulse 2.8s infinite;
    }

    `;

if (!content.includes(styleAnchor)) {
  console.error('ERROR: styleAnchor not found');
  process.exit(1);
}
content = content.replace(styleAnchor, newStyles + styleAnchor);

// 2. Add floral-breathe to corner ornaments
content = content.replace(
  '<div class="absolute top-0 left-0 w-28 h-28 pointer-events-none z-20">',
  '<div class="absolute top-0 left-0 w-28 h-28 pointer-events-none z-20 floral-breathe">'
);
content = content.replace(
  '<div class="absolute top-0 right-0 w-28 h-28 pointer-events-none z-20 transform scale-x-[-1]">',
  '<div class="absolute top-0 right-0 w-28 h-28 pointer-events-none z-20 transform scale-x-[-1] floral-breathe">'
);

// 3. Add bell-clapper to toran bells
content = content.replace(
  '<circle cx="0" cy="9" r="2" fill="#8B1220" />',
  '<circle cx="0" cy="9" r="2" fill="#8B1220" class="bell-clapper" />'
);

// 4. Add inner counter-rotating mandala to Hero
const mandalaTarget = `      <!-- Huge Rotating Palace Sacred Mandala Watermark Background -->
      <div class="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 opacity-[0.07] pointer-events-none z-0">
        <svg class="w-full h-full mandala-spin text-[#9B1D2C]" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" stroke-width="1.5" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" stroke-width="1.2" />
          <!-- 12 radiating auspicious petals -->
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(45 100 100)" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(30 100 100)" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(60 100 100)" />
        </svg>
      </div>`;

const mandalaReplacement = `      <!-- Layered Dual-Rotating Palace Sacred Mandalas (Motion Graphic) -->
      <div class="absolute top-14 left-1/2 -translate-x-1/2 w-80 h-80 opacity-[0.08] pointer-events-none z-0">
        <svg class="w-full h-full mandala-spin text-[#9B1D2C]" viewBox="0 0 200 200" fill="currentColor">
          <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" stroke-width="1.5" />
          <circle cx="100" cy="100" r="82" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="4 3" />
          <circle cx="100" cy="100" r="65" fill="none" stroke="currentColor" stroke-width="1.2" />
          <!-- 12 radiating auspicious petals -->
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(45 100 100)" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(30 100 100)" />
          <path d="M100 20 C108 50 120 70 150 80 C120 90 108 110 100 140 C92 110 80 90 50 80 C80 70 92 50 100 20 Z"
            fill="none" stroke="currentColor" stroke-width="1.5" transform="rotate(60 100 100)" />
        </svg>
      </div>
      <!-- Inner Counter-Rotating Golden Palace Mandala (Mesmerizing Depth Motion) -->
      <div class="absolute top-24 left-1/2 -translate-x-1/2 w-60 h-60 opacity-[0.14] pointer-events-none z-0">
        <svg class="w-full h-full mandala-spin-reverse text-[#D4AF37]" viewBox="0 0 100 100" fill="none" stroke="currentColor">
          <circle cx="50" cy="50" r="46" stroke-width="0.8" stroke-dasharray="2 2" />
          <circle cx="50" cy="50" r="38" stroke-width="1" />
          <circle cx="50" cy="50" r="28" stroke-width="0.7" />
          <path d="M50 12 C54 28 64 36 80 40 C64 44 54 52 50 68 C46 52 36 44 20 40 C36 36 46 28 50 12 Z" stroke-width="0.9" />
          <path d="M50 12 C54 28 64 36 80 40 C64 44 54 52 50 68 C46 52 36 44 20 40 C36 36 46 28 50 12 Z" stroke-width="0.9" transform="rotate(45 50 50)" />
        </svg>
      </div>`;

if (!content.includes(mandalaTarget)) {
  console.error('ERROR: mandalaTarget not found');
  process.exit(1);
}
content = content.replace(mandalaTarget, mandalaReplacement);

// 5. Add rings-float animation to rings
content = content.replace(
  '<!-- Animated Interlocking Wedding Rings with Glint -->\n      <div class="flex items-center justify-center my-1 relative z-10">',
  '<!-- Animated Interlocking Wedding Rings with Glint -->\n      <div class="flex items-center justify-center my-1 relative z-10 rings-float">'
);

// 6. Apply gold-sheen-title to Mannu Shrestha & Sulav Rana
const namesTarget = `        <h1 class="font-cormorant text-5xl sm:text-6xl font-normal tracking-wide leading-[1.08] my-2 text-[#8B1220] drop-shadow-[0_2px_4px_rgba(139,18,32,0.18)]">
          <span class="block font-medium bg-gradient-to-r from-[#7D0E1C] via-[#A81F30] to-[#7D0E1C] bg-clip-text text-transparent">
            Mannu Shrestha
          </span>
          <span class="flex items-center justify-center gap-3 my-1 font-serif">
            <span class="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <span class="text-3xl italic text-[#D4AF37] font-cormorant drop-shadow-sm font-semibold">&amp;</span>
            <span class="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </span>
          <span class="block font-medium bg-gradient-to-r from-[#7D0E1C] via-[#A81F30] to-[#7D0E1C] bg-clip-text text-transparent">
            Sulav Rana
          </span>
        </h1>`;

const namesReplacement = `        <h1 class="font-cormorant text-5xl sm:text-6xl font-normal tracking-wide leading-[1.08] my-2 drop-shadow-[0_2px_8px_rgba(139,18,32,0.22)]">
          <span class="block font-medium gold-sheen-title">
            Mannu Shrestha
          </span>
          <span class="flex items-center justify-center gap-3 my-1 font-serif">
            <span class="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#D4AF37]"></span>
            <span class="text-3xl italic text-[#D4AF37] font-cormorant drop-shadow-sm font-semibold animate-pulse">&amp;</span>
            <span class="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#D4AF37]"></span>
          </span>
          <span class="block font-medium gold-sheen-title">
            Sulav Rana
          </span>
        </h1>`;

if (!content.includes(namesTarget)) {
  console.error('ERROR: namesTarget not found');
  process.exit(1);
}
content = content.replace(namesTarget, namesReplacement);

// 7. Add jewel-glow to countdown jewels
content = content.replace(
  'class="bg-gradient-to-br from-[#8B1220] to-[#600C16] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37]/70 shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-75"',
  'class="bg-gradient-to-br from-[#8B1220] to-[#600C16] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37] shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-75 jewel-glow"'
);
content = content.replace(
  'class="bg-gradient-to-br from-[#1E5631] to-[#11381F] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37]/70 shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-150"',
  'class="bg-gradient-to-br from-[#1E5631] to-[#11381F] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37] shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-150 jewel-glow"'
);
content = content.replace(
  'class="bg-gradient-to-br from-[#D35400] to-[#8E3200] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37]/70 shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-225"',
  'class="bg-gradient-to-br from-[#D35400] to-[#8E3200] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37] shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-225 jewel-glow"'
);
content = content.replace(
  'class="bg-gradient-to-br from-[#6C1D45] to-[#400E27] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37]/70 shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-300"',
  'class="bg-gradient-to-br from-[#6C1D45] to-[#400E27] text-white rounded-2xl py-3 px-1 text-center border-2 border-[#D4AF37] shadow-md transform hover:-translate-y-1 transition duration-300 reveal-pop delay-300 jewel-glow"'
);

// 8. Add badge-pulse to Shubh Vivah badge
content = content.replace(
  'class="text-[11px] tracking-[0.35em] uppercase text-[#8B1220] font-bold drop-shadow-sm bg-[#FFFDF8]/90 px-3 py-0.5 rounded-full border border-[#D4AF37]"',
  'class="text-[11px] tracking-[0.35em] uppercase text-[#8B1220] font-bold drop-shadow-sm bg-[#FFFDF8]/90 px-3 py-0.5 rounded-full border border-[#D4AF37] badge-pulse"'
);

// 9. Add radar ring effect to Venue cards location pins
content = content.replace(
  '<span class="w-2 h-2 rounded-full bg-[#FF4500] animate-ping"></span>',
  '<span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4500]"></span></span>'
);
content = content.replace(
  '<span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping"></span>',
  '<span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]"></span></span>'
);

fs.writeFileSync('index.html', content, 'utf8');
console.log('Successfully added rich motion graphics and animations to index.html!');

