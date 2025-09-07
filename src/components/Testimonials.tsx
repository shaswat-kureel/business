import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote, ArrowRight } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Aruhi Sukla",
      role: "Startup Founder",
      company: "Secret Society",
      image: "https://images.unsplash.com/photo-1494790108755-2616b86bfa5c?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Shaswat delivered an exceptional e-commerce platform that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
      project: "E-commerce Platform",
      timeline: "3 months",
      impact: "300% increase in sales",
      category: "E-commerce",
      technologies: ["React", "Node.js", "PostgreSQL"]
    },
    {
      name: "Aryan Singh",
      role: "Product Manager",
      company: "Secret Society",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Working with Shaswat was a game-changer for our project. He transformed our ideas into a beautiful, functional web application in record time.",
      project: "Web Application",
      timeline: "2 months",
      impact: "50% faster development",
      category: "Web Development",
      technologies: ["Next.js", "TypeScript", "Tailwind"]
    },
    {
      name: "Priya Sharma",
      role: "Marketing Director",
      company: "Secret Society",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The AI integration Shaswat implemented boosted our productivity by 300%. His technical skills and communication are top-notch.",
      project: "AI Integration",
      timeline: "1 month",
      impact: "300% productivity boost",
      category: "AI/ML",
      technologies: ["Python", "TensorFlow", "FastAPI"]
    },
    {
      name: "Rahul Verma",
      role: "CTO",
      company: "TechCorp",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Shaswat's expertise in full-stack development helped us build a scalable platform that handles millions of users seamlessly.",
      project: "Scalable Platform",
      timeline: "6 months",
      impact: "10M+ users supported",
      category: "Full-Stack",
      technologies: ["React", "Node.js", "MongoDB", "Redis"]
    },
    {
      name: "Anjali Patel",
      role: "Design Lead",
      company: "Creative Studio",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "The UI/UX design Shaswat created for our mobile app is absolutely stunning. Users love the intuitive interface and smooth animations.",
      project: "Mobile App Design",
      timeline: "2 months",
      impact: "95% user satisfaction",
      category: "UI/UX",
      technologies: ["Figma", "React Native", "Framer Motion"]
    },
    {
      name: "Vikram Malhotra",
      role: "Operations Manager",
      company: "LogiTech",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Shaswat's backend architecture is rock-solid. Our system has been running flawlessly for over a year with zero downtime.",
      project: "Backend System",
      timeline: "4 months",
      impact: "99.9% uptime achieved",
      category: "Backend",
      technologies: ["Python", "Django", "PostgreSQL", "Docker"]
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

    const element = testimonialsRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Create duplicated testimonials for infinite scroll effect
  const scrollTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" ref={testimonialsRef} className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">
        {/* Enhanced Header Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-white/10 to-white/5 text-white text-sm font-medium mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full mr-3 animate-pulse"></span>
            Client Success Stories
            <span className="ml-3 px-2 py-1 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full text-xs">
              {testimonials.length}+ Projects
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Trusted by
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Innovators
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Real results from real clients. Discover how I've helped businesses transform their digital presence and achieve remarkable growth through innovative solutions.
          </p>
        </div>

        {/* Auto-Scrolling Testimonials Section */}
        <div className={`transition-all duration-1000 animate-delay-200 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Success Stories</h3>
            <p className="text-white/60">Scroll through our collection of client testimonials</p>
          </div>
          
          {/* Infinite Scroll Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex gap-8 animate-scroll"
              style={{
                animation: 'scroll 40s linear infinite',
                width: 'max-content'
              }}
            >
              {scrollTestimonials.map((testimonial, index) => (
                <Card 
                  key={index} 
                  className="bg-slate-800/30 backdrop-blur-sm hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 hover:-translate-y-2 group cursor-pointer min-w-[380px] max-w-[380px]"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardContent className="p-6 h-full flex flex-col relative">
                    {/* Hover Effect Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-teal-400/5 to-blue-400/5 rounded-lg transition-opacity duration-300 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 text-slate-600/50 group-hover:text-teal-400 transition-colors duration-300">
                      <Quote className="w-6 h-6" />
                    </div>

                    {/* Category Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-teal-400/20 to-blue-400/20 text-teal-300 text-xs font-medium mb-4 self-start">
                      {testimonial.category}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    {/* Testimonial Text */}
                    <blockquote className="text-white/90 mb-4 leading-relaxed flex-grow text-sm">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Project Details */}
                    <div className="bg-slate-700/30 rounded-lg p-3 mb-4">
                      <div className="grid grid-cols-3 gap-3 text-center text-xs">
                        <div>
                          <div className="text-slate-400 mb-1">Project</div>
                          <div className="text-white font-medium text-sm">{testimonial.project}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 mb-1">Timeline</div>
                          <div className="text-white font-medium text-sm">{testimonial.timeline}</div>
                        </div>
                        <div>
                          <div className="text-slate-400 mb-1">Impact</div>
                          <div className="text-white font-medium text-sm">{testimonial.impact}</div>
                        </div>
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="mb-4">
                      <div className="text-slate-400 mb-2 text-xs font-medium">Technologies</div>
                      <div className="flex flex-wrap gap-1">
                        {testimonial.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className={`px-2 py-1 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full text-teal-300 text-xs`}>
                            {tech}
                          </span>
                        ))}
                        {testimonial.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-slate-600/50 rounded-full text-slate-300 text-xs">
                            +{testimonial.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Client Info */}
                    <div className="flex items-center mt-auto">
                      <Avatar className="mr-3 ring-2 ring-slate-600/50 group-hover:ring-teal-400/50 transition-all duration-300 w-10 h-10">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-slate-700 text-white text-sm">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                        <div className="text-slate-300 text-xs">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Bottom CTA Section */}
        <div className={`text-center mt-20 transition-all duration-1000 animate-delay-400 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
            <span>Join Our Success Stories</span>
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </div>
          <p className="text-white/60 mt-4 text-sm">
            Ready to transform your business? Let's create something amazing together.
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
        
        .animate-hidden {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .animate-delay-200 {
          animation-delay: 200ms;
        }
        
        .animate-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
