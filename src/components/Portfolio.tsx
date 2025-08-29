import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play, ArrowRight, ExternalLink } from "lucide-react";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [transformY, setTransformY] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const portfolioItems = [
    {
      id: 1,
      title: "Frontend Design",
      category: "UI/UX",
      description: "Modern web interfaces with cutting-edge design principles and responsive layouts",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=800&fit=crop",
      height: "h-80",
      featured: true,
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: 2,
      title: "Full-Stack App",
      category: "Development",
      description: "Complete web applications with frontend and backend integration",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop",
      height: "h-64",
      featured: false,
      tags: ["Next.js", "Node.js", "MongoDB"]
    },
    {
      id: 3,
      title: "Mobile App",
      category: "Mobile",
      description: "Cross-platform mobile applications for iOS and Android",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=900&fit=crop",
      height: "h-96",
      featured: false,
      tags: ["React Native", "Firebase", "Redux"]
    },
    {
      id: 4,
      title: "E-commerce Platform",
      category: "Web App",
      description: "Online shopping platforms with payment integration and inventory management",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=700&fit=crop",
      height: "h-72",
      featured: false,
      tags: ["Vue.js", "Stripe", "PostgreSQL"]
    },
    {
      id: 5,
      title: "Analytics Dashboard",
      category: "Analytics",
      description: "Data visualization and business intelligence tools for insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=500&fit=crop",
      height: "h-56",
      featured: false,
      tags: ["D3.js", "Python", "AWS"]
    },
    {
      id: 6,
      title: "AI Platform",
      category: "Machine Learning",
      description: "Intelligent systems powered by artificial intelligence and machine learning",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=850&fit=crop",
      height: "h-88",
      featured: false,
      tags: ["TensorFlow", "Python", "Docker"]
    },
    {
      id: 7,
      title: "Social Media App",
      category: "Social",
      description: "Real-time social networking platform with chat and media sharing",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=750&fit=crop",
      height: "h-76",
      featured: false,
      tags: ["Socket.io", "Redis", "Express"]
    },
    {
      id: 8,
      title: "Task Management",
      category: "Productivity",
      description: "Collaborative task management with real-time updates and team collaboration",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=650&fit=crop",
      height: "h-68",
      featured: false,
      tags: ["Vue.js", "Firebase", "Vuex"]
    },
    {
      id: 9,
      title: "Content Generator",
      category: "AI Tools",
      description: "Content creation tool powered by OpenAI with template system",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=720&fit=crop",
      height: "h-84",
      featured: false,
      tags: ["OpenAI API", "React", "Supabase"]
    }
  ];

  // Duplicate items for seamless looping
  const loopItems = [...portfolioItems, ...portfolioItems];

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

    const element = document.getElementById('portfolio');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Vertical auto-scroll functionality (seamless)
  useEffect(() => {
    if (isAutoScrolling) {
      autoScrollRef.current = setInterval(() => {
        setTransformY(prev => {
          if (containerRef.current && contentRef.current) {
            const containerHeight = containerRef.current.clientHeight;
            const contentHeight = contentRef.current.scrollHeight; // doubled content
            const loopHeight = Math.max(0, contentHeight / 2 - containerHeight);
            if (Math.abs(prev) >= loopHeight) {
              // Reset instantly without transition for seamless loop
              return 0;
            }
          }
          return prev - 1.5; // speed
        });
      }, 16);
    }

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => setIsAutoScrolling(prev => !prev);

  return (
    <section id="portfolio" className="py-24 bg-black relative overflow-hidden">
      {/* Header Section */}
      <div className="container mx-auto px-4 relative z-20 mb-16">
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            My Portfolio
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Creative
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Witness the beauty of code through my lens, as I showcase stunning projects that evoke wonder and appreciation for technology.
          </p>
        </div>
      </div>

      {/* Auto-scroll Control */}
      <div className={`text-center mb-6 md:mb-8 transition-all duration-1000 ${
        isVisible ? 'animate-fade-in-up' : 'animate-hidden'
      }`}>
        <button
          onClick={toggleAutoScroll}
          className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white hover:text-white transition-all duration-300 backdrop-blur-sm"
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

      {/* Pinterest Style Masonry Grid - Fitted in Rectangle */}
      <div className="container mx-auto px-4">
        <div ref={containerRef} className="relative h-[800px] overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/20 backdrop-blur-sm">
          {/* Gradient Mask for Bottom Cut */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-10" />
          
          {/* Auto-Scrolling Content Container */}
          <div className="h-full overflow-hidden">
            <div
              ref={contentRef}
              className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 p-6"
              style={{ transform: `translateY(${transformY}px)` }}
            >
              {loopItems.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className={`break-inside-avoid mb-6 group cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 ${
                    isVisible ? 'animate-fade-in-up' : 'animate-hidden'
                  }`}
                  style={{
                    animationDelay: `${(index % portfolioItems.length + 1) * 100}ms`
                  }}
                >
                  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500">
                    {/* Image Container */}
                    <div className={`relative ${item.height} overflow-hidden`}>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Featured Badge */}
                      {item.featured && (
                        <div className="absolute top-4 left-4">
                          <div className="px-3 py-1 bg-gradient-to-r from-teal-400 to-blue-400 text-black text-xs font-bold rounded-full">
                            Featured
                          </div>
                        </div>
                      )}
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/30">
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-300 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex items-center justify-between">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-teal-400 hover:text-teal-300 hover:bg-teal-400/10 p-0 h-auto font-medium"
                        >
                          View Project
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                        
                        {item.featured && (
                          <ExternalLink className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <div className={`text-center mt-20 transition-all duration-1000 animate-delay-1400 ${
        isVisible ? 'animate-fade-in-up' : 'animate-hidden'
      }`}>
        <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-orange-400 hover:from-teal-500 hover:to-orange-500 text-black font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
          <span>View All Projects</span>
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
