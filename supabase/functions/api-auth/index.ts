import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory user storage (simulating database)
const users: Array<{ id: string; email: string; password: string; fullName: string }> = [];

function generateId() {
  return crypto.randomUUID();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get("action");

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ success: false, error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();

    if (action === "signup") {
      const { email, password, fullName } = body;

      if (!email || !password) {
        return new Response(
          JSON.stringify({ success: false, error: "Email and password are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Check if user exists
      const existingUser = users.find((u) => u.email === email);
      if (existingUser) {
        return new Response(
          JSON.stringify({ success: false, error: "User already exists" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Create user
      const newUser = {
        id: generateId(),
        email,
        password, // In production, this should be hashed
        fullName: fullName || "",
      };
      users.push(newUser);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Account created successfully",
          user: { id: newUser.id, email: newUser.email, fullName: newUser.fullName },
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (action === "login") {
      const { email, password } = body;

      if (!email || !password) {
        return new Response(
          JSON.stringify({ success: false, error: "Email and password are required" }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      // Find user
      const user = users.find((u) => u.email === email && u.password === password);
      if (!user) {
        return new Response(
          JSON.stringify({ success: false, error: "Invalid credentials" }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          message: "Login successful",
          user: { id: user.id, email: user.email, fullName: user.fullName },
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ success: false, error: "Invalid action" }),
      {
        status: 400,
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
