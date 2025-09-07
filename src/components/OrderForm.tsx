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
import { Loader2, ShoppingCart, Star, CheckCircle, Package } from "lucide-react";

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
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto scrollbar-hide bg-slate-900/80 backdrop-blur-sm border-slate-700/50 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <ShoppingCart className="w-6 h-6 text-teal-400" />
            Order Confirmation
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Review your order and provide your details to complete the purchase.
          </DialogDescription>
        </DialogHeader>

        {/* Product Summary */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/30 rounded-lg p-6 my-6 border border-slate-700/50 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-lg border border-teal-400/30">
              <Package className="w-8 h-8 text-teal-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{product.name}</h3>
              <p className="text-sm text-slate-300">{product.category}</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-400 mb-1">Total Price</p>
              <span className="text-4xl font-bold text-teal-400">{product.price}</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400" />
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
                  <FormLabel className="text-slate-300">Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="your.email@example.com" 
                      {...field} 
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400"
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
                  <FormLabel className="text-slate-300">Phone Number (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel" 
                      placeholder="+91 9876543210" 
                      {...field} 
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400"
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
                  <FormLabel className="text-slate-300">Customization Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Any specific requirements or customizations you need..."
                      className="min-h-[100px] resize-none bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-teal-400"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-4">
              <h4 className="font-medium mb-3 flex items-center gap-2 text-white">
                <Star className="w-5 h-5 text-yellow-400" />
                What's Included:
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {product.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="flex-1 border-slate-600/50 text-white hover:bg-slate-700/50 hover:border-teal-400"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-teal-400 to-blue-400 hover:from-teal-500 hover:to-blue-500 text-black font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
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
