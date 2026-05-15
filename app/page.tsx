 "use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Brain, Zap, Globe2, MessageSquare, 
  BarChart3, FileText, Video, LayoutDashboard, 
  ChevronDown, Sparkles, MoveRight, CheckCircle2,
  LogIn, Clipboard
} from "lucide-react";
import styles from "./page.module.css";


const featureGroups = [
  {
    title: "Intelligence & Matching",
    items: [
      {
        title: "Automated LinkedIn & Resume Intelligence",
        text: "Verified profiles with instant credential validation and smart data extraction",
        icon: Search
      },
      {
        title: "Predictive Talent Insights",
        text: "Uncover hidden strengths and cultural fit indicators from candidate profiles",
        icon: Brain
      },
      {
        title: "Dual AI Matching Engine",
        text: "Precision candidate-to-role ranking and reverse job-to-talent alignment",
        icon: Zap
      }
    ]
  },
  {
    title: "Interviews & Coordination",
    items: [
      {
        title: "Global Interview Coordination",
        text: "Seamless scheduling and management across any timezone",
        icon: Globe2
      },
      {
        title: "Adaptive AI Interviews",
        text: "Dynamic conversations calibrated to candidate experience level",
        icon: MessageSquare
      },
      {
        title: "Performance Intelligence Reports",
        text: "Actionable analytics with data-driven hiring recommendations",
        icon: BarChart3
      }
    ]
  },
  {
    title: "Analytics & Workflows",
    items: [
      {
        title: "AI-Enhanced Transcripts",
        text: "Sentiment analysis, key moments, and intelligent conversation breakdowns",
        icon: FileText
      },
      {
        title: "Searchable Video Archives",
        text: "Downloadable recordings with instant retrieval of critical segments",
        icon: Video
      },
      {
        title: "Role-Optimized Dashboards",
        text: "Tailored interfaces for recruiters, hiring managers, and coordinators",
        icon: LayoutDashboard
      }
    ]
  }
];

const faqs = [
  { q: "Is my search data private and secure?", a: "Yes, we use enterprise-grade encryption to ensure your data is always protected." },
  { q: "Can we integrate SmartSeekers with my existing tools?", a: "SmartSeekers seamlessly integrates with modern ATS and HR tools through our enterprise API." },
  { q: "How many candidate profiles/resumes can I upload at a time?", a: "You can bulk upload up to 1,000 resumes at once. Our AI processes them in minutes." },
  { q: "Which file formats are supported for candidate profile/resume uploads?", a: "We support PDF, DOCX, and TXT formats for comprehensive parsing and extraction." },
  { q: "What languages does SmartSeekers support for interviews?", a: "Currently, we support English, Spanish, and French, with additional languages in beta." },
  { q: "Is there a limit on the number of interviews that can be conducted?", a: "It depends on your subscription tier, but enterprise accounts enjoy unlimited monthly interviews." },
];

