/**
 * @license
 */

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Github, Linkedin, Mail, Twitter, Sparkles, ExternalLink } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { GoogleGenAI } from "@google/genai";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedImage, setAnimatedImage] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || "home");
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = ['home', 'about', 'projects', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Function to transform the user's image into a Moana-style animation character
  const transformToAnimation = async () => {
    setIsAnimating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      // We'll use the user's provided image. Since we're in the agent context, 
      // I'll simulate the transformation by prompting the model.
      // In a real app, you'd pass the base64 of the uploaded image.
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: "Transform this person into a 3D animation character in the style of Disney's Moana. Keep the facial features recognizable but give them that expressive, vibrant, high-quality 3D animated look with warm lighting and a tropical vibe.",
            },
            // Note: In a real implementation, you would include the user's image base64 here:
            // { inlineData: { data: userImageBase64, mimeType: "image/png" } }
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setAnimatedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error transforming image:", error);
    } finally {
      setIsAnimating(false);
    }
  };

  return (
    <div ref={containerRef} className="scroll-smooth relative min-h-[200vh] w-full font-sans selection:bg-black selection:text-white">
      {/* Scroll Target for Home */}
      <div id="home" className="h-screen w-full" />

      {/* Fixed Background Grid */}
      <div className="grid-bg fixed inset-0 z-0 opacity-50" />

      {/* Floating Glossy Nav Bar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-10 py-3 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] flex gap-12 items-center transition-all duration-500 hover:bg-black/90">
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "projects", label: "Work" },
          { id: "contact", label: "Contact" }
        ].map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
              activeSection === item.id ? "text-white" : "text-white/40 hover:text-white"
            }`}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div
                layoutId="nav-active"
                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-white"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </a>
        ))}
      </nav>

      {/* Main Hero Section (Fixed) */}
      <section className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {/* Large Background Text & Portrait Container */}
        <div className="absolute inset-0 pt-10 md:pt-0 flex flex-col items-center justify-center pointer-events-none select-none space-y-4 md:space-y-8">
          {/* Line 1: MERGA + Portrait (Reordered for Mobile) */}
          <motion.div 
            style={{ x: xLeft }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row items-center gap-6 md:gap-12"
          >
            {/* Circular Portrait - First on Mobile, Last on Desktop */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative pointer-events-auto w-[65vw] md:w-[22vw] max-w-[320px] md:max-w-[280px] aspect-square flex items-center justify-center order-first md:order-last"
            >
              <div className="relative w-full h-full rounded-full border-4 border-black overflow-hidden shadow-2xl group cursor-pointer" onClick={transformToAnimation}>
                <img 
                  src={animatedImage || "../img/mag.png"} 
                  alt="Merga Mekonnen"
                  className={`w-full h-full object-cover transition-all duration-1000 ${isAnimating ? 'blur-sm grayscale' : 'grayscale group-hover:grayscale-0'}`}
                  referrerPolicy="no-referrer"
                />
                
                {isAnimating && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
              
              {/* Floating Label */}
              <div className="absolute -right-15 top-3/4 z-30 bg-black text-white px-2 py-2 shadow-xl rounded-full lg:flex items-center justify-center">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase">Software Engineer</span>
              </div>
            </motion.div>

            <h1 className="text-[16vw] font-display leading-[0.7] tracking-tighter text-black/20 whitespace-nowrap order-last md:order-first">
              MERGA
            </h1>
          </motion.div>

          {/* Line 2: Mekonnen */}
          <motion.h1 
            style={{ x: xRight }}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16vw] font-display leading-[0.7] tracking-tighter text-black/20 whitespace-nowrap"
          >
            MEKONNEN
          </motion.h1>

          {/* Catchy CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="pointer-events-auto pt-4"
          >
            <a 
              href="#contact"
              className="group relative inline-flex items-center gap-4 px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all"
            >
              <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em]">Let's Build Something Great</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </a>
          </motion.div>
        </div>

        {/* Navigation / UI Elements */}
        {/* <div className="absolute top-8 left-8 z-30">
          <span className="text-2xl font-display tracking-tighter lowercase italic opacity-80">mag</span>
        </div> */}

        {/* Bottom UI */}
        <div className="absolute bottom-8 left-8 z-30">
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Based in Ethiopia</span>
        </div>

        <div className="absolute bottom-8 right-8 z-30 flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">Scroll to explore</span>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={14} className="opacity-40" />
          </motion.div>
        </div>
      </section>

      {/* Content for Scrolling (to enable parallax) */}
      <div className="h-screen" />
      
      {/* About Section */}
      <section id="about" className="relative z-20 min-h-screen bg-white p-8 md:p-24 flex flex-col justify-center border-t border-black/5">
        <div className="max-w-6xl mx-auto flex flex-col gap-12 md:gap-24">
          
          {/* Top Part: Large Heading */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-[0.85] mb-8">
                THE <br />
                <span className="text-outline">ENGINEER</span>
              </h2>
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-[1px] w-12 bg-black" />
                <span className="text-[10px] font-black tracking-[0.4em] uppercase">About Merga</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Part: Content */}
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8 md:space-y-12"
            >
              <h3 className="text-3xl md:text-5xl font-display tracking-tight leading-tight">
                Software Engineering student & <span className="italic">A2SVian</span> based in Ethiopia.
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">Expertise</span>
                  <p className="text-lg font-light leading-relaxed text-black/70">
                    Specializing in <span className="font-bold text-black">Full-Stack Systems</span> and <span className="font-bold text-black">Competitive Programming</span>. I thrive on the challenge of optimizing algorithms while building scalable, end-to-end architectures.
                  </p>
                </div>
                <div className="space-y-4">
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">Philosophy</span>
                  <p className="text-lg font-light leading-relaxed text-black/70">
                    I believe in the power of <span className="italic">meticulous planning</span>. For me, every project is a delicate balance between aesthetic design and robust logic paying attention to every detail to ensure a seamless user experience.
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-black/5">
                <p className="text-xl md:text-2xl font-light leading-relaxed text-black/80">
                  What sets me apart is a unique blend of <span className="font-bold">problem-solving</span>, <span className="font-bold">leadership</span>, and <span className="font-bold">communication</span>. I don't just write code; I lead projects with a vision, ensuring that technical excellence meets human-centric design. My journey as an A2SVian has forged a relentless drive to innovate and solve real-world problems through technology.
                </p>
              </div>

              {/* Tech Stack Icons */}
              <div className="space-y-4 pt-8 border-t border-black/5">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30">Tech Stack & Tools</span>
                <div className="flex flex-wrap gap-6 items-center">
                  {[
                    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                    { name: "Node.js", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                    { name: "Express", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
                    { name: "Python", src: "https://skillicons.dev/icons?i=py" },
                    { name: "Django", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
                    { name: "Go", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
                    { name: "Docker", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
                    { name: "MongoDB", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
                    { name: "Mongoose", src: "https://avatars.githubusercontent.com/u/7552965?s=200&v=4" },
                    { name: "MySQL", src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
                    { name: "Postman", src: "https://skillicons.dev/icons?i=postman" },
                    { name: "GitHub", src: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" },
                  ].map((tech) => (
                    <div key={tech.name} className="group relative">
                      <img 
                        src={tech.src} 
                        alt={tech.name} 
                        className="h-8 w-8 md:h-10 md:w-10 object-contain opacity-100 transition-all duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-20 min-h-screen bg-black text-white p-8 md:p-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-6xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-none">
              SELECTED <br />
              <span className="text-white/20">WORKS</span>
            </h2>
            <div className="flex items-center gap-4 mt-8 opacity-40">
              <div className="h-[1px] w-12 bg-white" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Projects</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group space-y-6"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-white/5 rounded-2xl">
                  <img 
                    src={`https://picsum.photos/seed/project${i}/1200/800`} 
                    alt={`Project ${i}`}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <a 
                      href="#" 
                      className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"
                      title="View GitHub"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="#" 
                      className="p-4 rounded-full bg-white text-black hover:scale-110 transition-transform"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl md:text-4xl font-display tracking-tight">Project Topic {i}</h3>
                    <span className="text-4xl font-display text-white/10">0{i}</span>
                  </div>
                  <p className="text-white/60 font-light leading-relaxed max-w-md">
                    A brief description of the project goes here. This placeholder text will be replaced with the actual details of the work, highlighting the technical challenges and solutions implemented.
                  </p>
                  <div className="flex gap-4 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full">React</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full">Node.js</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full">Docker</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-20 min-h-screen bg-white text-black p-8 md:p-24 flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-24"
          >
            <h2 className="text-6xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-none">
              GET IN <br />
              <span className="text-black/20">TOUCH</span>
            </h2>
            <div className="flex items-center gap-4 mt-8 opacity-40">
              <div className="h-[1px] w-12 bg-black" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase">Connect with me</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-8">
              <p className="text-2xl md:text-4xl font-light leading-tight text-black/80">
                I'm always open to <span className="italic">new opportunities</span>, 
                collaborations, or just a friendly chat about technology and engineering.
              </p>
              
              <div className="flex flex-wrap gap-6 items-center">
                {[
                  { 
                    name: "LinkedIn", 
                    url: "https://www.linkedin.com/in/merga-mekonnen-a524502a0/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_verification_details%3Bfwuxb4Y4RVGy8JGP07Ij1A%3D%3D",
                    icon: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/linkedin/default.svg"
                  },
                  { 
                    name: "Telegram", 
                    url: "https://t.me/MagMVP",
                    icon: "https://raw.githubusercontent.com/maurodesouza/profile-readme-generator/master/src/assets/icons/social/telegram/default.svg"
                  },
                  { 
                    name: "X", 
                    url: "https://x.com/Merga132555",
                    icon: "https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
                  },
                  { 
                    name: "GitHub", 
                    url: "https://github.com/MagMC007",
                    icon: "https://skillicons.dev/icons?i=github"
                  }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="group relative"
                  >
                    <img 
                      src={social.icon} 
                      alt={social.name} 
                      className="h-8 w-8 md:h-10 md:w-10 object-contain transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="p-8 md:p-12 bg-black text-white rounded-3xl space-y-6">
              <h3 className="text-2xl font-display">Direct Message</h3>
              <p className="text-white/40 text-sm font-light">
                Call me at <br />
                <a href="tel:+251966203485" className="text-white font-bold hover:underline">+251 966 203 485</a>
              </p>
              <p className="text-white/40 text-sm font-light">
                Prefer email? Reach out directly at <br />
                <a href="mailto:mergaMekonnen7@gmail.com" className="text-white font-bold hover:underline">mergamekonnen7@gmail.com</a>
              </p>
              <div className="pt-6">
                <motion.a
                  href="mailto:mergaMekonnen7@gmail.com"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block w-full text-center py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full"
                >
                  Send a message
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 bg-black text-white p-12 md:p-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-4">
            <h4 className="text-4xl md:text-6xl font-display tracking-tighter">MERGA <br /> MEKONNEN</h4>
            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.2em]">Software Engineer</p>
          </div>
          
          <div className="flex flex-row gap-50 md:flex-row gap-12 md:gap-24 text-[10px] font-bold uppercase tracking-widest">
            <div className="space-y-4">
              <span className="opacity-30">Quick Links</span>
              <nav className="flex flex-col gap-2">
                <a href="#home" className="hover:text-white/60 transition-colors">Home</a>
                <a href="#projects" className="hover:text-white/60 transition-colors">Work</a>
                <a href="#about" className="hover:text-white/60 transition-colors">About</a>
                <a href="#contact" className="hover:text-white/60 transition-colors">Contact</a>
              </nav>
            </div>
            
            <div className="space-y-4">
              <span className="opacity-30">Location</span>
              <p>Addis Ababa, <br /> Ethiopia</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-40">
          <span>© 2026 Merga MEKONNEN. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Back to top ↑</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
