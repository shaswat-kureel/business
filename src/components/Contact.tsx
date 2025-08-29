import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, MapPin, Github, Linkedin, Twitter, Send, CheckCircle, AlertCircle, Phone, ArrowRight, Sparkles } from "lucide-react";
import shaswatAvatar from "@/assets/shaswat-avatar.png";
import { supabase } from "@/integrations/supabase/client";

// Form validation schema matching project_bookings table
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  phone: z.string().optional(),
  project_type: z.enum(["website", "webapp", "mobile", "consultation", "other"], {
    required_error: "Please select a project type"
  }),
  budget_range: z.enum(["Rs 0 - 1000", "Rs 1000 - 1800", "Rs 1800 - 2500", "Not yet decided", "Have no budget"], {
    required_error: "Please select a budget range"
  }),
  timeline: z.enum(["1-2 weeks", "1-2 months", "3-6 months", "6+ months", "Not sure"], {
    required_error: "Please select a timeline"
  }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contact_preference: z.enum(["email", "phone", "video_call"]).default("email"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contact_preference: "email"
    }
  });

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

    const element = document.getElementById('contact');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Insert data into project_bookings table
      const { error } = await supabase
        .from('project_bookings')
        .insert([
          {
            name: data.name,
            email: data.email,
            company: data.company || null,
            phone: data.phone || null,
            project_type: data.project_type,
            budget_range: data.budget_range,
            timeline: data.timeline,
            description: data.description,
            contact_preference: data.contact_preference,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Success
      setSubmitStatus("success");
      setSubmitMessage("Thank you for your message! I'll get back to you within 24 hours.");
      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setSubmitMessage("");
      }, 5000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
      setSubmitMessage("There was an error sending your message. Please email me directly at hello@shaswatkureel.dev");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Header Section */}
        <div className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'animate-hidden'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-medium mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-teal-400" />
            Let's Create Together
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8">
            <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
              Turn Your
            </span>{" "}
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ideas Into Hits
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed px-1">
            Start your journey here. Ready to bring your project to life? Let's discuss your requirements 
            and create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <Card className={`bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500 ${
            isVisible ? 'animate-fade-in-left' : 'animate-hidden'
          }`}>
            <CardHeader className="pb-4 sm:pb-6">
              <CardTitle className="text-2xl sm:text-3xl text-white">Send me a message</CardTitle>
              <CardDescription className="text-slate-300 text-base sm:text-lg">
                I'll get back to you within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 sm:space-y-6">
                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center space-x-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium break-words">{submitMessage}</span>
                  </div>
                )}
                
                {submitStatus === "error" && (
                  <div className="flex items-center space-x-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-medium break-words">{submitMessage}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      {...register("name")}
                      placeholder="Your Name *" 
                      className={`bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400 ${errors.name ? "border-red-500" : ""}`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1 break-words">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <Input 
                      {...register("email")}
                      placeholder="Your Email *" 
                      type="email" 
                      className={`bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400 ${errors.email ? "border-red-500" : ""}`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1 break-words">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input 
                      {...register("company")}
                      placeholder="Company Name (Optional)" 
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400"
                    />
                  </div>
                  <div>
                    <Input 
                      {...register("phone")}
                      placeholder="Phone Number (Optional)" 
                      type="tel"
                      className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Project Type *</label>
                  <select 
                    {...register("project_type")}
                    className={`w-full p-3 border rounded-lg bg-slate-700/50 text-white border-slate-600/50 focus:border-teal-400 ${errors.project_type ? "border-red-500" : ""}`}
                  >
                    <option value="">Select project type</option>
                    <option value="website">Website</option>
                    <option value="webapp">Web Application</option>
                    <option value="mobile">Mobile App</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.project_type && (
                    <p className="text-red-400 text-sm mt-1 break-words">{errors.project_type.message}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Budget Range *</label>
                    <select 
                      {...register("budget_range")}
                      className={`w-full p-3 border rounded-lg bg-slate-700/50 text-white border-slate-600/50 focus:border-teal-400 ${errors.budget_range ? "border-red-500" : ""}`}
                    >
                      <option value="">Select budget</option>
                      <option value="Rs 0 - 1000">Rs 0 - 1000</option>
                      <option value="Rs 1000 - 1800">Rs 1000 - 1800</option>
                      <option value="Rs 1800 - 2500">Rs 1800 - 2500</option>
                      <option value="Not yet decided">Not yet decided</option>
                      <option value="Have no budget">Have no budget</option>
                    </select>
                    {errors.budget_range && (
                      <p className="text-red-400 text-sm mt-1 break-words">{errors.budget_range.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-white">Timeline *</label>
                    <select 
                      {...register("timeline")}
                      className={`w-full p-3 border rounded-lg bg-slate-700/50 text-white border-slate-600/50 focus:border-teal-400 ${errors.timeline ? "border-red-500" : ""}`}
                    >
                      <option value="">Select timeline</option>
                      <option value="1-2 weeks">1-2 weeks</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6+ months">6+ months</option>
                      <option value="Not sure">Not sure</option>
                    </select>
                    {errors.timeline && (
                      <p className="text-red-400 text-sm mt-1 break-words">{errors.timeline.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Textarea 
                    {...register("description")}
                    placeholder="Tell me about your project... *" 
                    className={`min-h-32 bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400 ${errors.description ? "border-red-500" : ""}`}
                  />
                  {errors.description && (
                    <p className="text-red-400 text-sm mt-1 break-words">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-white">Preferred Contact Method</label>
                  <select 
                    {...register("contact_preference")}
                    className="w-full p-3 border rounded-lg bg-slate-700/50 text-white border-slate-600/50 focus:border-teal-400"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="video_call">Video Call</option>
                  </select>
                </div>

                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-semibold text-lg py-5 sm:py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className={`space-y-6 sm:space-y-8 transition-all duration-1000 animate-delay-400 ${
            isVisible ? 'animate-fade-in-right' : 'animate-hidden'
          }`}>
            {/* Profile Card */}
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-slate-900/50 transition-all duration-500">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                  <div className="relative">
                    <img
                      src={shaswatAvatar}
                      alt="Shaswat Kureel"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover ring-4 ring-slate-600/50"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-400 rounded-full border-2 border-black"></div>
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Shaswat Kureel</h3>
                    <p className="text-slate-300 text-base sm:text-lg mb-3">Full-Stack Developer</p>
                    <Badge className="bg-gradient-to-r from-teal-400 to-blue-400 text-black font-semibold px-3 py-1.5 sm:px-4 sm:py-2">
                      Available for new projects
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <MapPin className="w-5 h-5 text-teal-400" />
                    <span className="text-white">India (Remote Worldwide)</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <Mail className="w-5 h-5 text-teal-400" />
                    <span className="text-white break-words">shaswat-developer@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <Phone className="w-5 h-5 text-teal-400" />
                    <span className="text-white">+91 (Available on request)</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
                    <Calendar className="w-5 h-5 text-teal-400" />
                    <span className="text-white">Usually responds in 2-4 hours</span>
                  </div>
                </div>

                {/* Social buttons responsive grid */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <Button variant="outline" size="lg" className="w-full bg-slate-700/30 border-slate-600/50 text-white hover:bg-slate-600/50 hover:border-teal-400">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-slate-700/30 border-slate-600/50 text-white hover:bg-slate-600/50 hover:border-teal-400">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </Button>
                  <Button variant="outline" size="lg" className="w-full bg-slate-700/30 border-slate-600/50 text-white hover:bg-slate-600/50 hover:border-teal-400">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Current Availability Info */}
            <Card className="bg-gradient-to-r from-teal-400/10 to-blue-400/10 border border-teal-400/20">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 flex items-center text-white text-lg">
                  <Calendar className="w-6 h-6 text-teal-400 mr-3" />
                  Current Availability
                </h4>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  I'm currently accepting new projects and ready to discuss your requirements. 
                  Fill out the form to get started with priority scheduling.
                </p>
                <div className="flex items-center space-x-2 text-teal-400 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Available for new projects</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Note: BookingForm removed - functionality integrated into main contact form */}
    </section>
  );
};

export default Contact;