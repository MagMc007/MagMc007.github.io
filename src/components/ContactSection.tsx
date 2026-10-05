import { motion } from "motion/react";
import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import contactData from "../data/contact.json";

export default function ContactSection() {
  const { header, headline, socialsSection, directMessage } = contactData;
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (directMessage.formspreeEndpoint.includes("mwlveynb")) {
      const mailtoUrl = `mailto:${directMessage.email}?subject=${encodeURIComponent(
        `Portfolio Message from ${formData.name || "Colleague"}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus("success");
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(directMessage.formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      const mailtoUrl = `mailto:${directMessage.email}?subject=${encodeURIComponent(
        `Portfolio Message from ${formData.name}`
      )}&body=${encodeURIComponent(formData.message)}`;
      window.location.href = mailtoUrl;
      setStatus("success");
    }
  };

  return (
    <section
      id="contact"
      aria-label={header.badge}
      className="relative z-20 min-h-screen bg-white text-black p-6 sm:p-12 md:p-24 flex flex-col justify-center border-t border-black/5"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-6xl sm:text-7xl md:text-9xl pt-10 md:pt-0 font-display tracking-tighter leading-none">
            {header.titleLine1} <br />
            <span className="text-black/20">{header.titleLine2}</span>
          </h2>
          <div className="flex items-center gap-4 mt-8 opacity-40">
            <div className="h-[1px] w-12 bg-black" />
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">
              {header.badge}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Left Column: Direct Links & Networks */}
          <div className="space-y-8">
            <p className="text-2xl md:text-4xl font-light leading-tight text-black/80">
              {headline.prefix}
              {headline.highlight && <span className="italic">{headline.highlight}</span>}
              {headline.suffix}
            </p>

            {/* Professional Networks */}
            <div className="space-y-4 pt-4 border-t border-black/10">
              <span className="text-[10px] font-black tracking-[0.25em] uppercase opacity-40 block">
                {socialsSection.title}
              </span>

              <div className="flex flex-wrap gap-5 items-center">
                {socialsSection.socials.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -4 }}
                    className="group relative focus-visible:outline-black p-1"
                  >
                    <img
                      src={social.icon}
                      alt={social.name}
                      className="h-8 w-8 md:h-10 md:w-10 object-contain transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black text-white px-2 py-0.5 rounded shadow pointer-events-none">
                      {social.name}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Box */}
          <div className="p-8 md:p-12 bg-black text-white rounded-3xl space-y-6 shadow-2xl">
            <h3 className="text-2xl font-display">{directMessage.title}</h3>

            <div className="space-y-4">
              <p className="text-white/40 text-sm font-light">
                {directMessage.phoneLabel} <br />
                <a
                  href={`tel:${directMessage.phone.replace(/\s+/g, "")}`}
                  className="text-white font-bold hover:underline"
                >
                  {directMessage.phone}
                </a>
              </p>
              <p className="text-white/40 text-sm font-light">
                {directMessage.emailLabel} <br />
                <a
                  href={`mailto:${directMessage.email}`}
                  className="text-white font-bold hover:underline"
                >
                  {directMessage.email}
                </a>
              </p>
            </div>

            {status === "success" ? (
              <div className="py-6 text-center space-y-2 bg-white/10 rounded-2xl border border-white/10 p-4">
                <CheckCircle2 size={32} className="text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold">{directMessage.form.successTitle}</h4>
                <p className="text-xs text-white/70">
                  {directMessage.form.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-3 px-4 py-1.5 rounded-full bg-white text-black font-black uppercase text-[9px] tracking-widest"
                >
                  {directMessage.form.sendAnotherButton}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <input
                  type="text"
                  required
                  placeholder={directMessage.form.namePlaceholder}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder={directMessage.form.emailPlaceholder}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors"
                />
                <textarea
                  required
                  rows={3}
                  placeholder={directMessage.form.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-xs focus:outline-none focus:border-white transition-colors resize-none"
                />

                <div className="pt-2">
                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full hover:bg-neutral-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>
                      {status === "submitting"
                        ? directMessage.form.submittingButton
                        : directMessage.form.submitButton}
                    </span>
                    <Send size={12} />
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
