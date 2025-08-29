import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShoppingCart, Star } from "lucide-react";

const formSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().optional(),
  customizationNotes: z.string().optional(),
});

interface OrderFormProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const OrderForm = ({ product, isOpen, onClose }: OrderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      customizationNotes: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!product) return;
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('product_orders')
        .insert({
          customer_name: values.customerName,
          customer_email: values.customerEmail,
          customer_phone: values.customerPhone || null,
          product_name: product.name,
          product_price: product.price,
          customization_notes: values.customizationNotes || null,
        });

      if (error) throw error;

      toast({
        title: "Order Placed Successfully! 🎉",
        description: "I'll contact you within 24 hours to discuss the project details.",
      });

      form.reset();
      onClose();
    } catch (error) {
      console.error('Error submitting order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hide">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            Order {product.name}
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to place your order for this template.
          </DialogDescription>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-muted/50 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              {product.icon}
            </div>
            <div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through text-sm">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customizationNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customization Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific requirements or customizations you need..."
                      className="min-h-[100px] resize-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-primary/5 rounded-lg p-4">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                What's included:
              </h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {product.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="hero"
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Placing Order...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Place Order
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;