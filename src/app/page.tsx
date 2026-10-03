"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import HackerBackground from "@/components/HackerBackground";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import {
  Network,
  ShieldCheck,
  Server,
  PenTool,
  Layout,
  Smartphone,
  Code2,
  Globe,
  Terminal,
  Mail,
  MapPin,
  ExternalLink,
  GraduationCap,
  Award,
  BookOpen,
  ArrowDown,
  ArrowRight,
  Plus,
  X,
  Palette,
  Wand2,
  Check,
  ArrowUp,
  Send,
  Compass,
  Sun,
  Moon,
} from "lucide-react";

type Theme = "dark" | "light" | "purple" | "emerald";

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  company?: string;
  role?: string;
  duration?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  highlights: string[];
  process: { title: string; content: string }[];
  figmaUrl?: string;
  pptUrl?: string;
  liveUrl?: string;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  careerlens: {
    id: "careerlens",
    title: "CareerLens — AI Career Assistant & Interview Coach",
    category: "AI / EdTech Web App",
    company: "Final Year Project (Academic)",
    role: "Full-Stack Developer, UI/UX Designer & Lead Researcher",
    duration: "2025 - 2026",
    summary: "CareerLens is a state-of-the-art AI-powered platform designed to close candidates' technical and communication skill gaps through lifelike audio/video avatar mock interviews, real-time stress/anxiety monitoring, and automated resume gap recommendations.",
    metrics: [
      { value: "92%", label: "Anxiety Accuracy Tracking" },
      { value: "40%", label: "Interview Preparation Lift" },
      { value: "Next.js", label: "Front-End Stack" },
      { value: "Supabase", label: "Database / Auth" }
    ],
    highlights: [
      "Engineered a lifelike AI Avatar using web-based WebRTC/audio streaming that reacts seamlessly to user answers.",
      "Developed stress and anxiety monitoring loops analyzing response pacing, pause frequencies, and verbal cues.",
      "Integrated automated resume parser that extracts experience metadata, maps them to job descriptions, and matches structural gaps.",
      "Created course recommendations engine connecting parsed resume gaps to recommended learning path modules."
    ],
    process: [
      {
        title: "01 // User Research & Insights",
        content: "We deployed a comprehensive questionnaire through Google Forms to 150+ students and job seekers. The survey revealed that 76% of applicants feel crippling anxiety during mock questions, and 62% struggle to identify why they fail technical screenings. This directly led us to prioritize the real-time stress indicators and automated resume feedback modules."
      },
      {
        title: "02 // User Flows & High-Fidelity Wireframes",
        content: "Using Figma, we crafted custom layouts optimized for low cognitive friction. The interface features a split-pane dashboard: the left housing the live video avatar, and the right presenting real-time transcript aids. Transitions use smooth, spring-loaded curves to prevent onboarding attrition."
      },
      {
        title: "03 // API Integration & LLM Curation",
        content: "Connected the Next.js client with OpenAI and LangChain routing pipelines to structure personalized dynamic questions. Prompts are curated dynamically based on the uploaded CV and targeted role parameters to ensure authentic industry questions."
      }
    ],
    figmaUrl: "https://www.figma.com/design/vBFFD50iqfbqIiXCsTHXbM/Digital-Scrap-APP--Copy-?node-id=36-848",
    liveUrl: "https://careerlens-delta.vercel.app/",
    pptUrl: "https://canva.link/i3g8x8ycgz734q6"
  },
  isp: {
    id: "isp",
    title: "ISP Enterprise Network Architecture",
    category: "Network Infrastructure Design",
    company: "Enterprise Lab Project",
    role: "Lead Network Infrastructure Architect",
    duration: "2025",
    summary: "Designed a high-availability, fully redundant Service Provider (ISP) network simulation serving enterprise clients, featuring optimal interior gateway routing, robust security policies, and fault-tolerant link aggregations.",
    metrics: [
      { value: "99.99%", label: "Simulated Link Availability" },
      { value: "OSPF", label: "Routing Protocol" },
      { value: "VLANs", label: "Segmentation Rules" },
      { value: "CCNA", label: "Architecture Standard" }
    ],
    highlights: [
      "Constructed custom redundant ring core topology in Cisco Packet Tracer preventing single points of failure.",
      "Structured multi-area OSPF design enabling rapid link-state routing convergence and reduced route calculations.",
      "Configured secure access lists (ACLs) blocking malicious packets at boundary gateways and separating corporate zones.",
      "Created strict VLAN trunking mapping, enabling safe logical segregation of guest, staff, and server subnet ranges."
    ],
    process: [
      {
        title: "01 // Logical Layout & Subnet planning",
        content: "Constructed an efficient variable-length subnet masking (VLSM) strategy to conserve IPv4 space while ensuring 20% room for future enterprise client expansions. Assigned structured static blocks to core routers, dynamic DHCP pools to end zones, and separate isolated blocks for DNS/Web resources."
      },
      {
        title: "02 // Multi-Area OSPF Configuration",
        content: "Implemented Cisco CLI configurations establishing Area 0 for core distribution, and separate non-backbone areas for office blocks. Fine-tuned hello/dead timers and link costs to prioritize optic paths over backup copper serial connections."
      },
      {
        title: "03 // Redundancy & Failure Verification",
        content: "Tested link fault tolerances by manually disabling primary interfaces. The simulation verified that network traffic automatically re-routed over backup link trunks in less than 2.8 seconds, maintaining live connections to active servers without session drops."
      }
    ]
  },
  digitalscrap: {
    id: "digitalscrap",
    title: "Digital Scrap — Mobile UI/UX Design System",
    category: "Startup Internship UI/UX",
    company: "Digital Scrap Inc.",
    role: "Junior UI/UX Designer & Prototyper",
    duration: "2024 (3 Months)",
    summary: "Digital Scrap is a creative mobile startup. During my design tenure, I led the user journey mapping, high-fidelity UI design library creation, and visual brand identity, translating complex recycling flows into simple actions.",
    metrics: [
      { value: "Figma", label: "Primary Tool" },
      { value: "100%", label: "Cohesive Components" },
      { value: "85%", label: "Journey Usability Score" },
      { value: "Canva", label: "Presentation Deck" }
    ],
    highlights: [
      "Collaborated closely with startup product owners to map complex customer journeys into simple mobile recycling screens.",
      "Created a robust Figma Design System utilizing modular components, color variables, and typography scale constraints.",
      "Crafted high-fidelity micro-interactions and interactive prototypes demonstrating smooth transitions between menu screens.",
      "Designed and presented executive Canva standee layouts and pitching decks summarizing research statistics."
    ],
    process: [
      {
        title: "01 // Ideation & Wireframes",
        content: "Mapped the primary recycling submission flows on paper, focusing on eliminating excess buttons. Established a clean floating circular layout highlighting the pick-up request button as the primary action."
      },
      {
        title: "02 // Figma Component Library",
        content: "Built high-fidelity interactive elements including status tracking chips, circular progress wheels, and dark/light responsive buttons utilizing auto-layouts and custom properties to speed up engineering handoffs."
      },
      {
        title: "03 // High-Fidelity Validation",
        content: "Validated interactive screens with a test group of 15 users. Re-adjusted tab bar navigation icons and improved font weights to improve readability for older user demographics."
      }
    ],
    figmaUrl: "https://www.figma.com/design/vBFFD50iqfbqIiXCsTHXbM/Digital-Scrap-APP--Copy-?node-id=36-848",
    pptUrl: "https://canva.link/a25i49c1u6wzmi6"
  }
};

