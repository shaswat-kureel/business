import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";

const Pricing = () => {
  const packages = [
    {
      name: "Basic",
      price: "$2,500",
      duration: "per project",
      description: "Perfect for small businesses and startups",
      features: [
        "5-page responsive website",
        "Mobile-first design", 
        "Contact form integration",
        "SEO optimization",
        "1 month support",
        "3 revisions included"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$7,500",
      duration: "per project", 
      description: "Ideal for growing businesses",
      features: [
        "Full-stack web application",
        "Custom dashboard",
        "Database integration",
        "User authentication",
        "Payment gateway",
        "API development",
        "3 months support",
        "Unlimited revisions"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$15,000+",
      duration: "per project",
      description: "For complex enterprise solutions",
      features: [
        "Complex web platform",
        "AI/ML integration",
        "Microservices architecture",
        "Advanced analytics",
        "Third-party integrations",
        "DevOps & deployment",
        "6 months support",
        "Priority support"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-primary">Transparent</span> Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect package for your project. No hidden fees, no surprises.
          </p>
        </div>

        {/* Project Packages */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card key={index} className={`relative hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${
              pkg.popular ? 'border-primary bg-card' : 'bg-card border-border'
            }`}>
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-primary">{pkg.price}</span>
                  <span className="text-muted-foreground ml-2">{pkg.duration}</span>
                </div>
                <CardDescription className="mt-2">{pkg.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant={pkg.popular ? "hero" : "outline"} 
                  className="w-full"
                  size="lg"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;