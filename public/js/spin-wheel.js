// Spin to Win Wheel - Exact Original Implementation
window.initializeSpinWheel = function initializeSpinWheel() {
  const spinBtn = document.getElementById('spinToWinBtn');
  
  /* ---------------------------------------------
     Supabase configuration & lazy loader
  ---------------------------------------------*/
  const SUPABASE_URL = 'https://rplhksxrekbcbhgzcjir.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGhrc3hyZWtiY2JoZ3pjamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTI2ODUsImV4cCI6MjA2NzcyODY4NX0.Rd_12MZmCPKFeA_WePWA57m0MED6gMRjJhkxauH41D4';

  /* --------------- Confetti loader --------------- */
  let confettiReady = null;
  function loadConfetti() {
    if (confettiReady) return confettiReady;
    confettiReady = new Promise((resolve) => {
      if (window.confetti) return resolve();
      const scr = document.createElement('script');
      scr.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
      scr.onload = () => resolve();
      document.head.appendChild(scr);
    });
    return confettiReady;
  }

  let supabase;            // Supabase client instance
  let supabaseReady = null; // Promise guard

  function loadSupabase() {
    if (supabaseReady) return supabaseReady;
    supabaseReady = new Promise((resolve) => {
      if (window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return resolve();
      }
      const scr = document.createElement('script');
      scr.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      scr.onload = () => {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        resolve();
      };
      document.head.appendChild(scr);
    });
    return supabaseReady;
  }
  
  if (!spinBtn) {
    return; // Don't retry if button doesn't exist
  }
  
  let isWheelOpen = false;
  let isSpinning = false;
  let currentSpin = 0;
  let maxSpins = 5;
  let allSpinsComplete = false;

  // Add required CSS styles
  if (!document.getElementById('spin-wheel-styles')) {
    const style = document.createElement('style');
    style.id = 'spin-wheel-styles';
    style.textContent = `
      @font-face {
        font-family: 'Impact';
        src: url('/assets/fonts/impact.ttf') format('truetype');
      }
      
      .wheel-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.95);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding-top: 40px;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        overflow-y: auto;
      }
      
      .wheel-modal.active {
        opacity: 1;
      }
      
      .wheel-title {
        color: #F3F4F6;
        font-size: 22px;
        font-weight: normal;
        font-family: 'Impact', 'Arial Black', sans-serif;
        text-align: center;
        margin-bottom: 15px;
        margin-top: 0;
        text-shadow: 0 2px 10px rgba(156, 163, 175, 0.5);
      }
      
      .spin-counter {
        color: #9CA3AF;
        font-size: 18px;
        font-weight: normal;
        font-family: 'Impact', 'Arial Black', sans-serif;
        text-align: center;
        margin-bottom: 15px;
        background: rgba(156, 163, 175, 0.1);
        padding: 10px 20px;
        border-radius: 20px;
        border: 2px solid rgba(156, 163, 175, 0.3);
      }
      
      .spin-wheel {
        position: relative;
        width: 298px;
        height: 298px;
        border-radius: 50%;
        margin-bottom: 20px;
        margin-top: 10px;
        box-shadow: 
          0 0 0 4px rgba(156, 163, 175, 0.4),
          0 0 40px rgba(156, 163, 175, 0.6),
          0 15px 50px rgba(0, 0, 0, 0.5);
        animation: wheelGlow 2s ease-in-out infinite alternate;
        transition: all 0.3s ease;
      }
      
      .spin-wheel.disabled {
        animation: none;
        box-shadow: 
          0 0 0 4px rgba(100, 100, 100, 0.4),
          0 0 20px rgba(100, 100, 100, 0.3),
          0 15px 50px rgba(0, 0, 0, 0.5);
        filter: grayscale(50%);
      }
      
      .wheel-segments {
        position: absolute;
        inset: 8px;
        border-radius: 50%;
        background: conic-gradient(
          from 0deg,
          #9CA3AF 0deg 30deg, #2a2a2a 30deg 60deg,
          #9CA3AF 60deg 90deg, #2a2a2a 90deg 120deg,
          #9CA3AF 120deg 150deg, #2a2a2a 150deg 180deg,
          #9CA3AF 180deg 210deg, #2a2a2a 210deg 240deg,
          #9CA3AF 240deg 270deg, #2a2a2a 270deg 300deg,
          #9CA3AF 300deg 330deg, #2a2a2a 330deg 360deg
        );
        transition: transform 0.3s ease;
        box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
      }
      
      .wheel-segments.spinning {
        transition: transform 3.8s cubic-bezier(0.12, 0.85, 0.33, 1);
      }
      
      .wheel-pointer {
        position: absolute;
        top: -13px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 21px solid #9CA3AF;
        z-index: 10;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6));
      }
      
      .wheel-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 85px;
        height: 85px;
        background: linear-gradient(145deg, #F3F4F6, #9CA3AF);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #1a1a1a;
        z-index: 5;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
        font-family: 'Impact', 'Arial Black', sans-serif;
        font-weight: normal;
        font-size: 12px; 
        color: #1a1a1a;
        text-align: center; 
        line-height: 1.1;
        text-transform: uppercase;
        cursor: pointer;
      }
      
      .wheel-label {
        position: absolute;
        pointer-events: none;
        z-index: 3;
      }
      
      .wheel-label span {
        display: block;
        font: normal 13px 'Impact', 'Arial Black', sans-serif;
        text-align: center;
        white-space: nowrap;
        text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        transform-origin: center center;
        user-select: none;
        pointer-events: none;
      }
      
      .spin-button {
        background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
        color: #1a1a1a;
        border: none;
        padding: 15px 35px;
        font-size: 18px;
        font-weight: normal;
        font-family: 'Impact', 'Arial Black', sans-serif;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 6px 20px rgba(156, 163, 175, 0.4);
        margin-top: 25px;
        margin-bottom: 20px;
        white-space: nowrap;
      }
      
      .spin-button:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(156, 163, 175, 0.6);
      }
      
      .spin-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
        background: #666 !important;
        color: #999 !important;
      }
      
      .close-wheel {
        background: transparent;
        color: #F3F4F6;
        border: 2px solid #9CA3AF;
        padding: 10px 25px;
        font-size: 14px;
        font-weight: normal;
        font-family: 'Impact', 'Arial Black', sans-serif;
        border-radius: 25px;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .close-wheel:hover {
        background: #9CA3AF;
        color: #1a1a1a;
      }
      
      .wheel-close-x {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(156, 163, 175, 0.8);
        border: 2px solid #F3F4F6;
        border-radius: 50%;
        color: #1a1a1a;
        font-size: 20px;
        font-weight: normal;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10002;
        transition: all 0.3s ease;
      }
      
      .wheel-close-x:hover {
        background: #F3F4F6;
        transform: scale(1.1);
      }
      
      .wheel-control-panel {
        max-height: 0;
        opacity: 0;
        overflow: hidden;
        transition: max-height 0.4s ease, opacity 0.4s ease;
        width: 288px;
        max-width: 90%;
        margin: 10px auto 0;
        background: linear-gradient(145deg, #1a1a1a, #222);
        border: 1px solid rgba(156, 163, 175, 0.4);
        border-radius: 12px;
        padding: 13px 18px;
      }

      .wheel-control-panel.open {
        max-height: 306px;
        opacity: 1;
      }

      .wheel-control-panel .input-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }

      .wheel-control-panel .phone-row {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
      }

      .wheel-control-panel .phone-row input:first-child {
        max-width: 72px;
        text-align: center;
        cursor: not-allowed;
      }

      .wheel-control-panel .phone-row input:last-child {
        flex: 1;
      }

      .wheel-control-panel input {
        width: 100%;
        box-sizing: border-box;
        padding: 9px 10px;
        border-radius: 6px;
        border: 1px solid #666;
        background: #222;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        font-weight: normal;
        font-size: 13px;
      }

      .wheel-control-panel label {
        color: #F3F4F6;
        font-size: 13px;
        margin-bottom: 3px;
        font-family: 'Montserrat', sans-serif;
        font-weight: normal;
        text-align: left;
      }

      .wheel-control-panel .panel-message {
        color: #9CA3AF;
        font-size: 13px;
        min-height: 16px;
        font-family: 'Montserrat', sans-serif;
        font-weight: normal;
        text-align: center;
        white-space: nowrap;
      }
      
      @keyframes wheelGlow {
        0% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.6), 0 15px 50px rgba(0, 0, 0, 0.5); }
        100% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.7), 0 0 60px rgba(156, 163, 175, 0.9), 0 15px 50px rgba(0, 0, 0, 0.5); }
      }
      
      @media (max-width: 480px) {
        .wheel-control-panel input {
          font-size: 16px;
        }
        .wheel-control-panel .panel-message {
          white-space: normal;
          line-height: 1.3;
        }
        .spin-wheel { 
          width: 204px; 
          height: 204px; 
          overflow: hidden;
          border-radius: 50%;
          clip-path: circle(50% at 50% 50%);
          border: 4px solid rgba(156,163,175,0.7);
          box-shadow: 0 0 20px rgba(156,163,175,0.6);
        }
        .wheel-center { width: 68px; height: 68px; font-size: 10px; }
        .wheel-title { font-size: 18px; margin-top: 10px; }
        .wheel-label span { font-size: 9px; }
        .wheel-modal {
          justify-content: flex-start;
          padding-top: 10px;
          overflow-y: auto;
        }
        .wheel-control-panel { margin-top: 8px; }
        .spin-button { 
          margin-top: 8px; 
          margin-bottom: 15px; 
          font-size: 14px;
          padding: 12px 18px;
          letter-spacing: 0.8px;
        }
        .close-wheel { margin-top: 10px; }
      }
    `;
    document.head.appendChild(style);
  }

  // Create wheel modal
  function createWheelModal() {
    const modal = document.createElement('div');
    modal.className = 'wheel-modal';
    modal.innerHTML = `
      <button class="wheel-close-x">×</button>
      <h2 class="wheel-title">SPIN TO WIN A GIFT CARD TOWARDS<br>YOUR NEXT MERCEDES-BENZ SERVICE!</h2>
      <div class="spin-counter">Spin ${currentSpin} of ${maxSpins}${currentSpin === maxSpins ? ' - FINAL SPIN!' : ''}</div>
      <div class="spin-wheel">
        <div class="wheel-segments"></div>
        <div class="wheel-pointer"></div>
        <div class="wheel-center">Spin<br>to<br>Win</div>
      </div>
      <div class="wheel-control-panel">
        <div class="input-group">
          <label for="wheelUserName">Name</label>
          <input type="text" id="wheelUserName" placeholder="Your Name" />
        </div>
        <div class="input-group">
          <label>WhatsApp Number</label>
          <div class="phone-row">
            <input type="text" id="wheelUserCountryCode" value="+971" readonly />
            <input type="tel" id="wheelUserPhone" placeholder="5xxxxxxx" />
          </div>
        </div>
        <div class="panel-message" id="panelMessage"></div>
      </div>
      <button class="spin-button">${currentSpin === maxSpins ? 'FINAL SPIN' : 'Spin the Wheel'}</button>
      <button class="close-wheel">Close</button>
    `;
    
    // Add prize labels that rotate with the wheel segments
    const wheel = modal.querySelector('.spin-wheel');
    const segments = modal.querySelector('.wheel-segments');
    const prizes = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
    const isMobile = window.innerWidth <= 480;
    const textRadius = isMobile ? 68 : 102;
    const prizeFontSize = isMobile ? 9 : 11;
    
    prizes.forEach((amount, index) => {
      const segmentAngle = 30;
      const midAngle = index * segmentAngle + 15;
      
      const label = document.createElement('div');
      label.className = 'wheel-label';
      label.style.position = 'absolute';
      label.style.left = '50%';
      label.style.top = '50%';
      label.style.transform = `translate(-50%, -50%) rotate(${midAngle}deg)`;
      label.style.transformOrigin = 'center center';
      label.style.pointerEvents = 'none';
      label.style.zIndex = '3';
      
      const span = document.createElement('span');
      span.textContent = `AED ${amount}`;
      span.style.position = 'absolute';
      span.style.left = '50%';
      span.style.top = '50%';
      span.style.transform = `translate(-50%, -50%) translateY(-${textRadius}px) rotate(90deg)`;
      span.style.font = `normal ${prizeFontSize}px "Impact", "Arial Black", sans-serif`;
      span.style.textAlign = 'center';
      span.style.whiteSpace = 'nowrap';
      span.style.userSelect = 'none';
      span.style.pointerEvents = 'none';
      span.style.color = index % 2 === 0 ? '#1a1a1a' : '#fff';
      span.style.textShadow = index % 2 === 0 ? '0 1px 3px rgba(255,255,255,0.8)' : '0 1px 3px rgba(0,0,0,0.8)';
      
      label.appendChild(span);
      segments.appendChild(label);
    });
    
    return modal;
  }

  // Open wheel modal
  function openWheel() {
    if (isWheelOpen) return;
    
    isWheelOpen = true;
    const modal = createWheelModal();
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Reset wheel position and activate modal
    const segments = modal.querySelector('.wheel-segments');
    segments.style.transform = 'rotate(0deg)';
    
    // Begin idle spin
    let idleRotation = 0;
    const idleSpeed = 0.2;
    modal.idleRotation = idleRotation;
    modal.idleInterval = setInterval(() => {
      idleRotation = (idleRotation + idleSpeed) % 360;
      segments.style.transform = `rotate(${idleRotation}deg)`;
      modal.idleRotation = idleRotation;
    }, 50);
    
    setTimeout(() => modal.classList.add('active'), 50);
    
    // Add event listeners
    const spinButton = modal.querySelector('.spin-button');
    const closeButton = modal.querySelector('.close-wheel');
    const closeXButton = modal.querySelector('.wheel-close-x');
    const wheelCenter = modal.querySelector('.wheel-center');
    
    spinButton.addEventListener('click', () => spinWheel(modal));
    wheelCenter.addEventListener('click', () => spinWheel(modal));
    closeButton.addEventListener('click', () => closeWheel(modal));
    closeXButton.addEventListener('click', () => closeWheel(modal));
    
    // Prevent wheel area clicks from closing modal
    const wheelElement = modal.querySelector('.spin-wheel');
    wheelElement.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    
    // Close on ESC key
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeWheel(modal);
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  // Update spin display
  function updateSpinDisplay(modal) {
    const spinCounter = modal.querySelector('.spin-counter');
    const spinButton = modal.querySelector('.spin-button');
    
    if (spinCounter) {
      spinCounter.textContent = `Spin ${currentSpin} of ${maxSpins}${currentSpin === maxSpins ? ' - FINAL SPIN!' : ''}`;
    }
    
    if (spinButton && !allSpinsComplete) {
      spinButton.textContent = currentSpin === maxSpins ? 'FINAL SPIN' : 'Spin the Wheel';
      spinButton.disabled = false;
    } else if (spinButton && allSpinsComplete) {
      spinButton.disabled = true;
      spinButton.style.opacity = '0.5';
      spinButton.style.cursor = 'not-allowed';
    }
  }

  // Close wheel modal
  function closeWheel(modal) {
    if (!isWheelOpen) return;
    if (modal.idleInterval) {
      clearInterval(modal.idleInterval);
      modal.idleInterval = null;
    }
    isWheelOpen = false;
    currentSpin = 0;
    allSpinsComplete = false;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  // Spin the wheel
  async function spinWheel(modal) {
    if (modal.claimed) return;

    if (modal.pendingPrize) {
      const actionContainer = modal.querySelector('.panel-actions');
      if (actionContainer) actionContainer.remove();
      modal.pendingPrize = null;
      const panelMessageEl = modal.querySelector('#panelMessage');
      if (panelMessageEl) panelMessageEl.textContent = 'Previous prize forfeited. Spinning again...';
    }

    const controlPanel = modal.querySelector('.wheel-control-panel');
    const nameInput = modal.querySelector('#wheelUserName');
    const phoneInput = modal.querySelector('#wheelUserPhone');
    const countryCodeInput = modal.querySelector('#wheelUserCountryCode');
    const panelMsg = modal.querySelector('#panelMessage');

    if (!modal.detailsCollected) {
      if (controlPanel && !controlPanel.classList.contains('open')) {
        controlPanel.classList.add('open');
      }

      if (!nameInput.value.trim() || !phoneInput.value.trim()) {
        if (panelMsg) panelMsg.textContent = 'Please enter your name and WhatsApp number to spin!';
        return;
      }

      if (!/^\d{7,15}$/.test(phoneInput.value.trim())) {
        if (panelMsg) panelMsg.textContent = 'Enter a valid UAE WhatsApp number (digits only).';
        return;
      }
      
      modal.userPhoneFull = `${countryCodeInput.value}${phoneInput.value.trim()}`;
      modal.userName = nameInput.value.trim();

      await loadSupabase();
      const { data: existing } = await supabase
        .from('wheel_entries')
        .select('id')
        .eq('mobile', modal.userPhoneFull)
        .maybeSingle();

      if (existing) {
        if (panelMsg) panelMsg.textContent = 'Thank you for playing, you have already won!';
        return;
      }

      modal.detailsCollected = true;
      if (panelMsg) panelMsg.textContent = '';
    }

    if (isSpinning || currentSpin >= maxSpins || allSpinsComplete) return;

    currentSpin++;
    updateSpinDisplay(modal);
    isSpinning = true;

    const segments = modal.querySelector('.wheel-segments');
    const spinButton = modal.querySelector('.spin-button');
    
    if (modal.idleInterval) {
      clearInterval(modal.idleInterval);
      modal.idleInterval = null;
    }

    spinButton.disabled = true;
    spinButton.textContent = 'SPINNING...';

    const prizes = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
    const segmentAngle = 30;
    const randomSegment = Math.floor(Math.random() * 12);
    const finalAngle = randomSegment * segmentAngle + Math.random() * segmentAngle;
    const totalRotation = modal.idleRotation + 1800 + finalAngle;

    segments.classList.add('spinning');
    segments.style.transform = `rotate(${totalRotation}deg)`;

    // Load confetti
    await loadConfetti();

    setTimeout(async () => {
      isSpinning = false;
      segments.classList.remove('spinning');
      
      const prizeAmount = prizes[randomSegment];
      
      // Trigger confetti
      if (window.confetti) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      
      if (panelMsg) {
        panelMsg.textContent = `🎉 Congratulations! You won AED ${prizeAmount}! 🎉`;
      }

      if (currentSpin >= maxSpins) {
        allSpinsComplete = true;
      }
      
      updateSpinDisplay(modal);
      
    }, 3800);
  }

  // Initialize when button is clicked
  spinBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    if (isWheelOpen) return;
    
    // Load dependencies first
    Promise.all([loadConfetti(), loadSupabase()]).then(() => {
      openWheel();
    }).catch(err => {
      console.error('Failed to load dependencies:', err);
    });
  });
};

// Auto-initialize if the button exists
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', window.initializeSpinWheel);
} else {
  window.initializeSpinWheel();
} 