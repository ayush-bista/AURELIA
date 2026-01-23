import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Static product data (simulating database)
const products = [
  {
    id: "1",
    name: "Luna Pendant Necklace",
    slug: "luna-pendant-necklace",
    description: "A delicate gold pendant inspired by the moon. Crafted with 18k gold plating and featuring a luminous moonstone centerpiece.",
    price: 185,
    category_id: "1",
    image_url: null,
    images: [],
    in_stock: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Jewelry", slug: "jewelry" },
  },
  {
    id: "2",
    name: "Aria Drop Earrings",
    slug: "aria-drop-earrings",
    description: "Elegant gold drop earrings with a timeless design. Perfect for both everyday elegance and special occasions.",
    price: 120,
    category_id: "1",
    image_url: null,
    images: [],
    in_stock: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Jewelry", slug: "jewelry" },
  },
  {
    id: "3",
    name: "Celestine Ring Set",
    slug: "celestine-ring-set",
    description: "Set of three stackable gold rings. Mix and match for endless styling possibilities.",
    price: 145,
    category_id: "1",
    image_url: null,
    images: [],
    in_stock: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Jewelry", slug: "jewelry" },
  },
  {
    id: "4",
    name: "Serene Silk Scarf",
    slug: "serene-silk-scarf",
    description: "Hand-printed silk scarf in soft pastels. Made from 100% mulberry silk.",
    price: 95,
    category_id: "2",
    image_url: null,
    images: [],
    in_stock: true,
    featured: true,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Scarves", slug: "scarves" },
  },
  {
    id: "5",
    name: "Heritage Leather Tote",
    slug: "heritage-leather-tote",
    description: "Handcrafted leather tote with gold accents. Spacious interior with multiple compartments.",
    price: 350,
    category_id: "3",
    image_url: null,
    images: [],
    in_stock: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Bags", slug: "bags" },
  },
  {
    id: "6",
    name: "Twilight Cashmere Wrap",
    slug: "twilight-cashmere-wrap",
    description: "Soft cashmere wrap in deep twilight hues. Luxuriously soft and warm.",
    price: 165,
    category_id: "2",
    image_url: null,
    images: [],
    in_stock: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Scarves", slug: "scarves" },
  },
  {
    id: "7",
    name: "Nova Chain Bracelet",
    slug: "nova-chain-bracelet",
    description: "Delicate gold chain bracelet with subtle star charms. Adjustable length for perfect fit.",
    price: 95,
    category_id: "1",
    image_url: null,
    images: [],
    in_stock: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Jewelry", slug: "jewelry" },
  },
  {
    id: "8",
    name: "Evening Clutch",
    slug: "evening-clutch",
    description: "Sophisticated evening clutch in rich burgundy. Perfect for special occasions.",
    price: 180,
    category_id: "3",
    image_url: null,
    images: [],
    in_stock: true,
    featured: false,
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    categories: { name: "Bags", slug: "bags" },
  },
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const featured = url.searchParams.get("featured");
    const slug = url.searchParams.get("slug");

    let result = [...products];

    // Filter by slug (single product)
    if (slug) {
      const product = products.find((p) => p.slug === slug);
      return new Response(JSON.stringify({ success: true, data: product || null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Filter by category
    if (category) {
      result = result.filter((p) => p.categories?.slug === category);
    }

    // Filter by featured
    if (featured === "true") {
      result = result.filter((p) => p.featured);
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
