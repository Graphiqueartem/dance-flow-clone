import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { performanceData, paymentType, amount } = await req.json();
    
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client using service role key for admin operations
    const supabaseService = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // First, create the performance record with pending payment status
    const { data: performance, error: perfError } = await supabaseService
      .from('performances')
      .insert([{
        ...performanceData,
        status: 'pending_payment'
      }])
      .select()
      .single();

    if (perfError) {
      throw new Error(`Failed to create performance: ${perfError.message}`);
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: performanceData.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: `${paymentType} Feedback - ${performanceData.performance_title}`,
              description: `Professional feedback for your performance: ${performanceData.performance_title}`
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/user-dashboard?payment=success&performance_id=${performance.id}`,
      cancel_url: `${req.headers.get("origin")}/performance-review-form?payment=cancelled`,
      metadata: {
        performance_id: performance.id,
        payment_type: paymentType
      }
    });

    // Create order record
    await supabaseService.from("orders").insert({
      performance_id: performance.id,
      amount: amount,
      currency: 'usd',
      status: "pending",
      payment_intent_id: session.id
    });

    return new Response(JSON.stringify({ 
      url: session.url,
      performance_id: performance.id 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});