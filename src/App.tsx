import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Rocket, 
  ThumbsUp, 
  Timer, 
  Globe, 
  Share2, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Monitor, 
  Megaphone, 
  Palette, 
  TrendingUp, 
  Cpu,
  Bolt,
  Stars,
  CreditCard,
  BarChart3,
  Menu,
  Star,
  Quote
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { CustomCursor } from './components/CustomCursor';
import { AmbientPulse } from './components/AmbientPulse';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 z-[10005] origin-left shadow-[0_0_10px_#06b6d4]"
      style={{ scaleX }}
    />
  );
};

const FadeInSection = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

const StaggerContainer = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={item}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

const FlickerHeading = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const triggerFlicker = () => {
      setFlicker(true);
      setTimeout(() => setFlicker(false), 300);
    };

    const intervalId = setInterval(() => {
      if (Math.random() > 0.5) {
        triggerFlicker();
      }
    }, 10000); // Random check every 10s roughly

    return () => clearInterval(intervalId);
  }, []);

  return (
    <motion.div
      animate={flicker ? { opacity: [1, 0.3, 1, 0.3, 1] } : {}}
      transition={flicker ? { duration: 0.3, times: [0, 0.2, 0.4, 0.6, 1] } : {}}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 bg-surface/70 backdrop-blur-[20px] border-b border-white/10">
    <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
      <span className="text-xl font-display font-bold tracking-tighter text-white uppercase">NovaCore Digital</span>
      <div className="hidden md:flex items-center space-x-12">
        {['About', 'Services', 'Work', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="font-display font-medium tracking-tight text-slate-300 hover:text-white transition-colors"
          >
            {item}
          </a>
        ))}
        <button className="bg-primary-container text-white px-6 py-2 rounded-full font-display font-medium border border-white/10 hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all active:scale-95">
          Get Started
        </button>
      </div>
      <button className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </button>
    </div>
  </nav>
);

