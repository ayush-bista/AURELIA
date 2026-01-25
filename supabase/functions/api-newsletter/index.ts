import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_METHODS = "POST, OPTIONS";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": ALLOWED_METHODS,
};

// In-memory subscriber storage (would be database in production)
const subscribers: string[] = [];

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method === "POST") {
      let email = "";
      try {
        const body = await req.json();
        email = (body?.email || "").toString().trim();
      } catch {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid JSON body" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailPattern.test(email)) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid email address" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if already subscribed (simulated)
      const exists = subscribers.some((e) => e.toLowerCase() === email.toLowerCase());
      if (exists) {
        return new Response(
          JSON.stringify({ success: true, message: "Already subscribed", alreadySubscribed: true }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Add subscriber
      subscribers.push(email);
      console.log(`New subscriber: ${email}`);

      return new Response(
        JSON.stringify({ success: true, message: "Successfully subscribed" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Method not allowed" }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
