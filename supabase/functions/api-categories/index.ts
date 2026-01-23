import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Static category data (simulating database)
const categories = [
  {
    id: "1",
    name: "Jewelry",
    slug: "jewelry",
    description: "Elegant gold jewelry pieces crafted with care",
    image_url: null,
  },
  {
    id: "2",
    name: "Scarves",
    slug: "scarves",
    description: "Luxurious silk and cashmere scarves",
    image_url: null,
  },
  {
    id: "3",
    name: "Bags",
    slug: "bags",
    description: "Sophisticated leather bags and accessories",
    image_url: null,
  },
];

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    // Get single category by slug
    if (slug) {
      const category = categories.find((c) => c.slug === slug);
      return new Response(JSON.stringify({ success: true, data: category || null }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return all categories
    return new Response(JSON.stringify({ success: true, data: categories }), {
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
