-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  image_url TEXT,
  images TEXT[] DEFAULT '{}',
  in_stock BOOLEAN NOT NULL DEFAULT true,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wishlist table
CREATE TABLE public.wishlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create newsletter_subscribers table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Categories: Public read access
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT USING (true);

-- Products: Public read access
CREATE POLICY "Products are viewable by everyone" 
ON public.products FOR SELECT USING (true);

-- Profiles: Users can view all profiles, but only update their own
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Wishlist: Users can only access their own wishlist
CREATE POLICY "Users can view their own wishlist" 
ON public.wishlist FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can add to their own wishlist" 
ON public.wishlist FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove from their own wishlist" 
ON public.wishlist FOR DELETE USING (auth.uid() = user_id);

-- Newsletter: Anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter" 
ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for auto profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add updated_at triggers
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial categories
INSERT INTO public.categories (name, slug, description) VALUES
  ('Jewelry', 'jewelry', 'Elegant necklaces, earrings, rings, and bracelets'),
  ('Bags', 'bags', 'Sophisticated handbags, clutches, and totes'),
  ('Scarves', 'scarves', 'Luxurious silk and cashmere scarves'),
  ('Watches', 'watches', 'Timeless timepieces for every occasion');

-- Seed initial products
INSERT INTO public.products (name, slug, description, price, category_id, featured) VALUES
  ('Luna Pendant Necklace', 'luna-pendant-necklace', 'A delicate gold pendant inspired by the moon', 185.00, (SELECT id FROM categories WHERE slug = 'jewelry'), true),
  ('Aria Drop Earrings', 'aria-drop-earrings', 'Elegant gold drop earrings with a timeless design', 120.00, (SELECT id FROM categories WHERE slug = 'jewelry'), true),
  ('Celestine Ring Set', 'celestine-ring-set', 'Set of three stackable gold rings', 145.00, (SELECT id FROM categories WHERE slug = 'jewelry'), true),
  ('Aurora Bracelet', 'aurora-bracelet', 'Dainty chain bracelet with subtle charms', 95.00, (SELECT id FROM categories WHERE slug = 'jewelry'), false),
  ('Serene Silk Scarf', 'serene-silk-scarf', 'Hand-printed silk scarf in soft pastels', 95.00, (SELECT id FROM categories WHERE slug = 'scarves'), true),
  ('Twilight Wrap', 'twilight-wrap', 'Luxurious cashmere blend wrap', 165.00, (SELECT id FROM categories WHERE slug = 'scarves'), false),
  ('Sophia Tote', 'sophia-tote', 'Classic leather tote for everyday elegance', 285.00, (SELECT id FROM categories WHERE slug = 'bags'), true),
  ('Mila Clutch', 'mila-clutch', 'Evening clutch with gold hardware', 175.00, (SELECT id FROM categories WHERE slug = 'bags'), false),
  ('Eternal Watch', 'eternal-watch', 'Minimalist gold-tone watch with leather strap', 225.00, (SELECT id FROM categories WHERE slug = 'watches'), true),
  ('Rose Hoop Earrings', 'rose-hoop-earrings', 'Classic rose gold hoop earrings', 85.00, (SELECT id FROM categories WHERE slug = 'jewelry'), false),
  ('Pearl Strand Necklace', 'pearl-strand-necklace', 'Freshwater pearl necklace with gold clasp', 245.00, (SELECT id FROM categories WHERE slug = 'jewelry'), false),
  ('Canvas Weekender', 'canvas-weekender', 'Leather-trimmed canvas travel bag', 320.00, (SELECT id FROM categories WHERE slug = 'bags'), false);