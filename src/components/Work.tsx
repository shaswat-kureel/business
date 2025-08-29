import { useState, useEffect, useRef } from "react";

const Work = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transformY, setTransformY] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const workItems = [
    {
      color: "bg-teal-400",
      height: "h-64",
      width: "w-64"
    },
    {
      color: "bg-orange-400",
      height: "h-96",
      width: "w-64"
    },
    {
      color: "bg-pink-400",
      height: "h-64",
      width: "w-64"
    },
    {
      color: "bg-orange-500",
      height: "h-64",
      width: "w-64"
    },
    {
      color: "bg-white",
      height: "h-32",
      width: "w-64"
    },
    {
      color: "bg-green-600",
      height: "h-64",
      width: "w-64"
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

  // Auto-scroll functionality (upside down)
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setTransformY(prev => {
          // Calculate when to reset to beginning
          if (contentRef.current) {
            const contentHeight = contentRef.current.scrollHeight;
            const viewportHeight = window.innerHeight;
            const maxScroll = contentHeight - viewportHeight;
            
            // If we've scrolled past all content, reset to beginning
            if (Math.abs(prev) >= maxScroll) {
              return 0;
            }
          }
          
          // Move up by 2px each interval (upside down effect)
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
    <section ref={sectionRef} id="work" className="py-24 bg-black relative overflow-hidden">
      {/* Header Section */}
      <div className="container mx-auto px-4 relative z-20 mb-16">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Our Work
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Creative
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Explore our diverse collection of creative projects and innovative solutions.
          </p>
        </div>
      </div>

      {/* Auto-scroll Control */}
      <div className={`text-center mb-12 transition-all duration-1000 animate-delay-600 ${
        isVisible ? 'animate-fade-in-up' : 'animate-hidden'
      }`}>
        <button
          onClick={toggleAutoScroll}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-300 backdrop-blur-sm"
        >
          {isAutoScrolling ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause Auto-scroll
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Auto-scroll
            </>
          )}
        </button>
      </div>

      {/* Work Grid Container */}
      <div className="relative h-screen flex items-center justify-center">
        <div 
          ref={contentRef}
          className="grid grid-cols-3 gap-8 w-full max-w-4xl mx-auto"
          style={{ 
            transform: `translateY(${transformY}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {workItems.map((item, index) => (
            <div
              key={index}
              className={`${item.color} ${item.height} ${item.width} rounded-3xl shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl ${
                isVisible ? 'animate-fade-in-up' : 'animate-hidden'
              }`}
              style={{
                animationDelay: `${(index + 1) * 200}ms`
              }}
            >
              {/* Optional: Add hover overlay with project info */}
              <div className="w-full h-full rounded-3xl bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Project {index + 1}</h3>
                  <p className="text-sm opacity-90">Creative Design</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className={`text-center mt-20 transition-all duration-1000 animate-delay-1400 ${
        isVisible ? 'animate-fade-in-up' : 'animate-hidden'
      }`}>
        <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-orange-400 hover:from-teal-500 hover:to-orange-500 text-black font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <span>View All Projects</span>
          <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Work;
