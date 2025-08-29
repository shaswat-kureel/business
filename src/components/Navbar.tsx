import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Linkedin, Twitter, Mail } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import logoImage from "@/assets/image.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Projects" },
    { href: "/shop", label: "Shop" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-6xl z-50">
      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-xl font-bold text-white">
              <img src={logoImage} alt="Logo" className="h-8 w-auto" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-all duration-300 font-medium relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </a>
                )
              ))}
            </div>

            {/* Social Media Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white/80 hover:text-white transition-colors duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2 border-t border-white/10">
              {navLinks.map((link) => (
                link.href.startsWith('/') ? (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block py-3 px-4 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="flex space-x-4 pt-4 px-4">
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-all duration-300 hover:scale-110">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BookingForm 
        isOpen={isBookingOpen}
        onOpenChange={setIsBookingOpen}
        defaultProjectType="consultation"
      />
    </nav>
  );
};

export default Navbar;