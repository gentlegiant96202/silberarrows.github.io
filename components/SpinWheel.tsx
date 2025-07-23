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
  currentPrize: number | null;
  finalPrize: number | null;
  claimed: boolean;
  idleRotation: number;
  showForfeitConfirm: boolean;
}

interface SupabaseError {
  message: string;
  code?: string;
  details?: string;
  hint?: string;
}

interface SupabaseResponse {
  data: { id: string } | null;
  error: SupabaseError | null;
}

interface SupabaseClient {
  from: (table: string) => {
    select: (columns: string) => {
      eq: (column: string, value: string) => {
        maybeSingle: () => Promise<SupabaseResponse>;
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
    currentPrize: null,
    finalPrize: null,
    claimed: false,
    idleRotation: 0,
    showForfeitConfirm: false
  });

  const [userData, setUserData] = useState<UserData>({
    name: '',
    phone: '',
    countryCode: '+971'
  });

  const [message, setMessage] = useState('');
  const [showExpandableForm, setShowExpandableForm] = useState(false); // Form expands from game display
  
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
    return new Promise<void>((resolve, reject) => {
      console.log('🔧 Loading Supabase...');
      
      if (supabaseRef.current) {
        console.log('✅ Supabase already loaded');
        return resolve();
      }
      
      if (window.supabase) {
        console.log('✅ Supabase found in window, creating client...');
        try {
          supabaseRef.current = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
          console.log('✅ Supabase client created successfully');
          return resolve();
        } catch (error) {
          console.error('❌ Failed to create Supabase client:', error);
          return reject(error);
        }
      }
      
      console.log('📦 Loading Supabase from CDN...');
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      
      script.onload = () => {
        console.log('📦 Supabase script loaded from CDN');
        try {
          if (window.supabase) {
            supabaseRef.current = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
            console.log('✅ Supabase client created from CDN');
            resolve();
          } else {
            console.error('❌ Supabase not available after script load');
            reject(new Error('Supabase not available after script load'));
          }
        } catch (error) {
          console.error('❌ Failed to create Supabase client from CDN:', error);
          reject(error);
        }
      };
      
      script.onerror = () => {
        console.error('❌ Failed to load Supabase script from CDN');
        reject(new Error('Failed to load Supabase script'));
      };
      
      document.head.appendChild(script);
    });
  }, []);

  // Idle rotation effect - only before first spin
  useEffect(() => {
    // Start idle rotation ONLY before the user performs the first spin.
    if (isOpen && !wheelState.isSpinning && wheelState.currentSpin === 0 && segmentsRef.current) {
      // Add a small delay before resuming idle rotation to avoid glitches
      const delayTimeout = setTimeout(() => {
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
      }, 100); // 100ms delay
      
      return () => clearTimeout(delayTimeout);
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
  }, [isOpen, wheelState.isSpinning, wheelState.currentSpin]); // Added currentSpin dependency

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setWheelState(prev => ({
        ...prev,
        currentSpin: 0,
        allSpinsComplete: false,
        idleRotation: 0,
        currentPrize: null,
        finalPrize: null,
        showForfeitConfirm: false,
        detailsCollected: false
      }));
      setUserData({
        name: '',
        phone: '',
        countryCode: '+971'
      });
      setMessage('');
      setShowExpandableForm(false); // Don't show expandable form when opening
      if (segmentsRef.current) {
        segmentsRef.current.style.transform = 'rotate(0deg)';
      }
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !wheelState.showForfeitConfirm) {
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
  }, [isOpen, onClose, wheelState.showForfeitConfirm]);

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

  const handleAcceptPrize = async () => {
    if (wheelState.currentPrize) {
      // Update state immediately for UI feedback
      setWheelState(prev => ({
        ...prev,
        finalPrize: prev.currentPrize,
        allSpinsComplete: true,
        claimed: true
      }));
      
      setMessage('🎉 Processing your claim, please wait...');

      try {
        // Send to API endpoint (handles both database save and webhook)
        console.log('📤 Sending webhook notification...');
        const webhookData = {
          data: {
            name: wheelState.userName,
            mobile: wheelState.userPhoneFull,
            prize: wheelState.currentPrize
          }
        };

        const webhookResponse = await fetch('/api/webhook/prize-claim', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData)
        });

        if (!webhookResponse.ok) {
          throw new Error(`Webhook failed: ${webhookResponse.status}`);
        }

        console.log('✅ Webhook sent successfully');
        setMessage(`🎉 Congratulations! You've claimed AED ${wheelState.currentPrize}! Confirmation will be sent on WhatsApp. 🎉`);

      } catch (error: unknown) {
        const err = error as Error;
        console.error('❌ Failed to process claim:', err);
        setMessage(`🎉 Congratulations! You've claimed AED ${wheelState.currentPrize}! (Note: There may be a delay in confirmation) 🎉`);
      }
    }
  };



  const startActualSpin = async () => {
    // Start spinning logic extracted from spinWheel
    if (wheelState.claimed || wheelState.isSpinning || wheelState.allSpinsComplete) {
      return;
    }

    // Check if we've reached max spins
    if (wheelState.currentSpin >= wheelState.maxSpins) {
      return;
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

    // Natural spin physics - make each spin feel unique and realistic
    // Use incremented spin number since we just incremented currentSpin above
    const spinNumber = wheelState.currentSpin + 1;
    
    // Variable spin intensity based on game progression
    // Early spins are more energetic, later spins more controlled
    const baseRotations = 3 + Math.random() * 3 + (5 - spinNumber) * 0.5; // 3-6.5 rotations, decreasing over time
    const spinVariance = 0.3 + Math.random() * 0.4; // 0.3-0.7 additional variance
    const totalRotations = baseRotations + spinVariance;
    
    // GAME LOGIC: Prize selection based on spin number
    let targetPrizeIndex;
    let selectedPrize;
    
    // PRIZES = [1000, 50, 900, 100, 800, 200, 700, 250, 600, 300, 500, 400]
    // Valid low prizes (50-250): indices 1, 3, 5, 7 (prizes: 50, 100, 200, 250)
    // Prize 500: index 10
    
    if (spinNumber < 5) {
      // First 4 spins: only prizes between 50-250
      const validLowPrizeIndices = [1, 3, 5, 7]; // 50, 100, 200, 250
      targetPrizeIndex = validLowPrizeIndices[Math.floor(Math.random() * validLowPrizeIndices.length)];
      selectedPrize = PRIZES[targetPrizeIndex];
    } else {
      // 5th spin: always land on 500
      targetPrizeIndex = 10; // 500 is at index 10
      selectedPrize = PRIZES[targetPrizeIndex];
    }
    
    console.log('🎯 DEBUG - Spin #:', spinNumber, 'Total rotations:', totalRotations.toFixed(2));
    console.log('🎯 DEBUG - Target Prize:', selectedPrize, 'at index:', targetPrizeIndex);
    console.log('🎯 DEBUG - Available prizes for this spin level:', spinNumber < 5 ? [50, 100, 200, 250] : [500]);
    
    // Calculate exact target position - no variance for accurate landing
    const segmentCenterAngle = targetPrizeIndex * SEGMENT_ANGLE + (SEGMENT_ANGLE / 2);
    
    // Calculate where the wheel needs to stop for the pointer to hit this segment center
    // The pointer is at 0°, so we need the target segment center to be at 0°
    let targetStopAngle = 360 - segmentCenterAngle;
    
    // Normalize to 0-360 range
    while (targetStopAngle >= 360) {
      targetStopAngle -= 360;
    }
    while (targetStopAngle < 0) {
      targetStopAngle += 360;
    }
    
    console.log('🎯 DEBUG - Segment center angle:', segmentCenterAngle);
    console.log('🎯 DEBUG - Target stop angle:', targetStopAngle);
    
    // Calculate rotation from current position (where wheel currently is)
    const currentPosition = wheelState.idleRotation;
    const currentNormalized = currentPosition % 360;
    
    // Calculate how much we need to rotate to reach the target
    let rotationNeeded = targetStopAngle - currentNormalized;
    
    // Ensure natural forward rotation (always go forward)
    if (rotationNeeded <= 0) {
      rotationNeeded += 360;
    }
    
    // Calculate total rotation with fixed number of full rotations (no decimal variance)
    const fullRotations = Math.floor(totalRotations); // Use whole number of rotations
    const totalRotation = currentPosition + (fullRotations * 360) + rotationNeeded;
    
    console.log('🎯 DEBUG - Current position:', currentPosition);
    console.log('🎯 DEBUG - Current normalized position:', currentNormalized);
    console.log('🎯 DEBUG - Rotation needed to target:', rotationNeeded);
    console.log('🎯 DEBUG - Total rotation:', totalRotation);
    console.log('🎯 DEBUG - Expected final position:', (totalRotation % 360));

    // Natural animation timing - make sure it's visible and impactful
    const baseDuration = 4000; // Base 4 seconds - longer for visibility
    const spinDuration = baseDuration + (fullRotations * 300); // More rotations = longer spin
    
    // Use a more dramatic easing curve for visible deceleration
    const selectedEasing = 'cubic-bezier(0.15, 0.85, 0.35, 1)'; // Visible slow-down
    
    console.log('🎯 DEBUG - Spin duration:', spinDuration + 'ms', 'Full rotations:', fullRotations);
    console.log('🎯 DEBUG - Easing:', selectedEasing);

    // Apply spin animation with clear steps
    if (segmentsRef.current) {
      // First: Remove any existing transition
      segmentsRef.current.style.transition = 'none';
      
      // Force a reflow to ensure the transition removal takes effect
      void segmentsRef.current.offsetHeight;
      
      // Then: Apply the spinning animation
      segmentsRef.current.classList.add('spinning');
      segmentsRef.current.style.transition = `transform ${spinDuration}ms ${selectedEasing}`;
      
      // Small delay to ensure transition is set before transform
      setTimeout(() => {
        if (segmentsRef.current) {
          segmentsRef.current.style.transform = `rotate(${totalRotation}deg)`;
        }
      }, 10);
    }

    // Dynamic messages for more engaging experience
    const spinMessages = [
      'Spinning for your prize...',
      'Round and round we go...',
      'Let\'s see what you win...',
      'Here we go...',
      'Spinning to victory...'
    ];
    const randomMessage = spinMessages[Math.floor(Math.random() * spinMessages.length)];
    setMessage(randomMessage);

    // Load confetti
    await loadConfetti();

    // Handle spin completion with dynamic timing
    setTimeout(async () => {
      if (segmentsRef.current) {
        segmentsRef.current.classList.remove('spinning');
      }

      const prizeAmount = selectedPrize;
      
      // Calculate the final position after all rotations
      const finalPosition = totalRotation % 360;
      
      console.log('🎯 DEBUG - Final wheel position:', finalPosition);
      console.log('🎯 DEBUG - Prize awarded:', prizeAmount);
      
      // VERIFICATION: Calculate which segment the pointer is actually hitting
      const normalizedAngle = finalPosition % 360;
      
      // The wheel rotated to finalPosition degrees
      // To find which segment is at the pointer (0°), we need to see
      // which original segment is now at the 0° position
      
      // If the wheel is at angle X, then the segment that was originally at 
      // position (360 - X) is now at the pointer position
      let segmentAngleAtPointer = (360 - normalizedAngle) % 360;
      if (segmentAngleAtPointer < 0) segmentAngleAtPointer += 360;
      
      // Find which segment this angle falls into
      const actualSegmentAtPointer = Math.floor(segmentAngleAtPointer / SEGMENT_ANGLE) % PRIZES.length;
      const actualPrizeAtPointer = PRIZES[actualSegmentAtPointer];
      
      console.log('🎯 DEBUG - Normalized wheel angle:', normalizedAngle);
      console.log('🎯 DEBUG - Segment angle at pointer:', segmentAngleAtPointer);
      console.log('🎯 DEBUG - Actual segment at pointer:', actualSegmentAtPointer);
      console.log('🎯 DEBUG - Actual prize at pointer:', actualPrizeAtPointer);
      console.log('🎯 DEBUG - Target prize index was:', targetPrizeIndex);
      console.log('🎯 DEBUG - Target prize was:', selectedPrize);
      console.log('🎯 DEBUG - Does it match?', actualPrizeAtPointer === prizeAmount && prizeAmount === selectedPrize);
      
      // Use the actual calculated prize to ensure accuracy
      const verifiedPrize = actualPrizeAtPointer;
      
      // IMPORTANT: Keep the wheel exactly where it landed for next spin
      // Remove transition and set exact position
      if (segmentsRef.current) {
        segmentsRef.current.style.transition = 'none'; // Remove transition to prevent movement
        segmentsRef.current.style.transform = `rotate(${finalPosition}deg)`;
        
        // Re-enable gentle transitions after a short delay for future positioning
        setTimeout(() => {
          if (segmentsRef.current) {
            segmentsRef.current.style.transition = 'transform 0.1s ease';
          }
        }, 100);
      }
      
      // Trigger confetti explosion for every prize - ensure it appears in front
      if (window.confetti) {
        console.log('🎉 Triggering confetti for prize:', verifiedPrize);
        
        // Create high z-index confetti that appears in front of wheel
        const createConfetti = (options: object) => {
          (window as Window & { confetti: (options: object) => void }).confetti({
            ...options,
            zIndex: 999999, // Ensure confetti appears above everything
            disableForReducedMotion: false
          });
          
          // Also manually set canvas z-index if needed
          setTimeout(() => {
            const confettiCanvas = document.querySelector('canvas[style*="position: fixed"]') as HTMLCanvasElement;
            if (confettiCanvas) {
              confettiCanvas.style.zIndex = '999999';
              confettiCanvas.style.pointerEvents = 'none';
            }
          }, 10);
        };
        
        // Multiple confetti bursts for more impact
        createConfetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6, x: 0.5 },
          colors: ['#F3F4F6', '#9CA3AF', '#D1D5DB', '#6B7280'],
          ticks: 300
        });
        
        // Second burst with slight delay
        setTimeout(() => {
          if (window.confetti) {
            createConfetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.5, x: 0.3 },
              colors: ['#F3F4F6', '#9CA3AF', '#D1D5DB'],
              ticks: 250
            });
          }
        }, 200);
        
        // Third burst from the right
        setTimeout(() => {
          if (window.confetti) {
            createConfetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.5, x: 0.7 },
              colors: ['#F3F4F6', '#9CA3AF', '#D1D5DB'],
              ticks: 250
            });
          }
        }, 400);
      } else {
        console.warn('⚠️ Confetti library not loaded - no confetti effect');
      }

      // Use the verified prize for accurate results
      const finalPrizeAmount = verifiedPrize;

      // Update state and calculate remaining spins from the updated state
      setWheelState(prev => {
        const isLastSpin = prev.currentSpin >= prev.maxSpins;
        const spinsRemaining = prev.maxSpins - prev.currentSpin;

        if (isLastSpin) {
          setMessage(`Final spin! You won AED ${finalPrizeAmount}! This is your final prize.`);
          return {
            ...prev,
            isSpinning: false,
            allSpinsComplete: true,
            currentPrize: finalPrizeAmount,
            finalPrize: finalPrizeAmount,
            idleRotation: finalPosition
          };
        } else {
          setMessage(`You won AED ${finalPrizeAmount}! You have ${spinsRemaining} ${spinsRemaining === 1 ? 'spin' : 'spins'} left.`);
          return {
            ...prev,
            isSpinning: false,
            currentPrize: finalPrizeAmount,
            idleRotation: finalPosition
          };
        }
      });
    }, spinDuration + 200); // Add small buffer for animation completion
  };

  const spinWheel = async () => {
    if (wheelState.claimed || wheelState.isSpinning || wheelState.allSpinsComplete) {
      return;
    }

    // Check if we've reached max spins
    if (wheelState.currentSpin >= wheelState.maxSpins) {
      return;
    }

    // Show expandable form on first spin attempt
    if (!wheelState.detailsCollected) {
      setShowExpandableForm(true);
      setMessage('Please enter your details to start playing!');
      return;
    }

    // If details are collected, proceed with actual spinning
    await startActualSpin();
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
    if (message) setMessage('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;

    // Show loading message
    setMessage('Checking player data, please wait...');
    
    const userPhoneFull = `${userData.countryCode}${userData.phone.trim()}`;
    
    try {
      // Load Supabase with timeout
      await Promise.race([
        loadSupabase(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
      ]);

      if (!supabaseRef.current) {
        console.warn('Supabase not available, continuing without database check');
        // Continue without database check - graceful degradation
      } else {
        // Database check with detailed error reporting
        console.log('🔍 Checking for existing user:', userPhoneFull);
        
        try {
          console.log('📡 Making database request...');
          const result = await supabaseRef.current
            .from('wheel_entries')
            .select('id')
            .eq('mobile', userPhoneFull)
            .maybeSingle();
          
          console.log('📡 Database response:', result);
          
          if (result.error) {
            console.error('❌ Database error details:', {
              message: result.error.message,
              code: result.error.code,
              details: result.error.details,
              hint: result.error.hint
            });
            
            // Check specific error types
            if (result.error.message.includes('JWT')) {
              throw new Error('Authentication failed - Invalid API key');
            } else if (result.error.message.includes('relation') && result.error.message.includes('does not exist')) {
              throw new Error('Database table "wheel_entries" does not exist');
            } else if (result.error.message.includes('permission denied')) {
              throw new Error('Permission denied - Check RLS policies');
            } else {
              throw new Error(`Database error: ${result.error.message}`);
            }
          }
          
          if (result.data) {
            console.log('⚠️ User already exists:', result.data);
            setMessage('Thank you for playing, you have already won!');
            return;
          }
          
          console.log('✅ User check passed - new user');
          
        } catch (dbError: unknown) {
          const error = dbError as Error;
          console.error('❌ Database check failed:', {
            error: error,
            message: error.message,
            stack: error.stack,
            userPhone: userPhoneFull,
            supabaseUrl: SUPABASE_URL
          });
          
          // Show specific error to user
          setMessage(`Database error: ${error.message}. Please contact support.`);
          return;
        }
      }

      // Success - proceed with game
      setWheelState(prev => ({
        ...prev,
        detailsCollected: true,
        userPhoneFull,
        userName: userData.name.trim()
      }));
      setShowExpandableForm(false); // Hide expandable form after validation
      setMessage(`Welcome ${userData.name}! You have 5 spins to win the best prize. Each spin replaces the previous one.`);
      
      // Auto-start the first spin after successful validation - longer delay to ensure state updates
      setTimeout(() => {
        // Double-check state before spinning to prevent form re-appearance
        if (!wheelState.detailsCollected) {
          // Force state update if needed
          setWheelState(prev => ({
            ...prev,
            detailsCollected: true,
            userPhoneFull,
            userName: userData.name.trim()
          }));
        }
        // Start spinning directly without going through spinWheel() validation
        startActualSpin();
      }, 800);
      
    } catch (error) {
      console.warn('Database service unavailable, continuing with game:', error);
      // Graceful degradation - allow game to continue even if database is down
      setWheelState(prev => ({
        ...prev,
        detailsCollected: true,
        userPhoneFull,
        userName: userData.name.trim()
      }));
      setShowExpandableForm(false); // Hide expandable form after validation
      setMessage(`Welcome ${userData.name}! You have 5 spins to win the best prize. Each spin replaces the previous one.`);
      
      // Auto-start the first spin after successful validation - longer delay to ensure state updates
      setTimeout(() => {
        // Double-check state before spinning to prevent form re-appearance
        if (!wheelState.detailsCollected) {
          // Force state update if needed
          setWheelState(prev => ({
            ...prev,
            detailsCollected: true,
            userPhoneFull,
            userName: userData.name.trim()
          }));
        }
        // Start spinning directly without going through spinWheel() validation
        startActualSpin();
      }, 800);
    }
  };

  if (!isOpen) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
  const canSpin = !wheelState.isSpinning && !wheelState.allSpinsComplete && !wheelState.claimed;

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
          background: 
            radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.1) 0%, rgba(0, 0, 0, 0.9) 50%, rgba(0, 0, 0, 0.95) 100%),
            linear-gradient(45deg, rgba(26, 26, 26, 0.8), rgba(0, 0, 0, 0.95));
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 20px;
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
          overflow-y: auto;
        }

        .wheel-modal-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 100%;
        }
        
        .wheel-modal.active {
          opacity: 1;
          animation: modalEnter 0.4s ease-out;
        }

        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .wheel-title {
          color: #F3F4F6;
          font-size: ${isMobile ? '20px' : '24px'};
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-align: center;
          margin-bottom: 18px;
          margin-top: 0;
          text-shadow: 0 2px 10px rgba(156, 163, 175, 0.5);
        }

        .game-display {
          background: rgba(156, 163, 175, 0.1);
          border: 2px solid rgba(156, 163, 175, 0.3);
          border-radius: 10px;
          padding: 16px 20px;
          margin-bottom: 16px;
          text-align: center;
          min-height: 120px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: ${isMobile ? '320px' : '380px'};
          max-width: 90%;
          transition: all 0.3s ease;
        }

        .game-message {
          color: #F3F4F6;
          font-size: ${isMobile ? '16px' : '16px'};
          font-weight: normal;
          font-family: 'Montserrat', sans-serif;
          margin-bottom: ${wheelState.currentPrize ? '12px' : '0'};
          line-height: 1.5;
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          transition: all 0.3s ease;
        }

        .current-prize {
          color: #F3F4F6;
          font-size: ${isMobile ? '18px' : '20px'};
          font-weight: 600;
          font-family: 'Montserrat', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 10px;
          animation: prizeAppear 0.5s ease-out;
          transition: all 0.3s ease;
        }

        @keyframes prizeAppear {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .claim-prize-button {
          background: linear-gradient(145deg, #10B981, #059669);
          color: white;
          border: 3px solid #059669;
          padding: ${isMobile ? '12px 20px' : '14px 26px'};
          font-size: ${isMobile ? '14px' : '16px'};
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 
            0 5px 15px rgba(16, 185, 129, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.2);
          white-space: nowrap;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        }

        .claim-prize-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 12px 35px rgba(16, 185, 129, 0.6),
            inset 0 2px 6px rgba(255, 255, 255, 0.3);
          background: linear-gradient(145deg, #059669, #047857);
        }

        .claim-prize-button:active {
          transform: translateY(-1px) scale(1.01);
          transition: transform 0.1s ease;
        }

        /* Wheel Container */
        .wheel-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px;
          z-index: 10;
        }
        
        .spin-wheel {
          position: relative;
          width: ${isMobile ? '220px' : '320px'};
          height: ${isMobile ? '220px' : '320px'};
          border-radius: 50%;
          margin-bottom: 20px;
          margin-top: 5px;
          box-shadow: 
            0 0 0 4px rgba(156, 163, 175, 0.4),
            0 0 0 8px rgba(26, 26, 26, 0.8),
            0 0 40px rgba(156, 163, 175, 0.6),
            0 15px 40px rgba(0, 0, 0, 0.8);
          animation: ${wheelState.allSpinsComplete ? 'none' : 'wheelGlow 2s ease-in-out infinite alternate'};
          transition: filter 0.5s ease, opacity 0.5s ease;
          ${wheelState.allSpinsComplete ? 'filter: grayscale(30%); opacity: 0.8;' : ''}
          ${showExpandableForm ? 'filter: blur(3px) brightness(0.7);' : ''}
        }

        /* Expandable Form Section */
        .expandable-form-section {
          position: absolute;
          top: 190px;
          left: 50%;
          transform: translateX(-50%) ${showExpandableForm ? 'translateY(0)' : 'translateY(-30px)'};
          z-index: 20;
          max-height: ${showExpandableForm ? '500px' : '0'};
          opacity: ${showExpandableForm ? '1' : '0'};
          visibility: ${showExpandableForm ? 'visible' : 'hidden'};
          overflow: hidden;
          transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
          width: ${isMobile ? '320px' : '380px'};
          max-width: 90%;
          background: 
            linear-gradient(145deg, rgba(26, 26, 26, 0.95), rgba(42, 42, 42, 0.95)),
            radial-gradient(circle at 50% 50%, rgba(156, 163, 175, 0.15), rgba(0, 0, 0, 0.9));
          border: 3px solid rgba(156, 163, 175, 0.6);
          border-radius: 12px;
          padding: ${showExpandableForm ? '24px' : '0 24px'};
          box-shadow: 
            0 0 50px rgba(0, 0, 0, 0.8),
            0 0 25px rgba(156, 163, 175, 0.4),
            inset 0 2px 6px rgba(156, 163, 175, 0.1);
          backdrop-filter: blur(8px);
        }

        .expandable-form .input-group {
          margin-bottom: 18px;
        }

        .expandable-form .phone-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 12px;
        }

        .expandable-form .phone-row input:first-child {
          max-width: 80px;
          text-align: center;
          cursor: not-allowed;
          background: rgba(60, 60, 60, 0.8);
        }

        .expandable-form .phone-row input:last-child {
          flex: 1;
        }

        .expandable-form input {
          width: 100%;
          box-sizing: border-box;
          padding: 16px 18px;
          border-radius: 10px;
          border: 2px solid rgba(156, 163, 175, 0.4);
          background: rgba(42, 42, 42, 0.9);
          color: #F3F4F6;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          font-size: ${isMobile ? '16px' : '16px'};
          transition: all 0.3s ease;
        }

        .expandable-form input:focus {
          outline: none;
          border-color: #9CA3AF;
          box-shadow: 
            0 0 20px rgba(156, 163, 175, 0.4),
            inset 0 2px 6px rgba(156, 163, 175, 0.1);
          background: rgba(42, 42, 42, 1);
        }

        .expandable-form label {
          color: #F3F4F6;
          font-size: 14px;
          margin-bottom: 8px;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          display: block;
          text-align: left;
        }

        .expandable-form-message {
          color: #9CA3AF;
          font-size: 13px;
          min-height: 18px;
          font-family: 'Montserrat', sans-serif;
          font-weight: normal;
          text-align: center;
          margin-bottom: 15px;
          line-height: 1.3;
        }

        .expandable-form-button {
          background: 
            linear-gradient(145deg, #9CA3AF, #F3F4F6),
            radial-gradient(circle at 30% 30%, #F3F4F6, #9CA3AF);
          color: #1a1a1a;
          border: 3px solid #1a1a1a;
          padding: 16px 28px;
          font-size: 16px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 
            0 5px 20px rgba(156, 163, 175, 0.5),
            inset 0 2px 6px rgba(243, 244, 246, 0.3);
          width: 100%;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
        }

        .expandable-form-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 30px rgba(156, 163, 175, 0.7),
            inset 0 2px 8px rgba(243, 244, 246, 0.4);
        }

        .expandable-form-button:active:not(:disabled) {
          transform: translateY(0);
          transition: transform 0.1s ease;
        }

        .expandable-form-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          background: #555 !important;
          color: #999 !important;
          border-color: #666 !important;
        }
        
        .wheel-segments {
          position: absolute;
          inset: 10px;
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
          transition: transform 0.5s ease;
          box-shadow: 
            inset 0 0 30px rgba(0, 0, 0, 0.7),
            inset 0 0 60px rgba(26, 26, 26, 0.5);
        }
        
        .wheel-segments.spinning {
          /* Transition is now set dynamically in JavaScript for natural variance */
        }
        
        .wheel-pointer {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 12px solid transparent;
          border-right: 12px solid transparent;
          border-top: 25px solid #F3F4F6;
          z-index: 15;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.6));
        }
        
                  .wheel-center {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${isMobile ? '80px' : '100px'};
            height: ${isMobile ? '80px' : '100px'};
            background: 
              radial-gradient(circle at 30% 30%, #F3F4F6, #9CA3AF),
              linear-gradient(145deg, #E5E7EB, #9CA3AF);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid #1a1a1a;
            z-index: 10;
            box-shadow: 
              0 0 20px rgba(0, 0, 0, 0.8),
              inset 0 3px 6px rgba(243, 244, 246, 0.3),
              0 0 15px rgba(156, 163, 175, 0.6);
            font-family: 'Impact', 'Arial Black', sans-serif;
            font-weight: normal;
            font-size: ${isMobile ? '11px' : '14px'};
            color: #1a1a1a;
            text-align: center;
            line-height: 1.1;
            text-transform: uppercase;
            cursor: pointer;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.5);
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }

          .wheel-center:hover {
            transform: translate(-50%, -50%) scale(1.05);
            box-shadow: 
              0 0 40px rgba(0, 0, 0, 0.8),
              inset 0 4px 8px rgba(243, 244, 246, 0.4),
              0 0 30px rgba(156, 163, 175, 0.8);
          }
        
        .wheel-label {
          position: absolute;
          pointer-events: none;
          z-index: 5;
          left: 50%;
          top: 50%;
          transform-origin: center center;
        }
        
        .wheel-label span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) translateY(-${isMobile ? '70px' : '95px'}) rotate(90deg);
          font: normal ${isMobile ? '12px' : '14px'} "Montserrat", sans-serif;
          font-weight: 600;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          pointer-events: none;
          letter-spacing: 0.3px;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          margin-bottom: 20px;
          justify-content: center;
          max-width: 100%;
          min-height: 100px;
          transition: all 0.3s ease;
        }

        .choice-question {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: ${isMobile ? '8px' : '15px'};
          flex-wrap: wrap;
          max-width: 100%;
          animation: slideInUp 0.4s ease-out;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .choice-divider {
          color: #F3F4F6;
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: ${isMobile ? '14px' : '16px'};
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(243, 244, 246, 0.8);
          margin: 0 ${isMobile ? '5px' : '8px'};
          font-weight: normal;
        }

        .choice-question-mark {
          color: #9CA3AF;
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: ${isMobile ? '20px' : '24px'};
          text-shadow: 0 0 15px rgba(156, 163, 175, 0.9);
          margin-left: ${isMobile ? '2px' : '5px'};
          animation: questionPulse 2s ease-in-out infinite;
        }

        @keyframes questionPulse {
          0%, 100% { 
            transform: scale(1);
            text-shadow: 0 0 15px rgba(156, 163, 175, 0.9);
          }
          50% { 
            transform: scale(1.15);
            text-shadow: 0 0 25px rgba(156, 163, 175, 1);
          }
        }
        
        .spin-button {
          background: 
            linear-gradient(145deg, #9CA3AF, #F3F4F6),
            radial-gradient(circle at 30% 30%, #F3F4F6, #9CA3AF);
          color: #1a1a1a;
          border: 3px solid #1a1a1a;
          padding: ${isMobile ? '12px 20px' : '14px 28px'};
          font-size: ${isMobile ? '14px' : '16px'};
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 
            0 5px 15px rgba(156, 163, 175, 0.5),
            inset 0 2px 4px rgba(243, 244, 246, 0.3);
          white-space: nowrap;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .spin-button::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #9CA3AF, #F3F4F6, #9CA3AF);
          background-size: 300% 300%;
          animation: buttonGlow 2s ease-in-out infinite;
          border-radius: 52px;
          z-index: -1;
        }

        @keyframes buttonGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .spin-button:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 
            0 12px 35px rgba(156, 163, 175, 0.8),
            inset 0 2px 6px rgba(243, 244, 246, 0.4);
        }

        .spin-button:active:not(:disabled) {
          transform: translateY(-1px) scale(1.01);
          transition: transform 0.1s ease;
        }
        
        .spin-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          background: #555 !important;
          color: #999 !important;
          border-color: #666 !important;
        }
        
        .close-wheel {
          background: transparent;
          color: #9CA3AF;
          border: 2px solid rgba(156, 163, 175, 0.6);
          padding: 14px 34px;
          font-size: 16px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(156, 163, 175, 0.2);
        }
        
        .close-wheel:hover {
          background: rgba(156, 163, 175, 0.2);
          color: #F3F4F6;
          border-color: #F3F4F6;
          box-shadow: 0 6px 20px rgba(156, 163, 175, 0.4);
        }
        
        .wheel-close-x {
          position: absolute;
          top: 25px;
          right: 25px;
          width: 45px;
          height: 45px;
          background: 
            linear-gradient(145deg, rgba(156, 163, 175, 0.9), rgba(243, 244, 246, 0.9)),
            radial-gradient(circle at 30% 30%, rgba(243, 244, 246, 0.9), rgba(156, 163, 175, 0.9));
          border: 3px solid #1a1a1a;
          border-radius: 50%;
          color: #1a1a1a;
          font-size: 24px;
          font-weight: normal;
          font-family: 'Impact', 'Arial Black', sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10002;
          transition: all 0.3s ease;
          box-shadow: 
            0 4px 15px rgba(156, 163, 175, 0.5),
            inset 0 2px 4px rgba(243, 244, 246, 0.3);
        }
        
        .wheel-close-x:hover {
          transform: scale(1.1);
          box-shadow: 
            0 6px 20px rgba(156, 163, 175, 0.8),
            inset 0 2px 6px rgba(243, 244, 246, 0.4);
        }
        
        @keyframes wheelGlow {
          0% { 
            box-shadow: 
              0 0 0 6px rgba(156, 163, 175, 0.4),
              0 0 0 12px rgba(26, 26, 26, 0.8),
              0 0 60px rgba(156, 163, 175, 0.6),
              0 20px 60px rgba(0, 0, 0, 0.8);
          }
          100% { 
            box-shadow: 
              0 0 0 6px rgba(156, 163, 175, 0.7),
              0 0 0 12px rgba(26, 26, 26, 0.8),
              0 0 80px rgba(156, 163, 175, 0.9),
              0 20px 60px rgba(0, 0, 0, 0.8);
          }
        }
      `}</style>

      <div className={`wheel-modal ${isOpen ? 'active' : ''}`}>
        <button className="wheel-close-x" onClick={onClose}>×</button>
        
        <div className="wheel-modal-content">
          <h2 className="wheel-title">
            SPIN TO WIN A GIFT CARD TOWARDS<br />YOUR NEXT MERCEDES-BENZ SERVICE!
          </h2>
          
          <div className="game-display">
            <div className="game-message">
              {message || (wheelState.detailsCollected ? 'Ready to spin! You have 5 chances to win the best prize.' : 'Click the wheel or "Start Game" to begin!')}
            </div>
            {wheelState.currentPrize && (
              <div className="current-prize">
                Current Prize: AED {wheelState.currentPrize}
              </div>
            )}
          </div>

          {/* Expandable Form Section */}
          <div className="expandable-form-section">
            <form onSubmit={handleFormSubmit} className="expandable-form">
              <div className="input-group">
                <label htmlFor="expandableUserName">Your Name</label>
                <input
                  type="text"
                  id="expandableUserName"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
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
                    required
                    pattern="[0-9]{7,15}"
                  />
                </div>
              </div>
              
              <div className="expandable-form-message">{message}</div>
              
              <button
                type="submit"
                className="expandable-form-button"
                disabled={!userData.name.trim() || !userData.phone.trim()}
              >
                Start Game
              </button>
            </form>
          </div>
          
          <div className="wheel-container">
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
          </div>
          
          <div className="action-buttons">
            {!wheelState.currentPrize ? (
              // Before any prize is won - show spin button (unless expandable form is visible)
              !showExpandableForm && (
                <button
                  className="spin-button"
                  onClick={spinWheel}
                  disabled={!canSpin}
                >
                  {wheelState.isSpinning 
                    ? 'SPINNING...' 
                    : wheelState.currentSpin === 0
                      ? 'Start Game'
                      : 'Spin Again'
                  }
                </button>
              )
            ) : !wheelState.allSpinsComplete || (wheelState.allSpinsComplete && wheelState.currentPrize && !wheelState.claimed) ? (
              // After winning a prize (including final spin) - inline choice layout
              <div className="choice-question">
                <button
                  className="claim-prize-button"
                  onClick={handleAcceptPrize}
                >
                  Claim Prize
                </button>
                
                {!wheelState.allSpinsComplete && (
                  <>
                    <span className="choice-divider">or</span>
                    
                    <button
                      className="spin-button"
                      onClick={spinWheel}
                      disabled={!canSpin}
                    >
                      {wheelState.isSpinning 
                        ? 'SPINNING...' 
                        : wheelState.currentSpin === wheelState.maxSpins 
                          ? 'FINAL SPIN' 
                          : 'Spin Again'
                      }
                    </button>
                    
                    <span className="choice-question-mark">?</span>
                  </>
                )}
              </div>
            ) : null}
          </div>
          
          <button className="close-wheel" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
} 