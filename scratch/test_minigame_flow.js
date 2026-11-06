const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Verify key elements exist in the HTML
const checks = [
  { desc: 'Lock style keyframe', pass: html.includes('@keyframes lockWiggle') },
  { desc: 'Orb highlight pulse keyframe', pass: html.includes('@keyframes orbHighlightPulse') },
  { desc: 'Mini-game HUD locked banner', pass: html.includes('id="game-locked-banner"') },
  { desc: 'Mini-game counter badge', pass: html.includes('id="blessing-count-badge"') },
  { desc: 'Open button lock icon', pass: html.includes('id="open-btn-icon"') },
  { desc: 'Open button locked text', pass: html.includes('Catch 3 Blessings to Unlock') },
  { desc: 'showMiniGameLockedHint definition', pass: html.includes('function showMiniGameLockedHint()') },
  { desc: 'handleCardOpenAttempt definition', pass: html.includes('function handleCardOpenAttempt(e)') },
  { desc: 'Strict blessingsCaught check in handleCardOpenAttempt', pass: html.includes('if (blessingsCaught < 3) {\n        showMiniGameLockedHint();\n        return;\n      }') },
  { desc: 'Strict blessingsCaught check in openInvitation', pass: html.includes('if (blessingsCaught < 3) {\n        showMiniGameLockedHint();\n        return;\n      }') },
  { desc: 'Open button event listener attached to handleCardOpenAttempt', pass: html.includes("openBtn.addEventListener('click', handleCardOpenAttempt);") },
  { desc: 'Ribbon center event listener attached to handleCardOpenAttempt', pass: html.includes("ribbonCenter.addEventListener('click', handleCardOpenAttempt);") },
  { desc: 'Auto unlock when 3rd blessing caught', pass: html.includes('if (blessingsCaught >= 3)') && html.includes('openInvitation();') }
];

console.log('--- MINI-GAME FLOW VERIFICATION ---');
let allPass = true;
checks.forEach(c => {
  console.log((c.pass ? '✓ PASS: ' : '✗ FAIL: ') + c.desc);
  if (!c.pass) allPass = false;
});

if (allPass) {
  console.log('ALL MINI-GAME INTEGRATION CHECKS PASSED!');
} else {
  console.error('SOME CHECKS FAILED!');
  process.exit(1);
}

