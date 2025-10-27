import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { formData } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Diabetes prediction request received with data:", formData);

    // Prepare the health data for AI analysis
    const healthDataSummary = `
Patient Health Metrics:
- Glucose Level: ${formData.glucose || 'Not provided'} mg/dL
- Blood Pressure: ${formData.bloodPressure || 'Not provided'} mmHg
- BMI: ${formData.bmi || 'Not provided'}
- Age: ${formData.age || 'Not provided'} years
- Insulin Level: ${formData.insulin || 'Not provided'} µU/mL
- Skin Thickness: ${formData.skinThickness || 'Not provided'} mm
- Number of Pregnancies: ${formData.pregnancies || 'Not provided'}
    `.trim();

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert medical AI specializing in diabetes risk assessment. Analyze patient health metrics and provide a comprehensive diabetes risk evaluation.

Your response MUST be in this exact JSON format:
{
  "riskLevel": "low" | "medium" | "high",
  "confidence": number (0-100),
  "analysis": "Brief 2-3 sentence analysis of the key risk factors",
  "recommendations": ["recommendation 1", "recommendation 2", "recommendation 3"],
  "keyFactors": ["factor 1", "factor 2", "factor 3"]
}

Risk Level Guidelines:
- LOW: Glucose < 100, BMI < 25, normal BP, no major risk factors
- MEDIUM: Glucose 100-125 (prediabetes range), BMI 25-30, slightly elevated BP, some risk factors
- HIGH: Glucose > 125, BMI > 30, high BP, multiple risk factors present

Consider ALL provided metrics holistically. Missing data should not prevent analysis - work with available information.`,
          },
          {
            role: "user",
            content: `Analyze this patient's diabetes risk:\n\n${healthDataSummary}\n\nProvide a comprehensive risk assessment in the specified JSON format.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        console.error("Rate limit exceeded");
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        console.error("Payment required");
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your workspace." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    console.log("AI Response:", aiResponse);

    // Parse the AI response
    let prediction;
    try {
      // Extract JSON from the response (in case there's extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        prediction = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback response
      prediction = {
        riskLevel: "medium",
        confidence: 50,
        analysis: "Unable to perform detailed analysis. Please consult a healthcare professional for accurate assessment.",
        recommendations: [
          "Schedule an appointment with your doctor",
          "Monitor your glucose levels regularly",
          "Maintain a healthy diet and exercise routine"
        ],
        keyFactors: ["Incomplete analysis"]
      };
    }

    return new Response(JSON.stringify({ prediction }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Prediction error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
