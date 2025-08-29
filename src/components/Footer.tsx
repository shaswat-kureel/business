import { useState } from "react";
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setSubmitStatus("error");
      setSubmitMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Insert email into subscriber table
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: email,
            status: 'active',
            subscribed_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Success
      setSubmitStatus("success");
      setSubmitMessage("Thank you for subscribing! You'll receive updates soon.");
      setEmail("");

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);

    } catch (error) {
      console.error('Error subscribing:', error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error subscribing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-black to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_50%)]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-20">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="text-2xl font-bold text-white mb-6">
              fund❤menta{'>'}
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-md">
              Blurring the line between art and technology. Creating digital experiences that inspire, engage, and deliver results.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-110">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-110">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-110">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-110">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Quick Links</h3>
            <div className="space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">Services</h3>
            <div className="space-y-3">
              <a href="#" className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                Frontend Development
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                Backend Architecture
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                AI Integration
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                Mobile Apps
              </a>
              <a href="#" className="block text-slate-300 hover:text-white transition-colors duration-300 hover:translate-x-1">
                UI/UX Design
              </a>
            </div>
          </div>
        </div>

        {/* Subscribe Section */}
        <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Updated</h3>
            <p className="text-slate-300 mb-6 max-w-md mx-auto">
              Get the latest insights on web development, design trends, and tech innovations delivered to your inbox.
            </p>
            
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg mb-6 max-w-md mx-auto">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-medium text-sm">{submitMessage}</span>
              </div>
            )}
            
            {submitStatus === "error" && (
              <div className="flex items-center justify-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg mb-6 max-w-md mx-auto">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-medium text-sm">{submitMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-teal-400 focus:outline-none transition-colors duration-300"
                required
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline mr-2"></div>
                    Subscribing...
                  </>
                ) : (
                  'Subscribe'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 pt-8 border-t border-slate-700/50">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-slate-400 text-sm">
              © 2024 Shaswat Kureel. Made with <Heart className="inline w-4 h-4 text-red-400" /> in India.
            </p>
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;