const WHATSAPP_NUMBER = "923174702516";

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [accentHue, setAccentHue] = useState<number>(265);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Micro-interactions states
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [activeSegment, setActiveSegment] = useState(0);

  // Custom Cursor Refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  // 3D Card mouse tilt states
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [cardHovered, setCardHovered] = useState(false);

  // Initialize Theme and Scroll listeners
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme") as Theme | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }

    const savedHue = localStorage.getItem("portfolio-hue");
    if (savedHue) {
      const h = parseInt(savedHue);
      setAccentHue(h);
      document.documentElement.style.setProperty("--accent-hue", h.toString());
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Custom Liquid Cursor Animation Loop
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;
    let cursorFrame: number;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    };

    const updateCursor = () => {
      const ease = 0.15;
      outlineX += (mouseX - outlineX) * ease;
      outlineY += (mouseY - outlineY) * ease;
      if (cursorOutline) {
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
      }
      if (!prefersReducedMotion) {
        cursorFrame = requestAnimationFrame(updateCursor);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    if (!prefersReducedMotion) {
      cursorFrame = requestAnimationFrame(updateCursor);
    }

    // Dynamic magnetic hover bindings
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, [data-magnetic], input, textarea, select, .filter-btn, .swatch, .segment");
      if (isInteractive) {
        cursorDot?.classList.add("cursor-hover");
        cursorOutline?.classList.add("cursor-hover");
      } else {
        cursorDot?.classList.remove("cursor-hover");
        cursorOutline?.classList.remove("cursor-hover");
      }
    };

    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    // Scroll Reveal Intersection Observer
    const reveals = document.querySelectorAll(".reveal-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );
    reveals.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      if (cursorFrame) cancelAnimationFrame(cursorFrame);
      observer.disconnect();
    };
  }, []);

  // Re-observe reveal elements whenever filter active tab changes
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal-fade");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  const switchTheme = (t: Theme) => {
    setTheme(t);
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("portfolio-theme", t);
  };

  const updateHue = (h: number) => {
    setAccentHue(h);
    document.documentElement.style.setProperty("--accent-hue", h.toString());
    localStorage.setItem("portfolio-hue", h.toString());
  };

  // 3D Card Tilt Math
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotX = ((rect.height / 2 - y) / (rect.height / 2)) * 12; // max tilt 12deg
    const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 12;

    setTiltStyle({
      transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
      style: {
        "--x": `${x}px`,
        "--y": `${y}px`
      }
    } as React.CSSProperties);
  };

  const handleCardMouseEnter = () => {
    setCardHovered(true);
  };

  const handleCardMouseLeave = () => {
    setCardHovered(false);
    setTiltStyle({
      transform: "rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.5s ease"
    });
  };

  // Simulation loading btn trigger
  const handleBtnLoading = () => {
    if (isBtnLoading) return;
    setIsBtnLoading(true);
    setTimeout(() => {
      setIsBtnLoading(false);
      alert(" Tactile Submit Simulated Successfully! (Next.js server-side action ready)");
    }, 2000);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const nameEl = document.getElementById("form-name") as HTMLInputElement;
    const emailEl = document.getElementById("form-email") as HTMLInputElement;
    const inquiryEl = document.getElementById("form-inquiry") as HTMLSelectElement;
    const messageEl = document.getElementById("form-message") as HTMLTextAreaElement;

    if (!nameEl || !emailEl || !inquiryEl || !messageEl) return;

    const name = nameEl.value;
    const email = emailEl.value;
    const inquiry = inquiryEl.value;
    const message = messageEl.value;

    const inquiryMap: Record<string, string> = {
      "lead-role": "Product Design Opportunity",
      "network-engineering": "Network Engineering Role",
      "consulting": "Contract / Consulting Collaboration",
      "hello": "Just Saying Hello!"
    };

    const inquiryLabel = inquiryMap[inquiry] || inquiry;

    const text = `Hello Alisha! My name is ${name} (${email}). I am reaching out from your portfolio regarding a "${inquiryLabel}".

Here is my message:
${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
    
    window.open(whatsappUrl, "_blank");
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen selection:bg-purple-500/30 overflow-x-hidden relative">
      {/* Liquid cursor divs */}
      <div ref={cursorDotRef} className="custom-cursor"></div>
      <div ref={cursorOutlineRef} className="custom-cursor-outline"></div>

      {/* ── Background Mesh Light Spheres ── */}
      <div className="mesh-bg">
        <div className="mesh-sphere sphere-1"></div>
        <div className="mesh-sphere sphere-2"></div>
        <div className="mesh-sphere sphere-3"></div>
      </div>

      {/* ── Dynamic Hacker matrix under lay ── */}
      {theme === "dark" && <HackerBackground />}

      {/* ── HEADER ── */}
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-container">
          <a href="#hero" className="logo" data-magnetic>
            <span className="logo-dot"></span>AW.
          </a>

          <nav className="nav-menu">
            <a href="#hero" className="nav-link active">Home</a>
            <a href="#works" className="nav-link">Selected Works</a>
            <a href="#playground" className="nav-link">Playground</a>
            <a href="#skills" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>

          <div className="nav-actions">
            {/* Single Theme Toggle Button */}
            <button
              onClick={() => switchTheme(theme === "dark" ? "light" : "dark")}
              className="theme-btn magnetic"
              aria-label="Toggle Color Theme"
              data-magnetic
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a href="#contact" className="btn btn-primary btn-sm" data-magnetic>Hire Me</a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <span className="bar" style={{ transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "" }}></span>
              <span className="bar" style={{ opacity: mobileMenuOpen ? 0 : 1 }}></span>
              <span className="bar" style={{ transform: mobileMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "" }}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay (rendered conditionally to prevent DOM leakage) */}
      {mobileMenuOpen && (
        <div className="mobile-nav open">
          <nav className="mobile-menu">
            <a href="#hero" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#works" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Selected Works</a>
            <a href="#playground" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Playground</a>
            <a href="#skills" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#experience" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Experience</a>
            <a href="#contact" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a href="#contact" className="btn btn-primary btn-md" onClick={() => setMobileMenuOpen(false)}>Hire Me</a>
          </nav>
        </div>
      )}

      <main>
        {/* ══════════════════════════════════════
            1. HERO SECTION
            ══════════════════════════════════════ */}
        <section id="hero" className="hero-section">
          <div className="container hero-container">
            <div className="hero-content text-left">
              <div className="hero-badge reveal-fade">
                <span className="pulse-indicator"></span> Available for Product Design & Network Roles
              </div>
              <h1 className="hero-title reveal-fade">
                Designing <span className="gradient-text">Secure Systems</span> & Seamless Experiences.
              </h1>
              <p className="hero-subtitle reveal-fade">
                Hello, I&apos;m <strong>Alisha Wasif</strong>. I bridge the technical rigor of Software &amp; Network Engineering with human-centered high-fidelity UI/UX interactions.
              </p>
              <div className="hero-actions reveal-fade">
                <a href="#works" className="btn btn-primary btn-md" data-magnetic>
                  Explore Works <ArrowRight size={18} className="icon-right" />
                </a>
                <a href="#playground" className="btn btn-secondary btn-md" data-magnetic>
                  Interactive Playground
                </a>
              </div>
            </div>

            {/* Premium Intro Video Card */}
            <div className="hero-visual reveal-fade">
              <div className="glass-card hero-glass-card">
                <div className="card-header flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                    <span className="window-title hidden sm:inline">
                      alisha_introduction.mp4
                    </span>
                  </div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full border border-purple-500/30 text-purple-400 bg-purple-500/10 font-bold uppercase tracking-wider">
                    Intro Video
                  </span>
                </div>
                <div className="card-body" style={{ minHeight: "340px", display: "flex", flexDirection: "column" }}>
                  <div className="flex-grow flex flex-col justify-between h-full relative group w-full">
                    <CustomVideoPlayer
                      src="/video.mp4"
                      className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40"
                      width={1920}
                      height={1080}
                      autoPlay={true}
                      playOnScroll={true}
                    />
                    <p className="text-[10px] text-center text-white/40 mt-3 italic">
                      Intro auto-plays and auto-unmutes when visible. Scroll on the player to start with music.
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="floating-badge badge-1">
                <Network size={16} /> Cisco CCNA Routing
              </div>
              <div className="floating-badge badge-2">
                <PenTool size={16} /> Google UX Certified
              </div>
              <div className="floating-badge badge-3">
                <Code2 size={16} /> Next.js / Supabase
              </div>
            </div>
          </div>

          <a href="#skills" className="scroll-indicator" data-magnetic>
            <span className="scroll-mouse">
              <span className="scroll-wheel"></span>
            </span>
            <span className="scroll-text">Scroll Down</span>
          </a>
        </section>

        {/* ══════════════════════════════════════
            2. EXPERTISE / SKILLS SECTION
            ══════════════════════════════════════ */}
        <section id="skills" className="py-24 relative z-10">
          <div className="container">
            <div className="section-header reveal-fade">
              <div className="section-label">01 // Dual Core</div>
              <h2 className="section-title">Core Expertise</h2>
              <p className="section-desc">
                Bridging infrastructure constraints and high-end interactive digital prototype systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Networking Card */}
              <div className="glass-card p-8 reveal-fade">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Network size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Network Infrastructure</h3>
                <ul className="space-y-3 text-sm text-secondary" style={{ color: "var(--text-secondary)" }}>
                  <li className="flex items-center gap-2"><Server size={16} className="text-purple-400" /> CCNA Routing &amp; Switching</li>
                  <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-purple-400" /> Boundary Access Security / ACL</li>
                  <li className="flex items-center gap-2"><Globe size={16} className="text-purple-400" /> Multi-Area OSPF &amp; VLANs</li>
                  <li className="flex items-center gap-2"><Terminal size={16} className="text-purple-400" /> VLSM Subnetting IP Layouts</li>
                </ul>
              </div>

              {/* Design Card */}
              <div className="glass-card p-8 reveal-fade">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <PenTool size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Digital Product Design</h3>
                <ul className="space-y-3 text-sm text-secondary" style={{ color: "var(--text-secondary)" }}>
                  <li className="flex items-center gap-2"><Layout size={16} className="text-purple-400" /> Auto-Layout Figma Design Systems</li>
                  <li className="flex items-center gap-2"><Smartphone size={16} className="text-purple-400" /> Interactive Mobile UX Prototyping</li>
                  <li className="flex items-center gap-2"><Wand2 size={16} className="text-purple-400" /> Low-to-High Fidelity User Journey</li>
                  <li className="flex items-center gap-2"><BookOpen size={16} className="text-purple-400" /> User Research &amp; Field Survey</li>
                </ul>
              </div>

              {/* Web Dev Card */}
              <div className="glass-card p-8 reveal-fade">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Code2 size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">Web Engineering</h3>
                <ul className="space-y-3 text-sm text-secondary" style={{ color: "var(--text-secondary)" }}>
                  <li className="flex items-center gap-2"><Code2 size={16} className="text-emerald-400" /> React.js / Next.js Framework</li>
                  <li className="flex items-center gap-2"><Layout size={16} className="text-emerald-400" /> Tailored Vanilla CSS3 Core Styling</li>
                  <li className="flex items-center gap-2"><Terminal size={16} className="text-emerald-400" /> Tailwind CSS Integration</li>
                  <li className="flex items-center gap-2"><Globe size={16} className="text-emerald-400" /> Server-side API &amp; Auth Pipelines</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            3. SELECTED WORKS SECTION
            ══════════════════════════════════════ */}
        <section id="works" className="works-section z-10">
          <div className="container">
            <div className="section-header reveal-fade">
              <div className="section-label">02 // Selected Works</div>
              <h2 className="section-title">Selected Case Studies</h2>
              <p className="section-desc">
                Deep dives outlining OSPF simulated core architectures, startup mobile prototypes, and full-stack AI career preparation systems.
              </p>
            </div>

            {/* Filters */}
            <div className="works-filters reveal-fade">
              <button
                onClick={() => setActiveFilter("all")}
                className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveFilter("networks")}
                className={`filter-btn ${activeFilter === "networks" ? "active" : ""}`}
              >
                Network Architectures
              </button>
              <button
                onClick={() => setActiveFilter("design")}
                className={`filter-btn ${activeFilter === "design" ? "active" : ""}`}
              >
                Mobile Apps / UI
              </button>
              <button
                onClick={() => setActiveFilter("saas")}
                className={`filter-btn ${activeFilter === "saas" ? "active" : ""}`}
              >
                AI &amp; SaaS Systems
              </button>
            </div>

            {/* Grid */}
            <div className="works-grid">
              {/* Case 1: CareerLens */}
              {(activeFilter === "all" || activeFilter === "saas") && (
                <div className="work-card reveal-fade">
                  <div className="work-img-container h-48 bg-gradient-to-br from-emerald-500/20 to-purple-500/10 flex items-center justify-center relative">
                    <Code2 size={64} className="text-emerald-400 opacity-60" />
                    <div className="absolute top-4 right-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      Final Year Project
                    </div>
                  </div>
                  <div className="work-info">
                    <div className="work-tags">
                      <span className="tag">Next.js</span>
                      <span className="tag">Supabase</span>
                      <span className="tag">Generative AI</span>
                    </div>
                    <h3 className="work-card-title">CareerLens — Dynamic AI Virtual Coach</h3>
                    <p className="work-card-desc">
                      An interactive AI-powered career assistant parsing resumes, analyzing scores, and simulating real-time audio/text mock interview feedback.
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button
                        onClick={() => setSelectedCaseStudy(CASE_STUDIES.careerlens)}
                        className="btn-text"
                      >
                        View Process <Plus size={16} />
                      </button>
                      <div className="flex gap-3">
                        <a href="https://www.figma.com/design/vBFFD50iqfbqIiXCsTHXbM/Digital-Scrap-APP--Copy-?node-id=36-848" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:underline">
                          Figma
                        </a>
                        <a href="https://careerlens-delta.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-purple-400 flex items-center gap-1 hover:underline">
                          Visit <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Case 2: ISP */}
              {(activeFilter === "all" || activeFilter === "networks") && (
                <div className="work-card reveal-fade">
                  <div className="work-img-container h-48 bg-gradient-to-br from-blue-500/20 to-teal-500/10 flex items-center justify-center relative">
                    <Network size={64} className="text-blue-400 opacity-60" />
                    <div className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      Cisco packet Tracer
                    </div>
                  </div>
                  <div className="work-info">
                    <div className="work-tags">
                      <span className="tag">OSPF Routing</span>
                      <span className="tag">VLAN Trunking</span>
                      <span className="tag">IP Subnetting</span>
                    </div>
                    <h3 className="work-card-title">ISP Core Redundant Network Topology</h3>
                    <p className="work-card-desc">
                      High-availability ISP lab simulation, configuring dynamic redundant paths routing through OSPF Area divisions.
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button
                        onClick={() => setSelectedCaseStudy(CASE_STUDIES.isp)}
                        className="btn-text"
                      >
                        View Process <Plus size={16} />
                      </button>
                      <span className="text-xs text-muted" style={{ color: "var(--text-muted)" }}>Redundancy Active</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Case 3: Digital Scrap */}
              {(activeFilter === "all" || activeFilter === "design") && (
                <div className="work-card reveal-fade">
                  <div className="work-img-container h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/10 flex items-center justify-center relative">
                    <Smartphone size={64} className="text-pink-400 opacity-60" />
                    <div className="absolute top-4 right-4 bg-pink-500/20 border border-pink-500/30 text-pink-400 text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                      Startup Internship
                    </div>
                  </div>
                  <div className="work-info">
                    <div className="work-tags">
                      <span className="tag">UI/UX Design</span>
                      <span className="tag">Figma Library</span>
                      <span className="tag">Recycle Flows</span>
                    </div>
                    <h3 className="work-card-title">Digital Scrap — Green Mobile Concept</h3>
                    <p className="work-card-desc">
                      Worked closely with startups to map clean interfaces, construct functional component trees, and test layout systems.
                    </p>
                    <div className="flex justify-between items-center pt-4 border-t border-white/5">
                      <button
                        onClick={() => setSelectedCaseStudy(CASE_STUDIES.digitalscrap)}
                        className="btn-text"
                      >
                        View Process <Plus size={16} />
                      </button>
                      <div className="flex gap-3">
                        <a href="https://www.figma.com/design/vBFFD50iqfbqIiXCsTHXbM/Digital-Scrap-APP--Copy-?node-id=36-848" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-pink-400 hover:underline">
                          Board
                        </a>
                        <a href="https://canva.link/a25i49c1u6wzmi6" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-secondary hover:underline" style={{ color: "var(--text-secondary)" }}>
                          Pitch PPT
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            4. UI/UX COURSEWORK SECTION
            ══════════════════════════════════════ */}
        <section id="course-works" className="py-24 relative z-10">
          <div className="container">
            <div className="section-header reveal-fade">
              <div className="section-label">03 // Academics</div>
              <h2 className="section-title">UI/UX Course Projects</h2>
              <p className="section-desc">
                High-fidelity interface explorations, UX research flows, and standee print media designs.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {/* Course 1 */}
              <a
                href="https://www.figma.com/design/tNdseG0OuxvLRzG3d7ryzU/Travelling-App--Community-?node-id=0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 reveal-fade block"
              >
                <div className="h-32 bg-purple-500/10 border border-purple-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <BookOpen size={40} className="text-purple-400" />
                </div>
                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">Figma Prototype</span>
                <h4 className="font-bold text-lg mt-2">Travelling App</h4>
                <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Mobile platform designed to foster community sharing and dynamic localized tourist routing guides.
                </p>
              </a>

              {/* Course 2 */}
              <a
                href="https://www.figma.com/design/G9bbuoyLZGHZwyfhKRFD9y/Forget-password--Community-?node-id=0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 reveal-fade block"
              >
                <div className="h-32 bg-pink-500/10 border border-pink-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <ShieldCheck size={40} className="text-pink-400" />
                </div>
                <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">Figma Flow</span>
                <h4 className="font-bold text-lg mt-2">Forgot Password</h4>
                <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Secure password reset journey designed to reduce customer cognitive load and login hurdles.
                </p>
              </a>

              {/* Course 3 */}
              <a
                href="https://www.figma.com/design/43RtTuVftE3AqZZDepU7Vr/Travel-App--Community-?node-id=0-1"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 reveal-fade block"
              >
                <div className="h-32 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <Smartphone size={40} className="text-emerald-400" />
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">UI Exploration</span>
                <h4 className="font-bold text-lg mt-2">Travel Curation App</h4>
                <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Modern mobile prototype mapping outdoor adventure routing, map views, and detail cards.
                </p>
              </a>

              {/* Course 4 */}
              <a
                href="https://canva.link/58rp545b3quz8dg"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-6 reveal-fade block"
              >
                <div className="h-32 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-4 flex items-center justify-center">
                  <Layout size={40} className="text-cyan-400" />
                </div>
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Canva Media</span>
                <h4 className="font-bold text-lg mt-2">Standee Banner</h4>
                <p className="text-xs text-secondary mt-2 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  Large format standee marketing layout optimizing vertical grids and promotional hierarchy models.
                </p>
              </a>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            5. INTERACTIVE MICRO-INTERACTION PLAYGROUND
            ══════════════════════════════════════ */}
        <section id="playground" className="playground-section z-10">
          <div className="container">
            <div className="section-header text-center reveal-fade">
              <div className="section-label">04 // Functional Prototyping</div>
              <h2 className="section-title">Micro-Interaction Playground</h2>
              <p className="section-desc centered">
                Functional components showing UI animations, active responsive states, and custom math curves built in code.
              </p>
            </div>

            <div className="playground-grid">
              {/* Widget 1: Theme Mixer Hue shifter */}
              <div className="glass-card playground-card reveal-fade">
                <div className="playground-card-header">
                  <Palette className="card-icon" />
                  <h3 className="playground-title">Accent Hue Mixer</h3>
                  <p className="playground-subtitle">
                    Drag the range slider to shift the HSL accent colors of this entire website instantly.
                  </p>
                </div>
                <div className="playground-card-body">
                  <div className="theme-mixer-demo">
                    <div className="color-swatches">
                      {[265, 195, 145, 335].map((h) => (
                        <button
                          key={h}
                          onClick={() => updateHue(h)}
                          className={`swatch ${accentHue === h ? "active" : ""}`}
                          style={{
                            background: `hsl(${h}, 89%, 60%)`,
                          }}
                          title={`Select Hue ${h}°`}
                        />
                      ))}
                    </div>
                    <div className="saturation-slider-block">
                      <label htmlFor="hue-slider">Accent Hue Shift: <span className="text-purple-400">{accentHue}</span>°</label>
                      <input
                        type="range"
                        id="hue-slider"
                        min="0"
                        max="360"
                        value={accentHue}
                        onChange={(e) => updateHue(parseInt(e.target.value))}
                        className="custom-range-slider"
                      />
                    </div>
                    <div className="dynamic-reflect-card">
                      <div className="reflect-glowing-circle"></div>
                      <span className="reflect-tag">Live Interface Accent</span>
                      <span className="reflect-title">Glow Card Reflection</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 2: 3D Tilt Inertia Card */}
              <div className="glass-card playground-card reveal-fade">
                <div className="playground-card-header">
                  <Wand2 className="card-icon" />
                  <h3 className="playground-title">3D Inertia Card</h3>
                  <p className="playground-subtitle">
                    Hover and tilt your mouse over this panel to see trigonometric physics-based mouse tracking and reflections.
                  </p>
                </div>
                <div className="playground-card-body spring-card-wrapper">
                  <div
                    id="inertia-card"
                    className={`spring-card ${cardHovered ? "hovered" : ""}`}
                    style={tiltStyle}
                    onMouseMove={handleCardMouseMove}
                    onMouseEnter={handleCardMouseEnter}
                    onMouseLeave={handleCardMouseLeave}
                  >
                    <div className="spring-card-glow"></div>
                    <div className="spring-card-inner">
                      <div className="spring-logo"><Wand2 size={24} /></div>
                      <h4>3D Parallax Card</h4>
                      <p>Active coordinate calculation utilizing vector mouse ratios.</p>
                      <div className="spring-meta">
                        <span className="spring-accent">Active Parallax</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 3: Tactile micro UX Showcase */}
              <div className="glass-card playground-card reveal-fade">
                <div className="playground-card-header">
                  <Compass className="card-icon" />
                  <h3 className="playground-title">Tactile UX Showcase</h3>
                  <p className="playground-subtitle">
                    Interact with subtle micro-interactions mapped with clear animations and transition feedback.
                  </p>
                </div>
                <div className="playground-card-body ux-showcase">
                  {/* Elastic Toggle */}
                  <div className="ux-element">
                    <span className="ux-label">Elastic Toggle Switch</span>
                    <button
                      onClick={() => setIsToggleActive(!isToggleActive)}
                      className={`elastic-toggle ${isToggleActive ? "active" : ""}`}
                      aria-label="Interactive toggle switch"
                    >
                      <span className="toggle-nob"></span>
                    </button>
                  </div>

                  {/* Loading Btn */}
                  <div className="ux-element">
                    <span className="ux-label">Action Button Feedback</span>
                    <button
                      onClick={handleBtnLoading}
                      className={`btn btn-secondary btn-sm loading-btn ${isBtnLoading ? "loading" : ""}`}
                    >
                      <span className="btn-text-content">Submit Request</span>
                      <span className="loader-spinner"></span>
                    </button>
                  </div>

                  {/* Segmented slider tab */}
                  <div className="ux-element">
                    <span className="ux-label">Segmented Tab Slider</span>
                    <div className="segmented-control">
                      <div
                        className="segmented-indicator"
                        style={{
                          left: `${activeSegment * 48 + 3}px`,
                          width: "48px"
                        }}
                      ></div>
                      {[
                        { idx: 0, label: "List" },
                        { idx: 1, label: "Grid" },
                        { idx: 2, label: "Calendar" }
                      ].map((seg) => (
                        <button
                          key={seg.idx}
                          onClick={() => setActiveSegment(seg.idx)}
                          className={`segment ${activeSegment === seg.idx ? "active" : ""}`}
                        >
                          {seg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            6. EXPERIENCE / CREDENTIALS TIMELINE
            ══════════════════════════════════════ */}
        <section id="experience" className="experience-section z-10">
          <div className="container">
            <div className="section-header text-center reveal-fade">
              <div className="section-label">05 // Timeline</div>
              <h2 className="section-title">Credentials &amp; Education</h2>
              <p className="section-desc centered">
                Chronological path highlighting university enrollment, internships, and technical certifications.
              </p>
            </div>

            <div className="timeline">
              {/* University Education */}
              <div className="timeline-item reveal-fade">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2022 - 2026 (Expected)</div>
                <div className="timeline-content glass-card">
                  <span className="timeline-role">BS Software Engineering</span>
                  <span className="timeline-company">PMAS Arid Agriculture University (Rawalpindi, Pakistan)</span>
                  <p className="timeline-text text-sm">
                    Academic studies mapping databases, software requirements engineering, server-side dynamic applications, UI prototyping, and data structures.
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Academic</span>
                    <span className="tag">Software Engineering</span>
                  </div>
                </div>
              </div>

              {/* Startup Internship */}
              <div className="timeline-item reveal-fade">
                <div className="timeline-dot"></div>
                <div className="timeline-date">2024</div>
                <div className="timeline-content glass-card">
                  <span className="timeline-role">UI/UX Designer (Internship)</span>
                  <span className="timeline-company">Digital Scrap Startup</span>
                  <p className="timeline-text text-sm">
                    Designed user flows, high-fidelity customer onboarding recycling screens, brand guidelines, auto-layout figma elements, and pitched deck slides to key stakeholders.
                  </p>
                  <div className="timeline-tags">
                    <span className="tag">Figma Design</span>
                    <span className="tag">Brand Guidelines</span>
                  </div>
                </div>
              </div>

              {/* Cisco Certification */}
              <div className="timeline-item reveal-fade">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Validated Credential</div>
                <div className="timeline-content glass-card">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <span className="timeline-role">Cisco Certified Network Associate (CCNA)</span>
                      <span className="timeline-company">Cisco Enterprise Academy</span>
                      <p className="timeline-text text-sm mt-2">
                        Validated expertise in logical IP addressing schemes, subnet mapping, secure boundary ACL firewalls, OSPF routing link states, and general LAN switching protocols.
                      </p>
                      <div className="timeline-tags">
                        <span className="tag">Networking</span>
                        <span className="tag">Security</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Certification */}
              <div className="timeline-item reveal-fade">
                <div className="timeline-dot"></div>
                <div className="timeline-date">Validated Credential</div>
                <div className="timeline-content glass-card">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <span className="timeline-role">Google UX Design Professional Certificate</span>
                      <span className="timeline-company">Google Career Certificates</span>
                      <p className="timeline-text text-sm mt-2">
                        End-to-end user research techniques, persona creation, wireframing, high-fidelity dynamic prototyping, custom mobile transitions, and responsive Web usability metrics.
                      </p>
                      <div className="timeline-tags">
                        <span className="tag">User Research</span>
                        <span className="tag">Figma UX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            7. CONTACT SECTION
            ══════════════════════════════════════ */}
        <section id="contact" className="contact-section z-10">
          <div className="container">
            <div className="contact-card glass-card reveal-fade">
              <div className="contact-grid">
                <div className="contact-info-block">
                  <div>
                    <div className="section-label">06 // Connect</div>
                    <h2 className="section-title">Ready to build together?</h2>
                    <p className="contact-desc">
                      Whether you are looking to hire a product designer, review custom network topologies, or discuss a software engineering opportunity — my inbox is always open.
                    </p>
                  </div>

                  <div className="contact-details">
                    <div className="contact-detail-item">
                      <div className="detail-icon"><Mail size={18} /></div>
                      <div>
                        <span>Email me</span>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=alishay945@gmail.com&su=Hello%20Alisha&body=Hi%20Alisha%2C%0A%0A"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="detail-link"
                        >
                          alishay945@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="contact-detail-item">
                      <div className="detail-icon"><MapPin size={18} /></div>
                      <div>
                        <span>Current Base</span>
                        <strong className="text-sm">Rawalpindi, Pakistan (Open to Hybrid / Remote)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="social-links">
                    <a href="https://www.linkedin.com/in/alisha-wasif-67a039238" target="_blank" rel="noopener noreferrer" className="social-icon" data-magnetic aria-label="LinkedIn">
                      <Award size={18} />
                    </a>
                    <a href="#" className="social-icon" data-magnetic aria-label="GitHub">
                      <Code2 size={18} />
                    </a>
                  </div>
                </div>

                 <div className="contact-form-block">
                  {formSubmitted ? (
                    <div className="glass-card p-8 flex flex-col items-center justify-center text-center rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-xl animate-fade-in py-12">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                        <Check size={32} />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 text-white">Message Sent Successfully!</h3>
                      <p className="text-sm text-secondary mb-8 leading-relaxed max-w-sm text-white/70">
                        Thank you! Your message has been prepared and opened in WhatsApp. Alisha will respond to you shortly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="btn btn-secondary btn-sm px-6"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleContactSubmit}
                      className="contact-form"
                    >
                      <div className="form-group">
                        <input type="text" id="form-name" required placeholder=" " className="form-input bg-transparent border-b text-sm" />
                        <label htmlFor="form-name" className="form-label">Your Name</label>
                        <span className="input-focus-line"></span>
                      </div>
                      <div className="form-group">
                        <input type="email" id="form-email" required placeholder=" " className="form-input bg-transparent border-b text-sm" />
                        <label htmlFor="form-email" className="form-label">Your Email</label>
                        <span className="input-focus-line"></span>
                      </div>
                      <div className="form-group">
                        <select id="form-inquiry" className="form-input custom-select bg-transparent border-b text-sm">
                          <option value="lead-role">Product Design Opportunity</option>
                          <option value="network-engineering">Network Engineering Role</option>
                          <option value="consulting">Contract / Consulting Collaboration</option>
                          <option value="hello">Just Saying Hello!</option>
                        </select>
                        <label htmlFor="form-inquiry" className="form-label">What are we discussing?</label>
                        <span className="input-focus-line"></span>
                      </div>
                      <div className="form-group">
                        <textarea id="form-message" required placeholder=" " rows={3} className="form-input bg-transparent border-b text-sm"></textarea>
                        <label htmlFor="form-message" className="form-label">Your Message</label>
                        <span className="input-focus-line"></span>
                      </div>
                      <button type="submit" className="btn btn-primary w-full" data-magnetic>
                        Send Message <Send size={16} className="icon-right" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer z-10 relative">
        <div className="container footer-container">
          <p className="footer-copy">&copy; 2026 Alisha Wasif. Overhauled with premium vanilla aesthetics.</p>
          <div className="footer-meta">
            <span>Built with Next.js &amp; Tailwind CSS</span>
            <a href="#hero" className="back-to-top" data-magnetic aria-label="Scroll back to top">
              <ArrowUp size={16} />
            </a>
          </div>
        </div>
      </footer>

      {/* ── SELECTED CASE STUDY MODAL OVERLAY ── */}
      <div className={`case-study-overlay ${selectedCaseStudy ? "open" : ""}`}>
        <div className="modal-backdrop" onClick={() => setSelectedCaseStudy(null)}></div>
        <div className="modal-container glass-card">
          {selectedCaseStudy && (
            <>
              <button
                onClick={() => setSelectedCaseStudy(null)}
                className="modal-close-btn"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="modal-case-header">
                <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400">{selectedCaseStudy.category}</span>
                <h2 className="modal-case-title">{selectedCaseStudy.title}</h2>
              </div>

              <div className="modal-case-meta-grid">
                <div className="meta-column">
                  <span>Context</span>
                  <strong>{selectedCaseStudy.company}</strong>
                </div>
                <div className="meta-column">
                  <span>Role</span>
                  <strong>{selectedCaseStudy.role}</strong>
                </div>
                <div className="meta-column">
                  <span>Duration</span>
                  <strong>{selectedCaseStudy.duration}</strong>
                </div>
              </div>

              <div className="modal-case-body">
                <h4>Executive Summary</h4>
                <p>{selectedCaseStudy.summary}</p>

                {/* Metrics */}
                <div className="metrics-block-grid">
                  {selectedCaseStudy.metrics.map((m, idx) => (
                    <div key={idx} className="metric-item">
                      <span className="metric-num">{m.value}</span>
                      <span className="metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>

                <h4>Key Highlights</h4>
                <ul className="list-disc pl-5 space-y-2 mb-6">
                  {selectedCaseStudy.highlights.map((h, idx) => (
                    <li key={idx} className="text-sm">{h}</li>
                  ))}
                </ul>

                <h4>Development &amp; Engineering Process</h4>
                <div className="space-y-6">
                  {selectedCaseStudy.process.map((step, idx) => (
                    <div key={idx} className="process-highlight">
                      <h5>{step.title}</h5>
                      <p className="text-xs text-secondary mt-1">{step.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-white/5">
                  {selectedCaseStudy.figmaUrl && (
                    <a href={selectedCaseStudy.figmaUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      Figma Workspace
                    </a>
                  )}
                  {selectedCaseStudy.pptUrl && (
                    <a href={selectedCaseStudy.pptUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
                      Canva Deck Slides
                    </a>
                  )}
                  {selectedCaseStudy.liveUrl && (
                    <a href={selectedCaseStudy.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Visit Platform
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