const Hero = () => {
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(false);
      setTimeout(() => setIsGlitching(true), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-screen flex items-center pt-20 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <div className="inline-block px-4 py-1.5 mb-6 glass-panel rounded-full border-white/10">
            <span className="text-[14px] font-display font-medium text-secondary-container uppercase tracking-[0.2em]">Next-Gen Digital Agency</span>
          </div>
          <h1 
            className={`font-display text-5xl md:text-7xl gradient-text mb-8 glow-heading font-bold ${isGlitching ? 'animate-glitch' : ''}`}
            data-text="Building Modern Digital Experiences."
          >
            Building Modern Digital Experiences.
          </h1>
          
          <div className="flex gap-6 mb-8 font-display text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Online
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse [animation-delay:0.5s]"></span> ⚡ AI Active
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse [animation-delay:1s]"></span> 🔵 50+ Projects
            </div>
          </div>
          
          <p className="font-sans text-lg text-on-surface-variant max-w-xl mb-12 leading-relaxed">
            We help startups, creators & small businesses grow online through stunning websites, smart marketing, and AI automation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6">
            <button className="px-10 py-4 glass-panel text-white rounded-xl font-display font-semibold border border-primary-container group flex items-center justify-center hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all">
              Book a Free Consultation
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="px-10 py-4 glass-panel text-white rounded-xl font-display font-semibold border border-white/10 hover:bg-white/5 transition-all">
              View Our Work
            </button>
          </div>
        </motion.div>

        <div className="hidden lg:flex relative h-[600px] items-center justify-center overflow-hidden rounded-3xl">
          {/* AI Grid Visualization */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_var(--color-secondary-container)_100%)] opacity-10"></div>
             <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          </div>
          
          <motion.div 
            animate={{ rotateY: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative z-10 w-64 h-64"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(124,58,237,0.8)]">
              <polygon 
                fill="none" 
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" 
                stroke="url(#hex-gradient)" 
                strokeWidth="1"
              />
              <polygon 
                fill="rgba(124, 58, 237, 0.1)" 
                points="50,15 85,32.5 85,67.5 50,85 15,67.5 15,32.5" 
                stroke="rgba(6, 182, 212, 0.5)" 
                strokeWidth="0.5"
              />
              <defs>
                <linearGradient id="hex-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#d2bbff" />
                  <stop offset="100%" stopColor="#4cd7f6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary-container/40 blur-[40px] rounded-full"></div>
          </motion.div>
          
          <div className="absolute top-10 right-10 p-4 glass-panel border-primary-container/20 text-[10px] font-mono text-primary-container/60">
            DECODING_SEQ: 0x8F2
            <br />NEURAL_LOAD: 42%
          </div>
        </div>
      </div>
    </header>
  );
};

const About = () => (
    <FadeInSection id="about" className="py-24 px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-[14px] font-display font-medium text-primary-container uppercase tracking-wider mb-4 block">The NovaCore Edge</span>
        <FlickerHeading>
          <h2 className="font-display text-4xl font-bold mb-6 glow-heading">High-Tier Performance Meets Pristine Design</h2>
        </FlickerHeading>
        <p className="text-lg text-on-surface-variant mb-8 leading-relaxed">
          Our focus is on three non-negotiables: clean aesthetics, lightning-fast delivery, and conversion-optimized architecture. We don't just build sites; we engineer digital growth vehicles that turn visitors into loyal customers.
        </p>
        <div className="flex items-center gap-4 text-secondary-container">
          <CheckCircle2 className="w-6 h-6" />
          <span className="text-xl font-display font-semibold">Certified Digital Craftsmanship</span>
        </div>
      </motion.div>
      
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center">
          <Rocket className="w-10 h-10 text-primary-container mb-4" />
          <span className="font-display text-4xl font-bold text-white">50+</span>
          <p className="text-sm font-display font-medium text-on-surface-variant uppercase tracking-wider">Projects Delivered</p>
        </div>
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center mt-8">
          <ThumbsUp className="w-10 h-10 text-secondary-container mb-4" />
          <span className="font-display text-4xl font-bold text-white">98%</span>
          <p className="text-sm font-display font-medium text-on-surface-variant uppercase tracking-wider">Client Satisfaction</p>
        </div>
        <div className="glass-panel p-8 rounded-xl flex flex-col items-center text-center sm:col-span-2">
          <Timer className="w-10 h-10 text-tertiary mb-4" />
          <span className="font-display text-4xl font-bold text-white">5-Day</span>
          <p className="text-sm font-display font-medium text-on-surface-variant uppercase tracking-wider">Average Turnaround</p>
        </div>
      </StaggerContainer>
    </div>
  </FadeInSection>
);

const ServiceCard = ({ icon: Icon, title, desc, extraClass = "" }) => (
  <div className={`relative group overflow-hidden glass-panel p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-surface-high hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] ${extraClass}`}>
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-primary-container to-secondary-container group-hover:w-full transition-all duration-500"></div>
    
    <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 transition-colors">
      <Icon className="w-12 h-12 text-secondary-container transition-transform group-hover:scale-110" />
    </div>
    
    <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{title}</h3>
    <p className="text-on-surface-variant mb-6 leading-relaxed">{desc}</p>
    
    <div className="opacity-0 translate-x-[-20px] transition-all group-hover:opacity-100 group-hover:translate-x-0 flex items-center font-display text-sm font-medium text-secondary-container uppercase tracking-wider">
      Learn More <ArrowRight className="ml-2 w-4 h-4" />
    </div>
  </div>
);

const Services = () => (
  <FadeInSection id="services" className="py-24 px-8 bg-surface-low/30 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <FlickerHeading>
          <h2 className="font-display text-4xl font-bold mb-4 glow-heading">Bespoke Solutions</h2>
        </FlickerHeading>
        <p className="text-on-surface-variant max-w-xl mx-auto">We provide the technological backbone for your digital ambition.</p>
      </div>
      
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard 
          icon={Monitor} 
          title="Website Design & Development" 
          desc="Custom, high-performance web applications built for speed and visual impact." 
        />
        <ServiceCard 
          icon={Megaphone} 
          title="Social Media Marketing" 
          desc="Strategic content and management to amplify your brand voice across platforms." 
        />
        <ServiceCard 
          icon={Palette} 
          title="Branding & Design" 
          desc="Identity systems that command attention and build lasting trust with your audience." 
        />
        <ServiceCard 
          icon={TrendingUp} 
          title="SEO & Growth Marketing" 
          desc="Technical SEO and performance marketing strategies to dominate search results." 
        />
        <ServiceCard 
          icon={Cpu} 
          title="AI Automation" 
          desc="Implementing intelligent workflows and custom LLM solutions to skyrocket your operational efficiency."
          extraClass="lg:col-span-2"
        />
      </StaggerContainer>
    </div>
  </FadeInSection>
);

const Portfolio = () => {
  const [displayText, setDisplayText] = useState('');
  const fullText = '// Loading Projects...';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const projects = [
    { id: '001-X', tag: 'WEB', title: 'Nexus Protocol', desc: 'Full-scale decentralized app architecture.', color: 'purple', status: 'deployed', metrics: '98/100' },
    { id: '042-Y', tag: 'MARKETING', title: 'Growth Engine', desc: 'Data-driven lead generation system.', color: 'cyan', status: 'active', metrics: '+140%' },
    { id: '109-Z', tag: 'SOCIAL', title: 'Pulse Network', desc: 'Algorithmic brand scaling strategy.', color: 'green', status: 'syncing', metrics: '2.4M/mo' },
    { id: '888-A', tag: 'AI', title: 'Synthetix AI', desc: 'Custom LLM enterprise integration.', color: 'orange', status: 'live', metrics: '+300%' }
  ];

  return (
    <FadeInSection id="work" className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[14px] font-display font-medium text-primary-container uppercase tracking-wider mb-4 block">Our Portfolio</span>
            <FlickerHeading>
              <h2 className="font-display text-4xl font-bold glow-heading flex items-center">
                <span className="text-green-400 font-mono text-3xl">{displayText}</span>
                <span className="terminal-cursor w-2.5 h-8 bg-green-400 ml-2 animate-blink"></span>
              </h2>
            </FlickerHeading>
          </div>
          <button className="text-secondary-container font-display font-medium hover:underline">View All Projects</button>
        </div>
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden glass-panel p-6 rounded-lg border-t-4 group hover:scale-[1.02] transition-all
                ${p.color === 'purple' ? 'border-purple-500' : ''}
                ${p.color === 'cyan' ? 'border-cyan-500' : ''}
                ${p.color === 'green' ? 'border-green-500' : ''}
                ${p.color === 'orange' ? 'border-orange-500' : ''}
              `}
            >
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-cyan-500/10 to-transparent pointer-events-none -top-full group-hover:animate-scan"></div>
              
              <div className="mb-4 flex justify-between items-start">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                    p.color === 'purple' ? 'text-purple-400 border-purple-500/30' : 
                    p.color === 'cyan' ? 'text-cyan-400 border-cyan-500/30' : 
                    p.color === 'green' ? 'text-green-400 border-green-500/30' : 
                    'text-orange-400 border-orange-500/30'
                }`}>[{p.tag}]</span>
                <span className="text-[10px] font-mono text-slate-500">ID: {p.id}</span>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-white group-hover:text-purple-300 transition-colors">{p.title}</h3>
              <p className="text-xs text-on-surface-variant mb-6 font-mono leading-relaxed">{p.desc}</p>
              <div className="mt-auto font-mono text-[10px] text-green-500/80 space-y-1 border-t border-white/5 pt-4">
                <div>status: {p.status} ✓</div>
                <div>{p.tag === 'WEB' ? 'performance' : p.tag === 'MARKETING' ? 'conversion' : p.tag === 'SOCIAL' ? 'reach' : 'efficiency'}: {p.metrics}</div>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
    </FadeInSection>
  );
};

