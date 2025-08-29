-- Create a table for project bookings
CREATE TABLE public.project_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  project_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT NOT NULL,
  phone TEXT,
  contact_preference TEXT DEFAULT 'email',
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.project_bookings ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert bookings (public form)
CREATE POLICY "Anyone can create project bookings" 
ON public.project_bookings 
FOR INSERT 
WITH CHECK (true);

-- Create policy for reading bookings (you can customize this based on your needs)
CREATE POLICY "Project owner can view bookings" 
ON public.project_bookings 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_project_bookings_updated_at
  BEFORE UPDATE ON public.project_bookings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();