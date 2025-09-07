import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mouse } from "lucide-react";

// A reusable component for the browser window mockup
const BrowserMockup = ({ rotation, position, delay, isVisible }) => (
  <div
    className="absolute w-[60%] h-[60%] rounded-lg bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-indigo-900/50 transition-all duration-700 ease-out"
    style={{
      transform: `rotateY(-35deg) rotateX(15deg) ${rotation}`,
      ...position,
      transitionDelay: delay,
      opacity: isVisible ? 1 : 0,
    }}
  >
    <div className="flex items-center h-8 px-3 bg-slate-800/80 rounded-t-lg">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
      </div>
    </div>
    <div className="p-4 text-center text-slate-500 text-sm">
      1400 x 900px
    </div>
  </div>
);

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxStyle, setParallaxStyle] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    const handleMouseMove = (event) => {
      const { clientX, clientY, currentTarget } = event;
      // Update CSS variables for the spotlight effect
      document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);

      // Update style for the parallax effect
      const { innerWidth, innerHeight } = window;
      const xOffset = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yOffset = (clientY / innerHeight - 0.5) * 2; // -1 to 1
      
      const rotateY = xOffset * 8; // Max rotation
      const rotateX = -yOffset * 8;

      setParallaxStyle({ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Helper function for staggered animation styles
  const getAnimationStyle = (delay) => ({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
  });

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white font-sans">
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 items-center w-full max-w-7xl px-8">
        {/* Left Side: Content */}
        <div className="text-center lg:text-left">
          <p
            className="text-sm font-bold tracking-widest text-indigo-400 uppercase"
            style={getAnimationStyle(200)}
          >
            Why stress when you can flex?
          </p>
          <h1
            className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100"
            style={getAnimationStyle(400)}
          >
            Stop Wasting Nights,
            Get Ready-to-Deploy Projects, reports & Tools
          </h1>
          <p
            className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg text-slate-400"
            style={getAnimationStyle(600)}
          >
            Skip the all-nighters.
Grab ready-to-use PPTs, projects & notes for pocket money.
Focus on vibes, not deadlines.
          </p>
          <div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            style={getAnimationStyle(800)}
          >
            <Button
              size="lg"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold h-12 px-6 rounded-full shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              className="bg-slate-900/50 hover:bg-slate-800/50 text-white font-bold h-12 px-6 rounded-full transition-transform hover:scale-105"
            >
              Deep Dive
            </Button>
          </div>
        </div>

        {/* Right Side: 3D Browser Mockups with Parallax */}
        <div 
          className="relative hidden lg:flex items-center justify-center h-[500px] [perspective:1000px] transition-transform duration-300 ease-out"
          style={parallaxStyle}
        >
          <BrowserMockup
            rotation="translateZ(-40px)"
            position={{ top: '20%', left: '15%' }}
            delay="600ms"
            isVisible={isVisible}
          />
          <BrowserMockup
            rotation="translateZ(-20px)"
            position={{ top: '25%', left: '20%' }}
            delay="400ms"
            isVisible={isVisible}
          />
          <BrowserMockup
            rotation="translateZ(0px)"
            position={{ top: '30%', left: '25%' }}
            delay="200ms"
            isVisible={isVisible}
          />
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center flex-col gap-2"
        style={getAnimationStyle(1200)}
      >
        <Mouse className="w-6 h-6 text-slate-400" />
        <div className="w-0.5 h-4 bg-slate-600 rounded-full" />
      </div>
    </div>
  );
};

export default Hero;
