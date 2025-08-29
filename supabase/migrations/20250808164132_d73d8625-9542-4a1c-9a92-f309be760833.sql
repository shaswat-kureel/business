-- Create table for product orders
CREATE TABLE public.product_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  product_name TEXT NOT NULL,
  product_price NUMERIC NOT NULL,
  customization_notes TEXT,
  order_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.product_orders ENABLE ROW LEVEL SECURITY;

-- Create policies for product orders
CREATE POLICY "Anyone can create product orders" 
ON public.product_orders 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view product orders" 
ON public.product_orders 
FOR SELECT 
USING (true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_product_orders_updated_at
BEFORE UPDATE ON public.product_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();