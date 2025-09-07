import { Card, CardContent } from "@/components/ui/card";
import { Code, Smartphone, Bot, Database, Globe, Zap, ArrowRight, Pause, Play } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transformX, setTransformX] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Frontend Magic",
      description: "Clean & responsive apps with React, Next.js, and Flutterflow — pixel-perfect every time.",
      gradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      icon: <Database className="w-10 h-10" />,
      title: "Full-Stack Power",
      description: "Supabase + Next.js + Kotlin = fast, scalable apps that just work (no more broken backends).",
      gradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-600/20 to-teal-600/20"
    },
    {
      icon: <Globe className="w-10 h-10" />,
      title: "Automation & Workflows",
      description: "Save hours with n8n flows, custom bots, and integrations that run on autopilot.",
      gradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-600/20 to-pink-600/20"
    },
    {
      icon: <Bot className="w-10 h-10" />,
      title: "AI-Powered Everything",
      description: "We plug in the best AI tools (GPTs, Midjourney, custom models) into apps, projects, or student tools.",
      gradient: "from-orange-600 to-red-600",
      bgGradient: "from-orange-600/20 to-red-600/20"
    },
    {
      icon: <Smartphone className="w-10 h-10" />,
      title: "Student Shortcuts",
      description: "Custom PPTs, reports, and project packs — ready in minutes, not all-nighters.",
      gradient: "from-indigo-600 to-blue-600",
      bgGradient: "from-indigo-600/20 to-blue-600/20"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Speed & Optimization",
      description: "Lightning-fast apps & SEO tweaks that load in milliseconds (Google loves it too).",
      gradient: "from-yellow-600 to-orange-600",
      bgGradient: "from-yellow-600/20 to-orange-600/20"
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Cloud & Deploy",
      description: "Deploy and scale apps on modern cloud — hassle-free, smooth, future-ready.",
      gradient: "from-green-600 to-emerald-600",
      bgGradient: "from-green-600/20 to-emerald-600/20"
    }
    
    
  ];

  // Section visibility for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setTransformX(prev => {
          // Calculate when to reset to beginning
          if (contentRef.current) {
            const contentWidth = contentRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;
            const maxScroll = contentWidth - viewportWidth;
            
            // If we've scrolled past all content, reset to beginning
            if (Math.abs(prev) >= maxScroll) {
              return 0;
            }
          }
          
          // Move left by 2px each interval
          return prev - 2;
        });
      }, 50); // Update every 50ms for smooth movement
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  return (
    <section ref={sectionRef} id="services" className="py-12 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600/20 text-emerald-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
            Our Expertise
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-emerald-100 to-white bg-clip-text text-transparent">
              Studio
            </span>{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
          Got a project or assignment? I take it from messy idea to ready-to-submit in no time
          </p>
        </div>

        {/* Auto-scroll Control */}
        <div className={`text-center mb-8 transition-all duration-1000 animate-delay-600 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <button
            onClick={toggleAutoScroll}
            className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/80 hover:bg-slate-700/90 text-white/80 hover:text-white transition-all duration-300 backdrop-blur-sm"
          >
            {isAutoScrolling ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Auto-scroll
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start Auto-scroll
              </>
            )}
          </button>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative h-96 flex items-center">
          <div 
            ref={contentRef}
            className="flex gap-6 py-8 px-4 w-full flex-nowrap"
            style={{ 
              transform: `translateX(${transformX}px)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-80 snap-start transition-all duration-1000 animate-delay-${(index + 1) * 200} ${
                  isVisible ? 'animate-fade-in-up' : 'animate-hidden'
                }`}
              >
                <Card className="group h-full bg-gradient-to-br from-black/60 to-slate-900/40 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 overflow-hidden relative rounded-xl">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`}></div>
                  
                  {/* Animated Border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-xl`}></div>
                  
                  <CardContent className="p-8 text-center relative z-10 h-full flex flex-col items-center">
                    {/* Icon Container */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-emerald-300 transition-colors duration-300">
                      {service.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/80 leading-relaxed mb-6 text-base flex-grow">
                      {service.description}
                    </p>

                    {/* Learn More Button */}
                    <div className="flex items-center justify-center text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 mt-auto">
                      <span className="text-sm font-medium mr-2">Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className={`text-center mt-12 transition-all duration-1000 animate-delay-1400 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div 
            onClick={() => {
              const popup = document.createElement('div');
              popup.className = 'fixed bottom-8 right-8 bg-black/80 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl z-50 transition-all duration-300 ease-out';
              popup.innerHTML = `
                <div class="text-center">
                  <div class="text-5xl mb-4 text-center">🚀</div>
                  <h3 class="text-2xl font-bold mb-2 text-indigo-300 tracking-tight">Coming Soon, Fam!</h3>
                  <p class="text-sm mb-4 text-slate-400">We're leveling up our services. Stay tuned for epic updates!</p>
                  <div class="flex justify-center space-x-2">
                    <button onclick="this.parentElement.parentElement.remove()" class="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors">Cool, Got It</button>
                  </div>
                </div>
              `;
              document.body.appendChild(popup);
              setTimeout(() => popup.remove(), 5000);
            }}
            className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
          >
            <span>Explore All Services</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
