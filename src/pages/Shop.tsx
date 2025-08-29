import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Code, Palette, ShoppingCart, Zap, Globe, Store, ArrowLeft, Eye, Download, Clock, Sparkles, ArrowRight, ExternalLink, Search, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderForm from "@/components/OrderForm";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    const element = document.getElementById('shop');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Returns a prioritized list of potential local asset paths for a product id
  const getLocalImageCandidates = (id: number) => [
    `/${id}.webp`,
    `/${id}.png`,
    `/${id}.jpg`,
  ];

  // Cycles through candidate sources and finally falls back to the remote image
  const onProductImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
    id: number,
    remoteFallback: string
  ) => {
    const img = e.currentTarget;
    const attemptAttr = img.getAttribute("data-attempt") || "0";
    const attempt = Number(attemptAttr);
    const candidates = getLocalImageCandidates(id);
    if (attempt < candidates.length) {
      img.src = candidates[attempt];
      img.setAttribute("data-attempt", String(attempt + 1));
    } else if (img.src !== remoteFallback) {
      img.src = remoteFallback;
      img.setAttribute("data-attempt", String(attempt + 1));
    }
  };

  const products = [
    {
      id: 1,
      name: "Portfolio Template Pro",
      description: "A stunning, fully responsive portfolio template built with modern web technologies. Perfect for developers, designers, and creative professionals.",
      price: "$49",
      rating: 4.9,
      reviews: 127,
      deliveryTime: "3-4 days",
      previewUrl: "#",
      features: ["Responsive Design", "Dark/Light Theme", "SEO Optimized", "Fast Loading", "Easy Customization"],
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      category: "Portfolio",
      featured: true
    },
    {
      id: 2,
      name: "E-commerce Starter Kit",
      description: "Complete e-commerce solution with product management, cart functionality, and payment integration. Ready to launch your online store.",
      price: "$89",
      rating: 4.8,
      reviews: 89,
      deliveryTime: "5-7 days",
      previewUrl: "#",
      features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Admin Dashboard", "Inventory Management"],
      technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      category: "E-commerce",
      featured: false
    },
    {
      id: 3,
      name: "AI Chat Application",
      description: "Modern chat application with AI integration, real-time messaging, and intelligent responses. Perfect for customer support or team collaboration.",
      price: "$129",
      rating: 4.9,
      reviews: 156,
      deliveryTime: "7-10 days",
      previewUrl: "#",
      features: ["AI Chatbot", "Real-time Messaging", "File Sharing", "User Management", "Analytics Dashboard"],
      technologies: ["Vue.js", "OpenAI API", "Socket.io", "MongoDB"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      category: "AI Tools",
      featured: true
    },
    {
      id: 4,
      name: "Task Management System",
      description: "Comprehensive project management tool with task tracking, team collaboration, and progress monitoring. Boost your team's productivity.",
      price: "$69",
      rating: 4.7,
      reviews: 94,
      deliveryTime: "4-6 days",
      previewUrl: "#",
      features: ["Task Management", "Team Collaboration", "Progress Tracking", "Time Logging", "Reporting"],
      technologies: ["React", "Node.js", "Express", "MySQL"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
      category: "Productivity",
      featured: false
    },
    {
      id: 5,
      name: "Social Media Dashboard",
      description: "Powerful dashboard for managing multiple social media accounts, scheduling posts, and analyzing performance metrics.",
      price: "$79",
      rating: 4.6,
      reviews: 67,
      deliveryTime: "6-8 days",
      previewUrl: "#",
      features: ["Multi-platform Support", "Post Scheduling", "Analytics", "Content Calendar", "Team Management"],
      technologies: ["Angular", "Firebase", "Social APIs", "Chart.js"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      category: "Social Media",
      featured: false
    },
    {
      id: 6,
      name: "Restaurant Ordering System",
      description: "Complete restaurant management solution with online ordering, table reservations, and kitchen management. Streamline your restaurant operations.",
      price: "$149",
      rating: 4.9,
      reviews: 203,
      deliveryTime: "8-12 days",
      previewUrl: "#",
      features: ["Online Ordering", "Table Reservations", "Kitchen Management", "Payment Processing", "Customer Reviews"],
      technologies: ["React Native", "Laravel", "MySQL", "Stripe"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      category: "Restaurant",
      featured: true
    }
  ];

  const handleOrderNow = (product: any) => {
    setSelectedProduct(product);
    setShowOrderForm(true);
  };

  return (
    <div id="shop" className="min-h-screen bg-black">
      <Navbar />
      
      {/* Back to Home Button */}
      <div className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link to="/">
            <Button variant="ghost" className="mb-4 text-white hover:text-teal-400 hover:bg-slate-800/50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="pb-16 pt-8 bg-gradient-to-br from-slate-900 via-black to-slate-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          <div className="absolute top-20 left-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'animate-fade-in-up' : 'animate-hidden'
          }`}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <ShoppingCart className="w-4 h-4 mr-2 text-teal-400" />
              Pre-built Templates
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Ready-to-Launch
              </span>{" "}
              <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-12 leading-relaxed">
              Skip the development time with our professionally crafted templates. 
              Get your website up and running in days, not months.
            </p>
            <div className="flex items-center justify-center gap-8 text-lg text-white/70">
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-teal-400" />
                <span>Clean Code</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-blue-400" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          {/* Filter and Search */}
          <div className={`mb-16 transition-all duration-1000 animate-delay-400 ${
            isVisible ? 'animate-fade-in-up' : 'animate-hidden'
          }`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="px-4 py-2 text-white border-slate-600/50 hover:border-teal-400 cursor-pointer">
                  All Templates
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-white border-slate-600/50 hover:border-teal-400 cursor-pointer">
                  Portfolio
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-white border-slate-600/50 hover:border-teal-400 cursor-pointer">
                  E-commerce
                </Badge>
                <Badge variant="outline" className="px-4 py-2 text-white border-slate-600/50 hover:border-teal-400 cursor-pointer">
                  AI Tools
                </Badge>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="px-4 py-2 pl-10 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder:text-slate-400 focus:border-teal-400 focus:outline-none transition-colors duration-300 w-64"
                />
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className={`bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 hover:-translate-y-2 group ${
                  isVisible ? 'animate-fade-in-up' : 'animate-hidden'
                }`}
                style={{
                  animationDelay: `${(index + 1) * 200}ms`
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => onProductImageError(e, product.id, product.image)}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Featured Badge */}
                  {product.featured && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-teal-400 to-blue-400 text-black font-bold px-3 py-1">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/30">
                      {product.category}
                    </Badge>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="flex-1 bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-teal-400 to-blue-400 text-black hover:from-teal-500 hover:to-blue-500">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-xl text-white leading-tight">{product.name}</CardTitle>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-teal-400">{product.price}</div>
                        <div className="text-sm text-slate-400">One-time</div>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-400">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <CardDescription className="text-slate-300 mb-6 leading-relaxed">
                    {product.description}
                  </CardDescription>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {product.features.slice(0, 4).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 bg-teal-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs text-slate-300 border-slate-600/50">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      {product.deliveryTime}
                    </div>
                    <Button 
                      onClick={() => handleOrderNow(product)}
                      className="bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                    >
                      Order Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className={`text-center mt-20 transition-all duration-1000 animate-delay-1400 ${
            isVisible ? 'animate-fade-in-up' : 'animate-hidden'
          }`}>
            <div className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-12 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-white mb-4">Need Something Custom?</h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Can't find what you're looking for? Let me create a custom solution tailored to your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-semibold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Start Custom Project
                </Button>
                <Button variant="outline" className="border-slate-600/50 text-white hover:border-teal-400 hover:bg-slate-700/50 text-lg px-8 py-4">
                  <Mail className="w-5 h-5 mr-2" />
                  Discuss Requirements
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      
      <OrderForm 
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
        product={selectedProduct}
      />
    </div>
  );
};

export default Shop;