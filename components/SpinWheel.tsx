'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

// Types
interface SpinWheelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  phone: string;
  countryCode: string;
}

interface WheelState {
  currentSpin: number;
  maxSpins: number;
  isSpinning: boolean;
  allSpinsComplete: boolean;
  detailsCollected: boolean;
  userPhoneFull: string;
  userName: string;
  pendingPrize: number | null;
  claimed: boolean;
  idleRotation: number;
}

interface SupabaseClient {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<{ data: { id: string } | null }>;
      };
    };
  };
}

declare global {
  interface Window {
    confetti?: (options: { particleCount: number; spread: number; origin: { y: number } }) => void;
    supabase?: {
      createClient: (url: string, key: string) => SupabaseClient;
    };
  }
}

// Constants
const SUPABASE_URL = 'https://rplhksxrekbcbhgzcjir.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbGhrc3hyZWtiY2JoZ3pjamlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNTI2ODUsImV4cCI6MjA2NzcyODY4NX0.Rd_12MZmCPKFeA_WePWA57m0MED6gMRjJhkxauH41D4';

const PRIZES = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400];
const SEGMENT_ANGLE = 30;

export default function SpinWheel({ isOpen, onClose }: SpinWheelProps) {
  const [wheelState, setWheelState] = useState<WheelState>({
    currentSpin: 0,
    maxSpins: 5,
    isSpinning: false,
    allSpinsComplete: false,
    detailsCollected: false,
    userPhoneFull: '',
    userName: '',
    pendingPrize: null,
    claimed: false,
    idleRotation: 0
  });

  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    countryCode: '+971'
  });

  const [message, setMessage] = useState('');
  const [showControlPanel, setShowControlPanel] = useState(false);
  
  const segmentsRef = useRef<HTMLDivElement>(null);
  const idleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const supabaseRef = useRef<SupabaseClient | null>(null);

  // Load external dependencies
  const loadConfetti = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (window.confetti) return resolve();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }, []);

  const loadSupabase = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (supabaseRef.current) return resolve();
      if (window.supabase) {
        supabaseRef.current = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        return resolve();
      }
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => {
        supabaseRef.current = window.supabase?.createClient(SUPABASE_URL, SUPABASE_KEY) || null;
        resolve();
      };
      document.head.appendChild(script);
    });
  }, []);

  // Idle rotation effect
  useEffect(() => {
    if (isOpen && !wheelState.isSpinning && segmentsRef.current) {
      const idleSpeed = 0.2;
      idleIntervalRef.current = setInterval(() => {
        setWheelState(prev => {
          const newRotation = (prev.idleRotation + idleSpeed) % 360;
          if (segmentsRef.current) {
            segmentsRef.current.style.transform = `rotate(${newRotation}deg)`;
          }
          return { ...prev, idleRotation: newRotation };
        });
      }, 50);
    } else if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }

    return () => {
      if (idleIntervalRef.current) {
        clearInterval(idleIntervalRef.current);
        idleIntervalRef.current = null;
      }
    };
  }, [isOpen, wheelState.isSpinning]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setWheelState(prev => ({
        ...prev,
        currentSpin: 0,
        allSpinsComplete: false,
        idleRotation: 0
      }));
      if (segmentsRef.current) {
        segmentsRef.current.style.transform = 'rotate(0deg)';
      }
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const validateForm = (): boolean => {
    if (!userData.name.trim()) {
      setMessage('Please enter your name to spin!');
      return false;
    }
    if (!userData.phone.trim()) {
      setMessage('Please enter your WhatsApp number to spin!');
      return false;
    }
    if (!/^\d{7,15}$/.test(userData.phone.trim())) {
      setMessage('Enter a valid UAE WhatsApp number (digits only).');
      return false;
    }
    return true;
  };

  const spinWheel = async () => {
    if (wheelState.claimed || wheelState.isSpinning || wheelState.currentSpin >= wheelState.maxSpins || wheelState.allSpinsComplete) {
      return;
    }

    // Reset pending prize if exists
    if (wheelState.pendingPrize) {
      setWheelState(prev => ({ ...prev, pendingPrize: null }));
      setMessage('Previous prize forfeited. Spinning again...');
    }

    // Validate form on first spin
    if (!wheelState.detailsCollected) {
      setShowControlPanel(true);
      
      if (!validateForm()) return;

      // Check for existing user
      await loadSupabase();
      const userPhoneFull = `${userData.countryCode}${userData.phone.trim()}`;
      
      try {
        if (!supabaseRef.current) {
          setMessage('Error loading database. Please try again.');
          return;
        }

        const { data: existing } = await supabaseRef.current
          .from('wheel_entries')
          .select('id')
          .eq('mobile', userPhoneFull)
          .maybeSingle();

        if (existing) {
          setMessage('Thank you for playing, you have already won!');
          return;
        }

        setWheelState(prev => ({
          ...prev,
          detailsCollected: true,
          userPhoneFull,
          userName: userData.name.trim()
        }));
        setMessage('');
      } catch (error) {
        console.error('Error checking user:', error);
        setMessage('Error checking user data. Please try again.');
        return;
      }
    }

    // Start spinning
    setWheelState(prev => ({
      ...prev,
      currentSpin: prev.currentSpin + 1,
      isSpinning: true
    }));

    // Stop idle rotation
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }

    // Calculate spin result
    const randomSegment = Math.floor(Math.random() * 12);
    const finalAngle = randomSegment * SEGMENT_ANGLE + Math.random() * SEGMENT_ANGLE;
    const totalRotation = wheelState.idleRotation + 1800 + finalAngle;

    // Apply spin animation
    if (segmentsRef.current) {
      segmentsRef.current.classList.add('spinning');
      segmentsRef.current.style.transform = `rotate(${totalRotation}deg)`;
    }

    // Load confetti
    await loadConfetti();

    // Handle spin completion
    setTimeout(async () => {
      if (segmentsRef.current) {
        segmentsRef.current.classList.remove('spinning');
      }

      const prizeAmount = PRIZES[randomSegment];
      
      // Trigger confetti
      if (window.confetti) {
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }

      setMessage(`🎉 Congratulations! You won AED ${prizeAmount}! 🎉`);

      setWheelState(prev => ({
        ...prev,
        isSpinning: false,
        allSpinsComplete: prev.currentSpin >= prev.maxSpins,
        pendingPrize: prizeAmount
      }));
    }, 3800);
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    if (message) setMessage('');
  };

  if (!isOpen) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;

  return (
    <>
      <style jsx>{`
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
          width: ${isMobile ? '204px' : '298px'};
          height: ${isMobile ? '204px' : '298px'};
          border-radius: 50%;
          margin-bottom: 20px;
          margin-top: 10px;
          box-shadow: 
            0 0 0 4px rgba(156, 163, 175, 0.4),
            0 0 40px rgba(156, 163, 175, 0.6),
            0 15px 50px rgba(0, 0, 0, 0.5);
          animation: ${wheelState.allSpinsComplete ? 'none' : 'wheelGlow 2s ease-in-out infinite alternate'};
          transition: all 0.3s ease;
          ${wheelState.allSpinsComplete ? 'filter: grayscale(50%);' : ''}
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
          width: ${isMobile ? '68px' : '85px'};
          height: ${isMobile ? '68px' : '85px'};
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
          font-size: ${isMobile ? '10px' : '12px'};
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
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }
        
        .wheel-label span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateY(-${isMobile ? '68px' : '102px'}) rotate(90deg);
          font: normal ${isMobile ? '9px' : '11px'} "Impact", "Arial Black", sans-serif;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
        }
        
        .spin-button {
          background: linear-gradient(145deg, #9CA3AF, #F3F4F6);
          color: #1a1a1a;
          border: none;
          padding: ${isMobile ? '12px 18px' : '15px 35px'};
          font-size: ${isMobile ? '14px' : '18px'};
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: ${isMobile ? '0.8px' : '1px'};
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 20px rgba(156, 163, 175, 0.4);
          margin-top: ${isMobile ? '8px' : '25px'};
          margin-bottom: ${isMobile ? '15px' : '20px'};
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
          margin-top: ${isMobile ? '10px' : '0'};
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
          max-height: ${showControlPanel ? '306px' : '0'};
          opacity: ${showControlPanel ? '1' : '0'};
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
          width: 288px;
          max-width: 90%;
          margin: ${isMobile ? '8px auto 0' : '10px auto 0'};
          background: linear-gradient(145deg, #1a1a1a, #222);
          border: 1px solid rgba(156, 163, 175, 0.4);
          border-radius: 12px;
          padding: 13px 18px;
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
          font-size: ${isMobile ? '16px' : '13px'};
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
          white-space: ${isMobile ? 'normal' : 'nowrap'};
          line-height: ${isMobile ? '1.3' : 'normal'};
        }
        
        @keyframes wheelGlow {
          0% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.4), 0 0 40px rgba(156, 163, 175, 0.6), 0 15px 50px rgba(0, 0, 0, 0.5); }
          100% { box-shadow: 0 0 0 4px rgba(156, 163, 175, 0.7), 0 0 60px rgba(156, 163, 175, 0.9), 0 15px 50px rgba(0, 0, 0, 0.5); }
        }
      `}</style>

      <div className={`wheel-modal ${isOpen ? 'active' : ''}`}>
        <button className="wheel-close-x" onClick={onClose}>×</button>
        
        <h2 className="wheel-title">
          SPIN TO WIN A GIFT CARD TOWARDS<br />YOUR NEXT MERCEDES-BENZ SERVICE!
        </h2>
        
        <div className="spin-counter">
          Spin {wheelState.currentSpin} of {wheelState.maxSpins}
          {wheelState.currentSpin === wheelState.maxSpins ? ' - FINAL SPIN!' : ''}
        </div>
        
        <div className="spin-wheel" onClick={(e) => e.stopPropagation()}>
          <div 
            ref={segmentsRef}
            className="wheel-segments"
          >
            {PRIZES.map((amount, index) => {
              const midAngle = index * SEGMENT_ANGLE + 15;
              return (
                <div
                  key={index}
                  className="wheel-label"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${midAngle}deg)`
                  }}
                >
                  <span
                    style={{
                      color: index % 2 === 0 ? '#1a1a1a' : '#fff',
                      textShadow: index % 2 === 0 
                        ? '0 1px 3px rgba(255,255,255,0.8)' 
                        : '0 1px 3px rgba(0,0,0,0.8)'
                    }}
                  >
                    AED {amount}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="wheel-pointer"></div>
          <div className="wheel-center" onClick={spinWheel}>
            Spin<br />to<br />Win
          </div>
        </div>
        
        <div className="wheel-control-panel">
          <div className="input-group">
            <label htmlFor="wheelUserName">Name</label>
            <input
              type="text"
              id="wheelUserName"
              placeholder="Your Name"
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>WhatsApp Number</label>
            <div className="phone-row">
              <input
                type="text"
                value={userData.countryCode}
                readOnly
                style={{ cursor: 'not-allowed' }}
              />
              <input
                type="tel"
                placeholder="5xxxxxxx"
                value={userData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>
          </div>
          <div className="panel-message">{message}</div>
        </div>
        
        <button
          className="spin-button"
          onClick={spinWheel}
          disabled={wheelState.isSpinning || wheelState.allSpinsComplete}
        >
          {wheelState.isSpinning 
            ? 'SPINNING...' 
            : wheelState.currentSpin === wheelState.maxSpins 
              ? 'FINAL SPIN' 
              : 'Spin the Wheel'
          }
        </button>
        
        <button className="close-wheel" onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
} 