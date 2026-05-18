/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { MapPin, Calendar as CalendarIcon, Clock, Navigation, Music, Heart, Sparkles, GraduationCap, ScrollText, Star, Award, Sparkle, Quote, Loader2, CheckCircle2 } from 'lucide-react';
import { supabase } from './lib/supabase';

const eventConfig = {
  graduateName: "ĐÀO THỤY KHÁNH NGÂN",
  guestName: "BẠN",
  date: "25/05/2026",
  time: "6h",
  location: "173 Đ. Phạm Hùng, Chánh Hưng, Hồ Chí Minh (THPT Lương Văn Can)",
  mapUrl: "https://maps.google.com/maps?q=THPT%20Lương%20Văn%20Can,%20Phạm%20Hùng,%20Hồ%20Chí%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed",
  mapLink: "https://maps.app.goo.gl/vFRPQNzzMTLsxtw66?g_st=az",
  targetDate: new Date('2026-05-25T06:00:00')
};

const EnvelopeIntro = ({ onOpenComplete }: { onOpenComplete: () => void }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      onOpenComplete();
    }, 2000); // Trigger transition after letter slides up
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5] overflow-hidden"
      exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Background Particles for Intro */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[20%] w-64 h-64 bg-[#c0a080]/15 blur-[60px] rounded-full"></div>
          <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-[#EFE8DF] blur-[80px] rounded-full"></div>
      </div>

      <motion.div 
          className="relative w-[320px] md:w-[400px] h-[220px] md:h-[260px] cursor-pointer group"
          onClick={handleOpen}
          animate={{ y: isOpening ? 0 : [0, -10, 0] }}
          transition={{ y: { duration: 4, repeat: isOpening ? 0 : Infinity, ease: "easeInOut" } }}
          whileHover={{ scale: 1.02 }}
      >
         {/* Shadow of the envelope */}
         <motion.div 
           className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-6 bg-black/10 blur-[15px] rounded-[100%]"
           animate={{ opacity: isOpening ? 0 : 1 }}
           transition={{ duration: 0.5 }}
         ></motion.div>

         {/* Envelope Back Inside */}
         <div className="absolute inset-0 shadow-[0_20px_60px_rgba(140,122,107,0.2)] rounded-sm bg-[#D8CCC0] border border-white/40"></div>

         {/* The Letter */}
         <motion.div 
            className="absolute bottom-2 left-3 right-3 h-[92%] bg-[#FAF8F5] rounded shadow-[0_0_15px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center p-4 text-center z-10 border border-white"
            animate={{ 
                y: isOpening ? -160 : 0,
                opacity: isOpening ? 0.9 : 1
            }}
            transition={{ 
              y: { delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
              opacity: { delay: 1.5, duration: 0.5 }
            }}
         >
            <Sparkles strokeWidth={1} className="w-5 h-5 md:w-6 md:h-6 text-[#c0a080] mb-4" />
            <h4 className="font-serif italic text-2xl md:text-3xl text-[#1C1A17] font-light mb-2">Thư Mời</h4>
            <div className="w-10 h-[1px] bg-[#c0a080]/40 my-3"></div>
            <p className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#7A6B5D] font-medium">{eventConfig.graduateName}</p>
         </motion.div>

         {/* Envelope Flaps Wrapper */}
         <div className="absolute inset-0 z-20 pointer-events-none">
            {/* Side flaps */}
            <div className="absolute inset-0" style={{ filter: "drop-shadow(5px 0 10px rgba(140,122,107,0.05))" }}>
               <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 50% 50%, 0 100%)", backgroundColor: "#EAE0D5" }}></div>
            </div>
            <div className="absolute inset-0" style={{ filter: "drop-shadow(-5px 0 10px rgba(140,122,107,0.05))" }}>
               <div className="absolute inset-0" style={{ clipPath: "polygon(100% 0, 50% 50%, 100% 100%)", backgroundColor: "#E8DCCB" }}></div>
            </div>
            {/* Bottom flap */}
            <div className="absolute inset-0" style={{ filter: "drop-shadow(0 -5px 15px rgba(140,122,107,0.1))" }}>
               <div className="absolute inset-0 bg-[#F5EFE6]" style={{ clipPath: "polygon(0 100%, 50% 48%, 100% 100%)" }}></div>
            </div>
         </div>

         {/* Top flap */}
         <motion.div 
            className="absolute top-0 left-0 w-full h-[65%] origin-top pointer-events-none"
            animate={{ 
                rotateX: isOpening ? 180 : 0, 
                zIndex: isOpening ? 5 : 30 
            }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
         >
           <div className="w-full h-full" style={{ filter: "drop-shadow(0 10px 15px rgba(140,122,107,0.15))" }}>
             <div className="w-full h-full bg-[#F5EFE6]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}></div>
             <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent mix-blend-overlay" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}></div>
           </div>
         </motion.div>

         {/* Wax Seal */}
         <motion.div 
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#802020] to-[#5a1010] rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.2)] border-2 border-[#a03030]/20"
            style={{ zIndex: 40 }}
            animate={{ scale: isOpening ? 0 : 1, opacity: isOpening ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "backIn" }}
         >
            <div className="absolute inset-1 rounded-full border border-black/10"></div>
            <Heart className="w-5 h-5 text-[#dcb0a0] opacity-90 drop-shadow-sm" fill="currentColor" />
         </motion.div>
      </motion.div>

      <motion.p 
        className="absolute bottom-20 text-[10px] md:text-xs uppercase tracking-[0.4em] font-semibold text-[#8C7A6B]"
        animate={{ opacity: isOpening ? 0 : 0.6 }}
        transition={{ duration: 0.5 }}
      >
        Chạm để mở thư
      </motion.p>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, (y) => y * 0.25);
  const y2 = useTransform(scrollY, (y) => y * -0.2);
  const y3 = useTransform(scrollY, (y) => y * 0.35);
  const y4 = useTransform(scrollY, (y) => y * -0.1);
  const y5 = useTransform(scrollY, (y) => y * 0.15);

  // Generate static safe particles array once
  const [particles] = useState(() => Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
    moveY: Math.random() * 100 - 50,
  })));

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#FAF8F5] pointer-events-none">
      {/* Vignette Depth */}
      <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(140,122,107,0.15)] mix-blend-multiply z-10"></div>
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.25] mix-blend-multiply"></div>
      
      {/* Cinematic glows & deep blur layers */}
      <motion.div
        style={{ y: y1 }}
        animate={{ scale: [1, 1.15, 1], x: [0, 60, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-gradient-radial from-[#EFE8DF] to-transparent blur-[160px] mix-blend-normal"
      />
      <motion.div
        style={{ y: y2 }}
        animate={{ scale: [1, 1.25, 1], x: [0, -50, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-20%] w-[90vw] h-[90vw] rounded-full bg-gradient-radial from-[#F5EFE6] to-transparent blur-[180px] mix-blend-normal"
      />
      <motion.div
        style={{ y: y3 }}
        animate={{ scale: [1, 1.3, 1], x: [0, 30, 0], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[25%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-gradient-radial from-[#c0a080] to-transparent blur-[180px] mix-blend-multiply"
      />
      
      <motion.div
        style={{ y: y5 }}
        animate={{ scale: [1, 1.2, 1], x: [0, -20, 0], opacity: [0.08, 0.2, 0.08] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] left-[5%] w-[60vw] h-[60vw] rounded-full bg-gradient-radial from-[#8C7A6B] to-transparent blur-[200px] mix-blend-multiply"
      />

      {/* Dynamic Ambient Lights */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.5, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[30%] w-[50vw] h-[50vw] rounded-full bg-gradient-radial from-[#E8DCCB]/60 to-transparent blur-[150px] mix-blend-multiply"
      />
      <motion.div
        animate={{ opacity: [0.15, 0.4, 0.15], y: [0, -50, 0], x: [0, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[40%] left-[30%] w-[40vw] h-[40vw] rounded-full bg-gradient-radial from-white to-transparent blur-[120px] mix-blend-overlay"
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 m-auto">
        {particles.map(p => (
           <motion.div
               key={p.id}
               animate={{
                   y: [0, p.moveY, 0],
                   opacity: [p.opacity, p.opacity * 2, p.opacity],
                   scale: [1, 1.5, 1]
               }}
               transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
               className="absolute rounded-full bg-[#c0a080]"
               style={{
                   left: `${p.x}%`,
                   top: `${p.y}%`,
                   width: p.size,
                   height: p.size,
                   filter: `blur(1px)`,
               }}
           />
        ))}
      </div>

      {/* Decorative Elements */}
      <motion.div style={{ y: y4 }} className="absolute m-auto inset-0 w-full h-full">
         <div className="absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-[#c0a080]/40 blur-[1px]"></div>
         <div className="absolute top-[45%] right-[15%] w-3 h-3 rounded-full bg-[#c0a080]/30 blur-[2px]"></div>
         <div className="absolute bottom-[25%] left-[20%] w-4 h-4 rounded-full bg-[#c0a080]/40 blur-[3px]"></div>
         <div className="absolute top-[5%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#c0a080]/50 blur-[1px]"></div>
         <div className="absolute bottom-[10%] right-[40%] w-2.5 h-2.5 rounded-full bg-[#c0a080]/30 blur-[1px]"></div>
         
         <div className="absolute top-[35%] left-[30%] w-3 h-3 rounded-full bg-white/60 blur-[3px] shadow-[0_0_15px_rgba(255,255,255,1)]"></div>
         <div className="absolute top-[75%] right-[25%] w-4 h-4 rounded-full bg-white/50 blur-[4px] shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
         
         {/* Floating Icons */}
         <motion.div animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[85%] text-[#c0a080]/20">
           <GraduationCap size={120} strokeWidth={0.5} />
         </motion.div>
         <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[60%] left-[5%] text-[#8C7A6B]/15">
           <ScrollText size={160} strokeWidth={0.5} />
         </motion.div>
         <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-[10%] right-[15%] text-[#c0a080]/20">
           <Award size={80} strokeWidth={0.5} />
         </motion.div>

         {/* Cinematic Sparkles */}
         <motion.div animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.2, 1] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[28%] left-[18%] text-[#c0a080]/40">
            <Sparkles size={24} strokeWidth={1} />
         </motion.div>
         <motion.div animate={{ opacity: [0.1, 0.5, 0.1], scale: [0.8, 1.1, 0.8] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[65%] right-[22%] text-[#c0a080]/30">
            <Sparkle size={32} strokeWidth={1} />
         </motion.div>
         <motion.div animate={{ opacity: [0.2, 0.6, 0.2], rotate: [0, 45, 90] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute top-[12%] right-[10%] text-[#8C7A6B]/20">
            <Star size={40} strokeWidth={0.5} />
         </motion.div>
      </motion.div>
      
      {/* Decorative SVG Lines/Ornaments */}
      <motion.div style={{ y: y1 }} className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute top-[5%] left-[5%] w-64 h-64 text-[#c0a080]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
           <path d="M0,50 Q25,25 50,50 T100,50" className="opacity-50" />
           <path d="M0,60 Q25,35 50,60 T100,60" className="opacity-30" />
        </svg>
        <svg className="absolute bottom-[20%] right-[5%] w-96 h-96 text-[#8C7A6B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.2">
           <circle cx="50" cy="50" r="40" strokeDasharray="2 4" />
           <circle cx="50" cy="50" r="30" className="opacity-50" />
        </svg>
        {/* Ribbon curves */}
        <motion.svg animate={{ rotate: [0, 5, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[40%] left-[2%] w-[400px] h-[400px] text-[#c0a080]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.4">
           <path d="M10,100 C50,20 150,180 190,100" />
           <path d="M20,105 C60,25 160,185 200,105" className="opacity-40" />
        </motion.svg>
        <motion.svg animate={{ rotate: [0, -5, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[60%] right-[2%] w-[300px] h-[300px] text-[#8C7A6B]" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="0.3">
           <path d="M190,100 C150,180 50,20 10,100" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf589.mp3');
    audioRef.current.loop = true;
    return () => audioRef.current?.pause();
  }, []);

  const togglePlay = () => {
    if (isPlaying) audioRef.current?.pause();
    else audioRef.current?.play().catch(() => {});
    setIsPlaying(!isPlaying);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 glass-panel rounded-full p-2 pr-4 cursor-pointer hover:bg-white/60 transition-colors shadow-lg group hover:scale-[1.02] hover:-translate-y-1"
      onClick={togglePlay}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={`w-10 h-10 rounded-full bg-[#1C1A17] flex items-center justify-center text-[#FAF8F5] transition-transform duration-500 group-hover:bg-[#a07040] ${isPlaying ? 'spin-slow' : ''}`}>
        <Music size={16} />
      </div>
      <span className="text-[10px] font-medium tracking-widest uppercase text-[#5a544d] hidden sm:block">
        {isPlaying ? 'Playing' : 'Music Off'}
      </span>
    </motion.div>
  );
};

const Reveal = ({ children, delay = 0, blur = false, yOffset = 40, parallax = false, parallaxOffset = 50 }: { children: React.ReactNode, delay?: number, blur?: boolean, yOffset?: number, parallax?: boolean, parallaxOffset?: number }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-parallaxOffset, parallaxOffset]);

  const content = (
    <motion.div
       initial={{ opacity: 0, y: yOffset, scale: 0.95, filter: blur ? 'blur(15px)' : 'blur(0px)' }}
       whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
       viewport={{ once: true, margin: "-10%" }}
       transition={{ duration: 1.6, delay, ease: [0.16, 1, 0.3, 1] }}
       className="w-full h-full flex justify-center"
    >
      {children}
    </motion.div>
  );

  return parallax ? (
    <motion.div ref={ref} style={{ y }} className="w-full h-full">
      {content}
    </motion.div>
  ) : (
    <div ref={ref} className="w-full h-full">{content}</div>
  );
};

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpAttending, setRsvpAttending] = useState("");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRsvpSubmit = async () => {
    if (!rsvpName.trim()) {
      setErrorMsg("Vui lòng nhập tên của bạn.");
      return;
    }
    if (!rsvpAttending) {
      setErrorMsg("Vui lòng chọn trạng thái tham dự.");
      return;
    }
    
    setErrorMsg("");
    setIsSubmitting(true);
    
    try {
      if (supabase) {
        const { error } = await supabase.from('rsvp' as any).insert([
          { 
            name: rsvpName, 
            attending: rsvpAttending === 'yes', 
            message: rsvpMessage,
            created_at: new Date().toISOString()
          } as any
        ]);
        
        if (error) {
          console.error("Error submitting RSVP:", error);
          setErrorMsg("Có lỗi xảy ra, vui lòng thử lại sau.");
          setIsSubmitting(false);
        } else {
          setIsSuccess(true);
          setIsSubmitting(false);
        }
      } else {
        console.warn("Supabase not defined, simulating success.");
        setTimeout(() => {
          setIsSuccess(true);
          setIsSubmitting(false);
        }, 1500);
      }
    } catch (err) {
      console.error("Exception in handleRsvpSubmit:", err);
      setErrorMsg("Có lỗi xảy ra, vui lòng thử lại sau.");
      setIsSubmitting(false);
    }
  };

  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroY = useTransform(scrollY, [0, 400], [0, 100]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 0.95]);

  useEffect(() => {
    // Disable scroll while intro is running
    if (!introFinished) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [introFinished]);

  return (
    <>
      <AnimatePresence>
        {!introFinished && <EnvelopeIntro onOpenComplete={() => setIntroFinished(true)} />}
      </AnimatePresence>

      <motion.div 
        className="min-h-screen text-[#2D2A26] font-sans selection:bg-[#D8CCC0] selection:text-[#2D2A26] relative"
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
        animate={{ opacity: introFinished ? 1 : 0, filter: introFinished ? 'blur(0px)' : 'blur(20px)', scale: introFinished ? 1 : 0.95 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: introFinished ? 'auto' : 'none' }}
      >
        <AnimatedBackground />
        <MusicPlayer />

      <motion.section 
        style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
        className="relative min-h-[100svh] flex flex-col items-center justify-center px-6 text-center overflow-hidden"
      >
        {/* Layered Background Depth & Cinematic Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.1)_40%,transparent_70%)] pointer-events-none z-0 blur-[60px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-[radial-gradient(circle_at_center,rgba(192,160,128,0.15)_0%,transparent_60%)] pointer-events-none z-0 blur-[40px] mix-blend-multiply"></div>

        {/* Uploaded Graduate Illustration */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
           animate={{ opacity: 0.2, scale: 1, filter: 'blur(0px)' }}
           transition={{ duration: 3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[110%] max-w-[1000px] pointer-events-none z-0 flex justify-center items-center"
        >
            <motion.img 
              src="/graduate.png" 
              alt="Graduate Illustration" 
              className="w-full h-auto object-contain mix-blend-multiply opacity-80"
              style={{ maskImage: "radial-gradient(circle at center, black 10%, transparent 60%)", WebkitMaskImage: "radial-gradient(circle at center, black 15%, transparent 60%)" }}
              animate={{ y: [-20, 20, -20], rotate: [-1.5, 1.5, -1.5], scale: [1, 1.02, 1] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            />
        </motion.div>

        {/* Floating Particles / Decorations */}
        <motion.div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           {[...Array(8)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute rounded-full bg-[#c0a080]"
               style={{
                 width: Math.random() * 4 + 2 + 'px',
                 height: Math.random() * 4 + 2 + 'px',
                 top: Math.random() * 100 + '%',
                 left: Math.random() * 100 + '%',
                 opacity: Math.random() * 0.3 + 0.1,
                 filter: 'blur(1px)'
               }}
               animate={{
                 y: [0, -40, 0],
                 opacity: [0.1, 0.4, 0.1],
                 scale: [1, 1.5, 1]
               }}
               transition={{
                 duration: Math.random() * 5 + 5,
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 5
               }}
             />
           ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 mb-16 flex flex-col items-center gap-4"
        >
           <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="text-[#c0a080]/60 w-16 h-16 flex items-center justify-center border border-[#c0a080]/30 rounded-full p-2 mb-4"
           >
              <Sparkles className="w-6 h-6" strokeWidth={1} />
           </motion.div>
           <motion.p
             initial={{ opacity: 0, tracking: '0em', filter: 'blur(8px)' }} animate={{ opacity: 1, tracking: '0.6em', filter: 'blur(0px)' }}
             transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="text-sm md:text-base font-medium text-[#7A6B5D] uppercase tracking-[0.6em] ml-3"
           >
             Thư mời tham dự
           </motion.p>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.95 }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-serif text-[#1C1A17] mb-4 leading-[1.1] italic font-light relative z-10 drop-shadow-lg tracking-[-0.02em]"
        >
          Lễ Trưởng Thành của
        </motion.h1>

        <motion.div className="relative z-10 my-6">
          <motion.div animate={{ rotate: [0, 8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-16 -left-20 text-[#a07040]/30 hidden md:block mix-blend-multiply">
            <GraduationCap size={80} strokeWidth={0.5} />
          </motion.div>
          <motion.div animate={{ rotate: [0, -12, 0], y: [0, -15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-12 -right-16 text-[#a07040]/30 hidden md:block mix-blend-multiply">
            <ScrollText size={72} strokeWidth={0.5} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50, filter: 'blur(15px)', scale: 0.9 }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 2.2, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative px-4"
          >
             <div className="absolute inset-0 bg-[#c0a080]/10 blur-[50px] rounded-full scale-110"></div>
             <h2 className="text-[3.2rem] sm:text-[5rem] md:text-[6.5rem] lg:text-[8.5rem] font-serif font-normal text-[#936639] relative z-10 drop-shadow-[0_15px_40px_rgba(147,102,57,0.3)] leading-[1] pb-4 tracking-[-0.02em] max-w-[90vw] mx-auto text-balance">
                {eventConfig.graduateName}
             </h2>
          </motion.div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scaleX: 0, backgroundColor: 'rgba(192,160,128,0)' }} animate={{ opacity: 1, scaleX: 1, backgroundColor: 'rgba(192,160,128,0.6)' }}
           transition={{ duration: 2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
           className="w-40 h-[2px] mb-24 mt-8 relative"
        >
           <div className="absolute inset-0 bg-white blur-[4px]"></div>
           <div className="absolute inset-0 bg-[#a07040]/60"></div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-8 relative z-10"
        >
            <p className="text-sm md:text-base uppercase tracking-[0.5em] font-medium text-[#7A6B5D] ml-2">Hân hạnh đón tiếp</p>
            <div className="px-12 py-6 rounded-full border border-white/40 bg-white/30 backdrop-blur-md shadow-[0_20px_40px_rgba(140,122,107,0.1)]">
               <p className="text-3xl md:text-5xl font-serif text-[#1C1A17] italic font-light drop-shadow-sm tracking-tight">Cậu và gia đình</p>
            </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 2.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer group"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          whileHover={{ y: -5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C7A6B] group-hover:text-[#1C1A17] transition-colors font-medium">Kéo xuống</span>
          <div className="relative">
             <motion.div 
                animate={{ height: ["0%", "100%", "0%"], y: [0, 20, 40], opacity: [0, 1, 0] }} 
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-[1px] h-12 bg-gradient-to-b from-[#8C7A6B] to-[#1C1A17] origin-top relative z-10"
             />
             <motion.div 
                className="w-[3px] h-12 bg-[#c0a080] origin-top absolute top-0 -left-[1px] blur-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             />
          </div>
        </motion.div>
      </motion.section>

      <section className="py-40 px-6 md:px-12 relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 md:gap-10">
              <div className="w-full lg:w-1/3 mt-0 lg:mt-24">
                <Reveal blur yOffset={50} parallax parallaxOffset={60}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-panel px-8 py-20 md:px-10 md:py-24 rounded-[3rem] md:rounded-[4rem] flex flex-col items-center text-center w-full shadow-[0_20px_40px_rgba(140,122,107,0.08)] hover:shadow-[0_30px_60px_rgba(140,122,107,0.15)] transition-all duration-500 relative overflow-hidden group/item border border-white/50"
                  >
                     <div className="absolute top-0 right-0 w-40 h-40 bg-white/40 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                     <motion.div
                       initial={{ rotate: -10 }}
                       whileInView={{ rotate: 0 }}
                       transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                     >
                       <CalendarIcon strokeWidth={1} className="w-12 h-12 text-[#a07040] mb-10 relative z-10 group-hover/item:scale-110 transition-transform duration-500" />
                     </motion.div>
                     <h3 className="text-[10px] uppercase tracking-[0.5em] font-medium text-[#7A6B5D] mb-6 relative z-10">Ngày tháng</h3>
                     <p className="text-3xl md:text-4xl font-serif text-[#1C1A17] relative z-10 tracking-wide font-light">{eventConfig.date}</p>
                  </motion.div>
                </Reveal>
              </div>
              
              <div className="w-full lg:w-1/3 mt-0 lg:-mt-12">
                <Reveal blur delay={0.15} yOffset={50} parallax parallaxOffset={30}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-panel px-8 py-24 md:px-10 md:py-32 rounded-[3rem] md:rounded-[4rem] flex flex-col items-center text-center w-full shadow-[0_20px_40px_rgba(140,122,107,0.12)] hover:shadow-[0_30px_60px_rgba(140,122,107,0.2)] transition-all duration-500 relative overflow-hidden group/item border border-white/60 bg-white/50"
                  >
                     <div className="absolute top-0 left-0 w-40 h-40 bg-white/40 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                     <motion.div
                       initial={{ rotate: 10 }}
                       whileInView={{ rotate: 0 }}
                       transition={{ type: "spring", stiffness: 200, delay: 0.45 }}
                     >
                       <Clock strokeWidth={1} className="w-14 h-14 text-[#a07040] mb-10 relative z-10 group-hover/item:scale-110 transition-transform duration-500" />
                     </motion.div>
                     <h3 className="text-[10px] uppercase tracking-[0.5em] font-medium text-[#7A6B5D] mb-6 relative z-10">Thời gian</h3>
                     <p className="text-4xl md:text-5xl font-serif text-[#1C1A17] relative z-10 tracking-wide font-light">{eventConfig.time}</p>
                  </motion.div>
                </Reveal>
              </div>

              <div className="w-full lg:w-1/3 mt-0 lg:mt-32">
                <Reveal blur delay={0.3} yOffset={50} parallax parallaxOffset={80}>
                  <motion.div 
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="glass-panel px-8 py-20 md:px-10 md:py-24 rounded-[3rem] md:rounded-[4rem] flex flex-col items-center text-center w-full shadow-[0_20px_40px_rgba(140,122,107,0.08)] hover:shadow-[0_30px_60px_rgba(140,122,107,0.15)] transition-all duration-500 relative overflow-hidden group/item border border-white/50"
                  >
                     <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#c0a080]/15 blur-[40px] rounded-full pointer-events-none opacity-0 group-hover/item:opacity-100 transition-opacity duration-700"></div>
                     <motion.div
                       animate={{ y: [0, -6, 0] }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     >
                       <MapPin strokeWidth={1} className="w-12 h-12 text-[#a07040] mb-10 relative z-10 group-hover/item:scale-110 transition-transform duration-500" />
                     </motion.div>
                     <h3 className="text-[10px] uppercase tracking-[0.5em] font-medium text-[#7A6B5D] mb-6 relative z-10">Địa điểm</h3>
                     <p className="text-2xl font-serif text-[#1C1A17] leading-relaxed relative z-10 font-light px-4">{eventConfig.location}</p>
                  </motion.div>
                </Reveal>
              </div>
          </div>
      </section>

      <section className="py-20 md:py-40 px-6 max-w-7xl mx-auto w-full relative z-10">
         <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="w-full lg:w-5/12 flex flex-col mt-0 lg:mt-20">
               <Reveal blur yOffset={60} parallax parallaxOffset={40}>
                  <motion.div 
                     whileHover={{ scale: 1.02 }}
                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
                     className="glass-panel py-16 px-8 md:p-16 rounded-[4rem] w-full relative overflow-hidden shadow-[0_40px_80px_rgba(140,122,107,0.15)] border-2 border-white/70 mx-auto max-w-[480px]"
                  >
                     <div className="absolute top-0 right-0 w-80 h-80 bg-white/50 blur-[60px] rounded-full pointer-events-none mix-blend-overlay"></div>
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-radial from-[#c0a080]/20 to-transparent blur-[70px] rounded-full pointer-events-none mix-blend-multiply"></div>
                     <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/40 blur-[50px] rounded-full pointer-events-none"></div>
                     
                     <h3 className="text-3xl font-serif mb-16 text-[#1C1A17] text-center relative z-10 tracking-[0.3em] font-light drop-shadow-sm uppercase">Tháng 05 . 2026</h3>
                     <div className="relative z-10">
                        <div className="grid grid-cols-7 gap-y-10 gap-x-2 text-center text-[10px] md:text-xs font-semibold text-[#7A6B5D] mb-10 uppercase tracking-widest">
                          <div>T2</div><div>T3</div><div>T4</div><div>T5</div><div>T6</div><div>T7</div><div>CN</div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-6 md:gap-y-8 gap-x-2 text-center font-serif text-base md:text-lg">
                          <div className="text-transparent">0</div>
                          <div className="text-transparent">0</div>
                          <div className="text-transparent">0</div>
                          <div className="text-transparent">0</div>
                          {[...Array(24)].map((_, i) => (
                              <div key={i+1} className="py-1 text-[#5a544d]">{i+1}</div>
                          ))}
                          
                          <div className="relative inline-flex items-center justify-center">
                            <span className="relative z-10 text-white font-medium">25</span>
                            <motion.div 
                                initial={{ scale: 0 }} whileInView={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.5, delay: 0.5 }} viewport={{ once: true }}
                                className="absolute inset-0 bg-[#c0a080] rounded-full scale-[1.5] shadow-[0_0_20px_rgba(192,160,128,0.4)] z-0"
                            ></motion.div>
                          </div>

                          {[26,27,28,29,30,31].map(d => (
                               <div key={d} className="py-1 text-[#5a544d]">{d}</div>
                          ))}
                        </div>
                     </div>
                  </motion.div>
               </Reveal>
            </div>
            
            <div className="w-full lg:w-7/12">
               <Reveal blur delay={0.2} yOffset={40} parallax parallaxOffset={80}>
                 <div className="p-8 md:p-12 flex flex-col justify-center max-w-2xl mx-auto items-center lg:items-start text-center lg:text-left">
                    <motion.div animate={{ rotate: [0, 4, -4, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                       <GraduationCap strokeWidth={0.5} className="w-16 h-16 md:w-20 md:h-20 text-[#a07040]/80 mb-10" />
                    </motion.div>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#1C1A17] font-light italic mb-8 leading-snug">
                      Đánh dấu một<br/>cột mốc trưởng thành
                    </h3>
                    <p className="text-[#7A6B5D] text-base md:text-lg leading-relaxed mb-10 font-light max-w-md">
                       Ba năm trôi qua như một cái chớp mắt. Cùng nhau, chúng ta đã đi qua những niềm vui, những đêm thức trắng và những kỷ niệm không thể nào quên.
                    </p>
                    <div className="w-24 h-[1px] bg-gradient-to-r from-[#a07040]/50 to-transparent lg:ml-0 mx-auto"></div>
                 </div>
               </Reveal>
            </div>
         </div>
      </section>

      <Countdown targetDate={eventConfig.targetDate} />

      <section className="py-24 md:py-40 px-6 max-w-7xl mx-auto w-full relative z-10">
         <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
            
            <div className="w-full lg:w-4/12 flex flex-col items-center lg:items-start text-center lg:text-left shrink-0 relative z-10">
               <Reveal blur yOffset={40}>
                 <span className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] font-medium text-[#7A6B5D] mb-6 block lg:ml-1 hidden md:block">Đường đi đến</span>
                 <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif italic text-[#1C1A17] font-light drop-shadow-sm mb-6 md:mb-8 leading-[1.1]">Lễ Đài<br className="hidden lg:block"/>Trưởng Thành</h3>
                 <p className="text-[#5a544d] mb-0 lg:mb-12 text-[15px] md:text-lg font-light leading-relaxed max-w-md mx-auto lg:mx-0">
                   Lễ phục đã sẵn sàng, nụ cười đã nở trên môi. Tớ đang chờ cậu tại hội trường lớn để cùng chung vui trong khoảnh khắc ý nghĩa này.
                 </p>
                 
                 <div className="hidden lg:flex justify-start w-full">
                     <motion.a 
                       href={eventConfig.mapLink} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center justify-center gap-4 bg-[#1C1A17] text-[#FAF8F5] px-12 py-6 rounded-full text-base font-medium transition-all duration-700 shadow-[0_15px_40px_rgba(28,26,23,0.3)] hover:shadow-[0_20px_50px_rgba(160,112,64,0.35)] relative overflow-hidden ring-1 ring-transparent hover:ring-[#c0a080]/40"
                       whileHover={{ scale: 1.02, y: -2 }}
                       whileTap={{ scale: 0.98 }}
                     >
                       <div className="absolute inset-0 bg-[#a07040] translate-y-[110%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                       <Navigation className="w-5 h-5 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-500 relative z-10 shrink-0" />
                       <span className="relative z-10 tracking-[0.25em] group-hover:tracking-[0.3em] transition-all duration-500 uppercase text-[11px] whitespace-nowrap">Chỉ đường qua Google Maps</span>
                     </motion.a>
                 </div>
               </Reveal>
            </div>
            
            <div className="w-full lg:w-8/12 relative flex flex-col items-center">
               <Reveal yOffset={60} blur parallax parallaxOffset={30}>
                  <div className="glass-panel p-3 md:p-6 lg:p-8 rounded-[2.5rem] md:rounded-[3rem] shadow-[0_30px_80px_rgba(140,122,107,0.12)] border border-white/60 relative overflow-hidden group/card bg-white/40 w-full mb-8 lg:mb-0">
                     <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-[#c0a080]/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000 blur-xl pointer-events-none"></div>
                     <div className="w-full h-[350px] sm:h-[450px] md:h-[600px] bg-[#EBE5D9] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] relative group z-10 border-[1.5px] border-white/60">
                       <iframe 
                         src={eventConfig.mapUrl}
                         className="w-full h-full absolute inset-0 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000 grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
                         style={{ border: 0 }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                       ></iframe>
                     </div>
                  </div>
               </Reveal>

               <div className="flex lg:hidden justify-center w-full mt-6">
                 <div className="w-full">
                   <Reveal yOffset={30} blur>
                     <motion.a 
                       href={eventConfig.mapLink} target="_blank" rel="noopener noreferrer"
                       className="group flex items-center justify-center gap-3 bg-[#1C1A17] text-[#FAF8F5] px-8 py-5 rounded-[2rem] text-sm font-medium transition-all duration-700 shadow-[0_15px_40px_rgba(28,26,23,0.3)] hover:shadow-[0_20px_50px_rgba(160,112,64,0.35)] relative overflow-hidden ring-1 ring-transparent hover:ring-[#c0a080]/40 w-full sm:max-w-[320px] mx-auto"
                       whileHover={{ scale: 1.02, y: -2 }}
                       whileTap={{ scale: 0.98 }}
                     >
                       <div className="absolute inset-0 bg-[#a07040] translate-y-[110%] group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                       <Navigation className="w-4 h-4 group-hover:rotate-45 group-hover:scale-110 transition-transform duration-500 relative z-10 shrink-0" />
                       <span className="relative z-10 tracking-[0.2em] transition-all duration-500 uppercase text-[10px] whitespace-nowrap">Chỉ đường qua Maps</span>
                     </motion.a>
                   </Reveal>
                 </div>
               </div>
            </div>
         </div>
      </section>

      <section className="pb-40 pt-40 px-6 max-w-6xl mx-auto w-full relative z-10">
         <Reveal blur yOffset={60} parallax parallaxOffset={30}>
             <div className="glass-panel p-10 md:p-20 lg:p-24 rounded-[4rem] md:rounded-[5rem] shadow-[0_40px_100px_rgba(140,122,107,0.15)] border-2 border-white/80 relative overflow-hidden bg-white/40 flex flex-col xl:flex-row gap-16 lg:gap-24 items-center flex-wrap">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/60 blur-[60px] rounded-full pointer-events-none mix-blend-overlay"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#c0a080]/15 blur-[80px] rounded-full pointer-events-none mix-blend-multiply"></div>
                
                <div className="flex-1 text-center xl:text-left relative z-10 w-full xl:w-auto flex flex-col justify-center items-center xl:items-start max-w-lg mx-auto xl:mx-0">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                     <Sparkles strokeWidth={1} className="w-12 h-12 text-[#a07040] mb-12 relative z-10 drop-shadow-md" />
                  </motion.div>
                  
                  <h3 className="text-4xl md:text-6xl lg:text-[4rem] font-serif mb-6 text-[#1C1A17] italic font-light relative z-10 drop-shadow-sm tracking-tight leading-[1.1]">Xác nhận <br className="hidden xl:block" />tham dự</h3>
                  <p className="text-[11px] md:text-xs text-[#7A6B5D] mb-12 tracking-[0.4em] font-medium uppercase relative z-10 leading-loose">Sự hiện diện của bạn là<br/>một niềm vinh hạnh rất trân quý</p>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[11px] tracking-[0.3em] uppercase text-[#7A6B5D] hover:text-[#1C1A17] transition-all duration-300 pb-1 border-b border-transparent hover:border-[#1C1A17] relative z-10 font-medium tracking-widest hover:drop-shadow-[0_0_8px_rgba(160,112,64,0.3)] hidden xl:block mt-8"
                  >
                     Xem lời chúc của mọi người
                  </motion.button>
                </div>
                
                <div className="space-y-6 md:space-y-8 flex-1 text-left relative z-10 w-full max-w-lg mx-auto xl:mx-0 shrink-0">
                  {isSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="glass-panel p-8 md:p-12 rounded-[3rem] flex flex-col items-center justify-center text-center border border-white/60 bg-white/40 shadow-[0_20px_40px_rgba(140,122,107,0.1)]"
                    >
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-16 h-16 text-[#a07040] mb-6" />
                      </motion.div>
                      <h4 className="text-2xl font-serif italic text-[#1C1A17] font-light mb-4 text-balance">Cảm ơn bạn đã phản hồi!</h4>
                      <p className="text-[#7A6B5D] text-sm md:text-base leading-relaxed">
                        {rsvpAttending === 'yes' 
                          ? "Hẹn gặp lại bạn tại buổi lễ nhé. Sự hiện diện của bạn là niềm vui lớn nhất của mình!"
                          : "Thật tiếc vì bạn không thể đến, nhưng cảm ơn bạn vì đã gửi lời chúc!"}
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <input 
                        type="text"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Họ và tên của bạn..."
                        className="glass-input w-full text-[#1C1A17] text-base md:text-lg rounded-[2rem] focus:outline-none block py-5 md:py-6 px-6 md:px-8 transition-all duration-500 placeholder:text-[#a89886]"
                        disabled={isSubmitting}
                      />
                      <div className="relative group/select">
                          <select 
                            value={rsvpAttending} 
                            onChange={(e) => setRsvpAttending(e.target.value)}
                            className={`glass-input w-full text-base md:text-lg rounded-[2rem] focus:outline-none block py-5 md:py-6 px-6 md:px-8 appearance-none transition-all duration-500 cursor-pointer ${!rsvpAttending ? 'text-[#a89886]' : 'text-[#1C1A17]'}`}
                            disabled={isSubmitting}
                          >
                             <option value="" disabled hidden>Bạn sẽ tham dự chứ?</option>
                             <option value="yes" className="text-[#1C1A17]">Vâng, mình sẽ đến tham dự!</option>
                             <option value="no" className="text-[#1C1A17]">Tiếc quá, mình không thể đến...</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-8 flex items-center text-[#a07040] group-hover/select:text-[#805030] transition-colors">
                             <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                      </div>
                      <textarea 
                        rows={4}
                        value={rsvpMessage}
                        onChange={(e) => setRsvpMessage(e.target.value)}
                        placeholder="Gửi vài lời chúc đến mình nhé..." 
                        className="glass-input w-full text-[#1C1A17] text-base md:text-lg rounded-[2rem] focus:outline-none block py-5 md:py-6 px-6 md:px-8 resize-none transition-all duration-500 placeholder:text-[#a89886]"
                        disabled={isSubmitting}
                      ></textarea>

                      <AnimatePresence>
                        {errorMsg && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-700/80 bg-red-100/50 px-6 py-3 rounded-2xl text-sm border border-red-200/50"
                          >
                            {errorMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      <motion.button 
                        onClick={handleRsvpSubmit}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-full bg-[#1C1A17] text-[#FAF8F5] text-sm md:text-base font-semibold py-6 md:py-7 rounded-[2rem] tracking-[0.4em] uppercase transition-all duration-700 flex items-center justify-center gap-4 group shadow-[0_15px_30px_rgba(28,26,23,0.25)] hover:shadow-[0_20px_40px_rgba(160,112,64,0.35)] relative overflow-hidden z-10 hover:ring-2 ring-transparent hover:ring-[#c0a080]/30 mt-4 md:mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        <div className="absolute inset-0 bg-[#a07040] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-full group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out"></div>
                        
                        {isSubmitting ? (
                          <Loader2 className="w-5 h-5 md:w-6 md:h-6 text-[#FAF8F5] animate-spin relative z-10" />
                        ) : (
                          <Heart className="w-5 h-5 md:w-6 md:h-6 text-[#FAF8F5] group-hover:scale-125 transition-transform duration-500 relative z-10 group-hover:fill-white" />
                        )}
                        
                        <span className="relative z-10 mt-1 pointer-events-none group-hover:tracking-[0.45em] transition-all duration-500">
                          {isSubmitting ? "Đang gửi..." : "Gửi lời phản hồi"}
                        </span>
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-[11px] tracking-[0.3em] w-full text-center uppercase text-[#7A6B5D] hover:text-[#1C1A17] transition-all duration-300 pb-1 relative z-10 font-medium tracking-widest hover:drop-shadow-[0_0_8px_rgba(160,112,64,0.3)] xl:hidden mt-8 block"
                      >
                         <span className="border-b border-transparent hover:border-[#1C1A17]">Xem lời chúc của mọi người</span>
                      </motion.button>
                    </>
                  )}
                </div>

             </div>
         </Reveal>
      </section>

      <section className="py-20 md:py-40 px-6 max-w-6xl mx-auto w-full relative z-10 flex flex-col items-center">
         <Reveal blur yOffset={80} parallax parallaxOffset={40}>
            <div className="relative py-32 px-10 md:px-20 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center overflow-hidden rounded-[3rem] md:rounded-[4rem] group/quote">
               <div className="absolute inset-0 bg-[#EBE5D9]/40 backdrop-blur-md rounded-[3rem] md:rounded-[4rem] border border-white/60"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-[#c0a080]/20 to-transparent blur-[80px] opacity-70 mix-blend-multiply group-hover/quote:from-[#c0a080]/30 transition-all duration-1000"></div>
               
               <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                 <Quote className="w-10 h-10 md:w-12 md:h-12 text-[#c0a080]/60 mb-12 relative z-10 opacity-70" />
               </motion.div>
               <h3 className="text-3xl md:text-5xl lg:text-[4rem] font-serif text-[#1C1A17] italic leading-[1.3] md:leading-[1.4] font-light max-w-4xl drop-shadow-sm mb-16 tracking-tight relative z-10">
                 "Khép lại một chương tuyệt đẹp của thanh xuân, để hé mở một chân trời mới rực rỡ và tự do."
               </h3>
               <motion.div 
                 initial={{ height: 0 }}
                 whileInView={{ height: "100px" }}
                 transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                 className="w-[1px] bg-gradient-to-b from-[#a07040]/50 to-transparent mb-12 relative z-10 origin-top"
               ></motion.div>
               <p className="text-[11px] md:text-xs tracking-[0.6em] uppercase text-[#7A6B5D] font-medium relative z-10">Ký ức tuổi trẻ</p>
            </div>
         </Reveal>
      </section>

      <section className="min-h-[50svh] pb-40 flex flex-col items-center justify-center relative z-10 w-full overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[800px] md:h-[800px] bg-[#c0a080]/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] md:w-[500px] md:h-[500px] bg-white/40 blur-[80px] rounded-full pointer-events-none mix-blend-overlay"></div>
        
        {/* Soft Fireworks / Fireworks Glow */}
        <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            whileInView={{ scale: [0, 1.5, 2], opacity: [0, 0.4, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 0.5 }} 
            className="absolute top-[30%] left-[20%] w-32 h-32 border-[2px] border-[#c0a080]/30 rounded-full"
        ></motion.div>
        <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            whileInView={{ scale: [0, 1.5, 2], opacity: [0, 0.3, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 2 }} 
            className="absolute top-[60%] right-[25%] w-48 h-48 border-[1px] border-[#c0a080]/40 rounded-full"
        ></motion.div>
        <motion.div 
            initial={{ scale: 0, opacity: 0 }} 
            whileInView={{ scale: [0, 1.2, 1.8], opacity: [0, 0.5, 0] }} 
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1.5 }} 
            className="absolute bottom-[20%] left-[30%] w-24 h-24 border-[1.5px] border-white/50 rounded-full"
        ></motion.div>

        {/* Decorative Stars */}
        <motion.div animate={{ rotate: 180, scale: [1, 1.2, 1] }} transition={{ duration: 6, repeat: Infinity }} className="absolute top-[25%] right-[20%] text-[#c0a080]/40">
           <Star size={32} strokeWidth={1} fill="currentColor" className="opacity-20" />
        </motion.div>
        <motion.div animate={{ rotate: -180, scale: [0.8, 1.1, 0.8] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-[35%] left-[15%] text-[#8C7A6B]/30">
           <Star size={24} strokeWidth={1.5} />
        </motion.div>

        <Reveal delay={0.2} blur yOffset={40}>
           <div className="relative z-10 py-12">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[150px] bg-gradient-radial from-[#c0a080]/30 to-transparent blur-[50px] pointer-events-none mix-blend-multiply"></div>
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif italic text-[#1C1A17] mb-8 drop-shadow-[0_15px_30px_rgba(140,122,107,0.2)] leading-tight font-light relative z-10 tracking-tight">Thank You</h2>
             <motion.div 
               initial={{ width: 0, opacity: 0 }} 
               whileInView={{ width: "120px", opacity: 1 }} 
               transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
               viewport={{ once: true }}
               className="h-[2px] cursor-pointer bg-gradient-to-r from-transparent via-[#a07040] to-transparent mx-auto mb-10 relative"
             >
                <div className="absolute inset-0 bg-white blur-[2px]"></div>
             </motion.div>
             <p className="text-[#7A6B5D] text-[11px] tracking-[0.6em] uppercase font-medium relative z-10">Hẹn gặp bạn tại buổi lễ</p>
           </div>
        </Reveal>
      </section>
      </motion.div>
    </>
  );
}

function Countdown({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference = targetDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      } else clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <section className="py-24 md:py-40 px-6 text-center relative z-10 max-w-4xl mx-auto w-full">
       <Reveal blur yOffset={50}>
         <div className="flex flex-col items-center w-full">
           <div className="mb-16 md:mb-24 relative flex flex-col items-center">
             <h3 className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.6em] md:tracking-[0.8em] text-[#7A6B5D]">Khoảnh khắc bắt đầu sau</h3>
             <div className="w-[1px] h-12 bg-gradient-to-b from-[#a07040]/40 to-transparent mt-8"></div>
           </div>
           
           <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-16 w-full">
             <TimeUnit value={timeLeft.days} label="Ngày" />
             <div className="hidden md:block text-3xl font-serif text-[#a07040]/30 italic font-light -mt-8">:</div>
             <div className="md:hidden w-[1px] h-12 bg-gradient-to-b from-transparent via-[#a07040]/20 to-transparent"></div>
             <TimeUnit value={timeLeft.hours} label="Giờ" />
             <div className="hidden md:block text-3xl font-serif text-[#a07040]/30 italic font-light -mt-8">:</div>
             <div className="md:hidden w-[1px] h-12 bg-gradient-to-b from-transparent via-[#a07040]/20 to-transparent"></div>
             <TimeUnit value={timeLeft.minutes} label="Phút" />
           </div>
         </div>
       </Reveal>
    </section>
  );
}

function TimeUnit({ value, label }: { value: number, label: string }) {
  return (
    <div className="flex flex-col items-center justify-center w-32 md:w-40 group">
        <div className="relative mb-6 md:mb-8 h-24 md:h-32 flex items-center justify-center w-full">
            <AnimatePresence mode="popLayout">
                <motion.span 
                    key={value}
                    initial={{ y: 20, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -20, opacity: 0, filter: 'blur(8px)', position: "absolute" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[5rem] md:text-[7rem] lg:text-[8rem] font-serif text-[#1C1A17] font-light leading-none tracking-tight drop-shadow-sm"
                >
                    {value.toString().padStart(2, '0')}
                </motion.span>
            </AnimatePresence>
        </div>
        <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.5em] text-[#8C7A6B] font-medium">{label}</span>
    </div>
  );
}
