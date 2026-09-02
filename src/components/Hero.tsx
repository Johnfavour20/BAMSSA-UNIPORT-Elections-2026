import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useElection } from '../context/ElectionContext';
import { CheckCircle2, BarChart2, ShieldCheck, GraduationCap, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onCheckEligibility: () => void;
  onViewLiveMonitor: () => void;
  onStartVoting: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD35Vfpx5kND5j0XlDU8T6g7FWdebvNYyZ-sjjQm_GPDOCreRb6fim29YHk_nrvnTpAkkWdcNDnYpPB5i9cttuWSCuiR_JT4Mw1h53-22FyvSJvJM_qZ8vlrIQ9xA8o4K8ALST9HE4-G6xt-GiT4qaNWM1tE2AGLrqshFIegW_KonGnFTiEqzrTiMhFTKvnQeJF9_DuDnN4CnOVHNhjMg4J5PlDNR6CRT5ZIfcBFOMirgTyPUuzLffc',
    caption: 'Faculty of Basic Medical Sciences Complex, UNIPORT'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBC6Hl86_K2w-7Y1R5o3y3Z0X1o9p4qL_5JjE7fD9xR6Q_2M_1a8b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h5i6j7k8l9m0n1o2p3q4r5s6t7u8v9w0x1y2z3',
    caption: 'BAMSSA Student Assembly & Congress'
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1920&q=80',
    caption: 'University of Port Harcourt College of Health Sciences'
  }
];

export const Hero: React.FC<HeroProps> = ({
  onCheckEligibility,
  onViewLiveMonitor,
  onStartVoting,
}) => {
  const { status, currentVoter } = useElection();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto transition carousel every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      id="bamssa-hero-section"
      className="relative w-full min-h-[600px] lg:h-[82vh] flex items-center justify-center overflow-hidden py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {/* Full-bleed Carousel Backgrounds */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        {/* Layered dark blue gradient overlay for optimal text contrast */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-[#001944]/95 via-[#003f93]/70 to-[#001944]/65 z-10"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {HERO_IMAGES.map((img, idx) => (
          <motion.div
            key={idx}
            className={`absolute inset-0 bg-cover bg-center scale-105 ${
              idx === currentImageIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url('${img.url}')`,
            }}
            initial={{ scale: 1.08, opacity: 0 }}
            animate={{
              opacity: idx === currentImageIndex ? 1 : 0,
              scale: 1.08,
            }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Hero Content Layered Directly Over */}
      <motion.div
        className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl text-white"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
      >
        {/* Sub-badge: KEEP rounded-full */}
        <motion.div
          className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md border border-white/25 px-4 py-2 rounded-full mb-6 text-xs font-semibold tracking-wider uppercase text-white shadow-xs"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#8ab0fe] animate-pulse" />
          <span>2026/2027 EXECUTIVE ELECTIONS</span>
        </motion.div>

        {/* Display Headline */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight mb-5 leading-tight uppercase font-sans text-white drop-shadow-md"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          YOUR VOICE. YOUR REPRESENTATIVES. YOUR BAMSSA.
        </motion.h2>

        {/* Sub-headline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-normal leading-relaxed"
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          The official, secure voting platform for Basic Medical Science students. Cast your confidential ballot and shape our association's future.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 max-w-md mx-auto mb-8"
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.45 }}
        >
          {status === 'LIVE' ? (
            <motion.button
              id="hero-vote-live-btn"
              onClick={onStartVoting}
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#003f93] text-white font-medium text-sm px-5 py-2.5 rounded-none transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{currentVoter ? 'Enter Ballot Booth' : 'Authenticate & Vote'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          ) : (
            <motion.button
              id="hero-check-eligibility-btn"
              onClick={onCheckEligibility}
              className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#003f93] text-white font-medium text-sm px-5 py-2.5 rounded-none transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check My Eligibility</span>
            </motion.button>
          )}

          <motion.button
            id="hero-view-monitor-btn"
            onClick={onViewLiveMonitor}
            className="w-full sm:w-auto bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md font-medium text-sm px-5 py-2.5 rounded-none transition-all shadow-xs flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <BarChart2 className="w-4 h-4" />
            <span>View Live Monitor</span>
          </motion.button>
        </motion.div>

        {/* Carousel indicators */}
        <motion.div
          className="flex items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
        >
          {HERO_IMAGES.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`h-1.5 rounded-none transition-all cursor-pointer ${
                idx === currentImageIndex ? 'w-8 bg-[#8ab0fe]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
              whileHover={{ scale: 1.1 }}
            />
          ))}
        </motion.div>

        {/* Quick status footnote */}
        <motion.div
          className="flex items-center justify-center gap-6 text-xs text-white/75 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8ab0fe]" />
            <span>Zero-Compromise Ballot Secrecy</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-[#8ab0fe]" />
            <span>University of Port Harcourt Chapter</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};