const testimonials = [
  {
    quote: "Great interview experience! The AI interviewer was very professional and the questions were relevant.",
    initials: "SK",
    name: "Sharat Kariyannavar",
    role: "Data Engineer_old"
  },
  {
    quote: "The AI interviews are wonderful! The questions are quite comprehensive.",
    initials: "SK",
    name: "Sharat Kariyannavar",
    role: "XYZ"
  },
  {
    quote: "The AI interviews are wonderful! The questions are dynamic and not fixed.",
    initials: "SK",
    name: "Sharat Kariyannavar",
    role: "XYZ"
  },
  {
    quote: "AI interview application provides a structured and efficient way to evaluate candidates. The interface is clear, and the process makes it easy to review responses and assess communication skills. It helps streamline initial screening. Adding more role-specific questions and deeper evaluation insights could further improve the recruitment decision process.",
    initials: "SK",
    name: "Sharat Kariyannavar",
    role: "XYZ"
  },
  {
    quote: "As a recruiter, I found the AI interview application simple and effective for conducting initial candidate screenings. The process was smooth, and it helped quickly understand the candidate's communication and basic knowledge.",
    initials: "AR",
    name: "arjen robbon",
    role: "XYZ"
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className={styles.main}>
      {/* Header */}
      {/* <header className="fixed top-0 left-0 w-full z-50 border-b bg-white/90 backdrop-blur-sm min-h-[72px]"><div className="container mx-auto flex items-center justify-between py-3 max-w-[1600px]"><div className="flex items-center gap-2"><img alt="Logo" loading="lazy" width="150" height="48" decoding="async" data-nimg="1" className="w-[200px] h-12" style={{ color: "transparent" }} src="/logo.svg" /></div><nav className="hidden md:flex items-center gap-6"></nav><div className="flex gap-4"><a className="gap-4" href="/login"><button data-slot="button" className="justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none cursor-pointer [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 has-[&gt;svg]:px-3 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold shadow-sm hover:shadow-md"><span>Login</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in h-4 w-4" aria-hidden="true"><path d="m10 17 5-5-5-5"></path><path d="M15 12H3"></path><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path></svg></button></a><a className="gap-4" href="/new-employer"><button data-slot="button" className="justify-center whitespace-nowrap rounded-md transition-all disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none cursor-pointer [&amp;_svg:not([class*='size-'])]:size-4 shrink-0 [&amp;_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground hover:bg-primary/90 h-9 has-[&gt;svg]:px-3 inline-flex items-center gap-2 px-8 py-4 text-base font-semibold shadow-sm hover:shadow-md"><span>Register</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard h-4 w-4" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path></svg></button></a></div></div></header> */}


<header className="fixed top-0 left-0 w-full z-50 border-b bg-white/90 backdrop-blur-sm min-h-[72px]">
  <div className="container mx-auto flex items-center justify-between py-3 max-w-[1600px]">
    
    {/* Logo */}
    <div className="flex items-center gap-2">
      <Image
        alt="Logo"
        src="/logo.svg" // PNG is perfectly fine
        width={200}
        height={48}
        className="h-12 w-auto" // better than forcing width
        priority
      />
    </div>

    {/* Navigation */}
    <nav className="hidden md:flex items-center gap-6"></nav>

    {/* Buttons */}
    <div className="flex gap-4">
      
      {/* Login */}
      <Link href="/login">
        <button aria-label="Login" className="inline-flex items-center gap-2 px-5 py-2.5 text-[17px] font-bold rounded-lg bg-[#1f4a7c] text-white hover:bg-[#16365c] shadow-sm hover:shadow-md transition-colors cursor-pointer">
          <span>Login</span>
          <LogIn size={20} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </Link>

      {/* Register */}
      <Link href="/new-employer">
        <button aria-label="Register as new employer" className="inline-flex items-center gap-2 px-5 py-2.5 text-[17px] font-bold rounded-lg bg-[#1f4a7c] text-white hover:bg-[#16365c] shadow-sm hover:shadow-md transition-colors cursor-pointer">
          <span>Register</span>
          <Clipboard size={20} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </Link>

    </div>
  </div>
</header>

<main>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="relative border-l-[1px] border-[#466a96]/40 pl-8 md:pl-12 ml-2 md:ml-4 py-4">
            <motion.div variants={fadeUp} className="mb-8 relative flex items-center">
              <span className="absolute -left-8 md:-left-12 h-[1px] w-4 md:w-8 bg-[#466a96]"></span>
              <div className="text-[12px] md:text-[14px] font-bold uppercase tracking-[0.2em] text-[#8ea4be]">
                AI RECRUITMENT PLATFORM
              </div>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex flex-col gap-4 md:gap-5 mb-8">
              <h1 className="text-[40px] md:text-[60px] lg:text-[72px] font-extrabold leading-[1.05] tracking-tight text-white mb-1">
                Hire <span className="text-[#a5cdff]">Smarter &amp; Faster</span>
              </h1>
              <div className="text-[18px] md:text-[20px] font-bold uppercase tracking-[0.1em] text-[#8ea4be]">
                WITH
              </div>
              <h2 className="text-[48px] md:text-[80px] lg:text-[100px] font-extrabold leading-[0.9] tracking-tighter text-[#a5cdff]">
                SmartSeekers
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="mb-10">
              <p className="max-w-[700px] text-[16px] md:text-[20px] leading-[1.6] text-[#8ea4be] font-medium">
                AI-powered interview platform for recruiters to screen,
                evaluate, and hire the right candidates faster.
              </p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="flex gap-4">
              <button className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-[17px] font-bold transition-colors bg-[#a5cdff] hover:bg-[#7db5f5] text-[#0a192f] shadow-[0_0_20px_rgba(147,197,253,0.3)] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar-range h-5 w-5" aria-hidden="true">
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M16 2v4"></path><path d="M3 10h18"></path><path d="M8 2v4"></path><path d="M17 14h-6"></path><path d="M13 18H7"></path><path d="M7 14h.01"></path><path d="M17 18h.01"></path>
                </svg>
                Book a demo
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
        
      {/* Features Section */}
      <section id="features" className={styles.features}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Intelligent Hiring, End-End</h2>
          <p className={styles.sectionSubtitle}>Source, assess, and hire — powered by AI</p>
        </div>
        
        <div className={styles.featureGrid}>
          {featureGroups.map((group, groupIdx) => (
            <motion.article 
              key={groupIdx}
              className={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIdx * 0.1 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.largeIconBox}>
                  <Image 
                    src="/iconlogo.svg" 
                    alt="AI Brain Icon" 
                    width={100} 
                    height={100} 
                    className={styles.mainBrainImage}
                  />
                </div>
              </div>
              <div className={styles.cardBody}>
                {group.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={styles.featureItem}>
                    <div className={styles.itemIconCircle}>
                      <item.icon size={16} />
                    </div>
                    <div className={styles.itemText}>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>



      {/* Testimonials Section */}
      <section id="testimonials" className={styles.testimonialsSection}>
        <h2 className={styles.testimonialsTitle}>What Our Users Say</h2>
        
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <p className={styles.testimonialQuote}>
                {testimonial.quote}
              </p>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar}>
                  {testimonial.initials}
                </div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>{testimonial.name}</h4>
                  <p className={styles.authorRole}>{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className={styles.faqSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <p className={styles.sectionSubtitle}>Everything you need to know about Smart Seekers.</p>
        </div>
        
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              className={`${styles.faqItem} ${openFaq === idx ? styles.active : ''}`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <button 
                className={styles.faqHeader}
                onClick={() => toggleFaq(idx)}
              >
                {faq.q}
                <ChevronDown 
                  className={styles.faqIcon} 
                  size={20} 
                />
              </button>
              <AnimatePresence>
                {openFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={styles.faqContentWrapper}
                  >
                    <div className={styles.faqContent}>
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>
</main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <Sparkles className={styles.logoIcon} />
              Smart Seekers
            </Link>
            <p className={styles.footerDesc}>
              Transforming the way modern companies hire with adaptive AI technology and smart automation.
            </p>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Product</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="#features">Features</Link></li>
              <li><Link href="#pricing">Pricing</Link></li>
              <li><Link href="#integrations">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Resources</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="#blog">Blog</Link></li>
              <li><Link href="#docs">Documentation</Link></li>
              <li><Link href="#help">Help Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.footerTitle}>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="#privacy">Privacy Policy</Link></li>
              <li><Link href="#terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© {new Date().getFullYear()} Smart Seekers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}