const Contact = () => (
    <FadeInSection id="contact" className="py-24 px-8 max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div>
        <FlickerHeading>
          <h2 className="font-display text-4xl font-bold mb-6 glow-heading">Let's Craft Your Digital Future.</h2>
        </FlickerHeading>
        <p className="text-lg text-on-surface-variant mb-12">Have a project in mind? We'd love to hear from you. Get in touch for a free consultation and audit.</p>
        
        <StaggerContainer className="space-y-8">
          {[
            { Icon: Mail, label: 'Email Us', value: 'hello@novacoredigital.com', color: 'text-primary-container' },
            { Icon: Phone, label: 'Call Us', value: '+49 123 456 7890', color: 'text-secondary-container' },
            { Icon: MapPin, label: 'Visit Us', value: 'Berlin, Germany', color: 'text-primary-container' }
          ].map((item, id) => (
            <div key={id} className="flex items-center gap-6">
              <div className={`w-12 h-12 glass-panel rounded-full flex items-center justify-center ${item.color}`}>
                <item.Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">{item.label}</p>
                <p className="font-display text-lg font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </StaggerContainer>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-10 rounded-3xl border-white/10"
      >
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-on-surface-variant">Full Name</label>
            <input className="w-full bg-surface-lowest border-0 border-b border-white/10 text-white focus:ring-0 focus:border-secondary-container transition-all py-4 px-0" placeholder="Enter your name" type="text" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-on-surface-variant">Email Address</label>
            <input className="w-full bg-surface-lowest border-0 border-b border-white/10 text-white focus:ring-0 focus:border-secondary-container transition-all py-4 px-0" placeholder="name@company.com" type="email" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-2 text-on-surface-variant">Message</label>
            <textarea className="w-full bg-surface-lowest border-0 border-b border-white/10 text-white focus:ring-0 focus:border-secondary-container transition-all py-4 px-0 resize-none" placeholder="How can we help?" rows={4}></textarea>
          </div>
          <button className="w-full py-5 bg-linear-to-r from-primary-container to-secondary-container text-white font-display font-bold rounded-xl border border-white/20 shadow-lg hover:shadow-[0_0_30px_rgba(3,181,211,0.4)] transition-all">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  </FadeInSection>
);

const Footer = () => (
  <footer className="bg-surface-lowest border-t border-white/5 w-full">
    <div className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12 font-display text-sm">
      <div className="md:col-span-2">
        <span className="text-2xl font-bold text-white tracking-tighter mb-4 block">NovaCore Digital</span>
        <p className="text-slate-500 max-w-sm mb-8">High-end digital craftsmanship for the next generation of business leaders. We turn digital potential into market leadership.</p>
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:text-secondary-container transition-colors">
            <Globe className="w-5 h-5" />
          </a>
          <a href="#" className="w-10 h-10 glass-panel rounded-full flex items-center justify-center hover:text-secondary-container transition-colors">
            <Share2 className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Quick Links</h4>
        <ul className="space-y-4">
          {['About', 'Services', 'Work', 'Contact'].map(link => (
            <li key={link}><a href={`#${link.toLowerCase()}`} className="text-slate-500 hover:text-primary transition-colors">{link}</a></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6">Legal</h4>
        <ul className="space-y-4">
          {['Privacy Policy', 'Terms of Service', 'Cookies'].map(link => (
            <li key={link}><a href="#" className="text-slate-500 hover:text-primary transition-colors">{link}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-8 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] uppercase tracking-widest gap-4">
      <p>© 2025 NovaCore Digital. All rights reserved.</p>
      <div className="flex gap-8">
        <span>Agency of the Year 2024 Nominee</span>
        <span>Powered by NovaEngine AI</span>
      </div>
    </div>
  </footer>
);

const HorizontalTestimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const testimonials = [
    { name: 'Sarah Mitchell', role: 'Founder, Bloom Café', text: "NovaCore completely transformed our online presence. Our new site is not just beautiful; it's a lead magnet.", color: 'bg-primary-container/40' },
    { name: 'Daniel Weber', role: 'CEO, FitZone Studio', text: "Working with them was the best decision for our growth strategy. The SEO and Social Media results exceeded every metric.", color: 'bg-secondary-container/40' },
    { name: 'Aisha Khan', role: 'Marketing Manager, UrbanNest', text: "The AI automation tools they built for us saved my team over 20 hours a week. Their tech stack is truly from the future.", color: 'bg-tertiary-container/40' },
    { name: 'James Wilson', role: 'Tech Lead, CryptoGrid', text: "The speed at which they delivered our complex dApp architecture was staggering. True partners in innovation.", color: 'bg-cyan-500/40' },
    { name: 'Elena Rodriguez', role: 'Creative Director, VibeLabel', text: "They just get modern aesthetics. Our brand identity feels years ahead of the competition now.", color: 'bg-purple-500/40' },
    { name: 'Marcus Chen', role: 'Operations, GlobalLogistics', text: "The ROI we've seen since launching our new portal has been incredible. 5-star team all around.", color: 'bg-orange-500/40' }
  ];

  if (isMobile) {
    return (
      <section id="testimonials-section" className="py-24 px-8 bg-surface-low/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-center mb-16 glow-heading">What Our Clients Say</h2>
          <div className="flex flex-col gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl relative">
                <Quote className="text-primary-container w-12 h-12 opacity-10 absolute top-4 right-4" />
                <div className="flex gap-1 text-secondary-container mb-4">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-secondary-container" />)}
                </div>
                <p className="italic text-on-surface-variant mb-8 line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.color}`}></div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="testimonials-wrapper" ref={sectionRef} className="relative h-[300vh]">
      <div id="testimonials-sticky" className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-surface-low/30">
        <motion.div style={{ opacity }} className="text-center mb-12 absolute top-20 left-1/2 -translate-x-1/2 w-full px-8">
          <h2 className="font-display text-4xl font-bold glow-heading">What Our Clients Say</h2>
          <p className="text-on-surface-variant mt-4">Discover the impact of NovaCore partnership.</p>
        </motion.div>

        <div className="px-8">
          <motion.div id="testimonials-track" style={{ x }} className="flex gap-10 w-fit will-change-transform">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className="min-w-[80vw] max-w-[600px] h-fit bg-white/5 backdrop-blur-[20px] border border-white/10 p-10 rounded-[20px] relative shrink-0"
              >
                <Quote className="text-primary-container w-16 h-16 opacity-10 absolute top-6 right-6" />
                <div className="flex gap-1 text-secondary-container mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-secondary-container" />)}
                </div>
                <p className="italic text-xl text-on-surface-variant mb-12 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-full ${t.color} shadow-lg`}></div>
                  <div>
                    <p className="font-bold text-white text-lg">{t.name}</p>
                    <p className="text-xs text-on-surface-variant uppercase tracking-[0.2em] font-bold mt-1">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <div id="h-progress-bar" className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[200px] h-[3px] bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            id="h-progress-fill" 
            style={{ width: progressWidth }} 
            className="h-full bg-linear-to-r from-[#7C3AED] to-[#06B6D4] shadow-[0_0_10px_rgba(124,58,237,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <ScrollProgress />
      <AmbientPulse />
      <NeuralBackground />
      <div className="noise-overlay"></div>
      
      {/* Ambient background depth circles */}
      <div className="fixed -z-10 w-[600px] h-[600px] bg-primary-container blur-[150px] opacity-10 top-0 right-0 rounded-full"></div>
      <div className="fixed -z-10 w-[500px] h-[500px] bg-secondary-container blur-[150px] opacity-10 bottom-0 left-0 rounded-full"></div>
      <div className="fixed -z-10 w-[400px] h-[400px] bg-primary-container blur-[150px] opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

      <Nav />
      <main>
        <Hero />
        <About />
        
        {/* Why Choose Us Section - Integrated directly */}
        <section className="py-24 px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Bolt, title: 'Fast Delivery', desc: 'Agile sprints for rapid deployment.' },
              { icon: Stars, title: 'Modern UI-UX', desc: 'Cutting-edge frosted aesthetics.' },
              { icon: CreditCard, title: 'Affordable', desc: 'Premium results, no corporate bloat.' },
              { icon: BarChart3, title: 'Business Focus', desc: 'Driven by ROI and growth metrics.' }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <item.icon className="w-10 h-10 text-primary-container mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h4 className="font-display font-bold text-lg mb-2 text-white">{item.title}</h4>
                <p className="text-xs text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <Services />
        <Portfolio />

        <HorizontalTestimonials />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
