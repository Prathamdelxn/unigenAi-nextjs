import { NextResponse } from "next/server";

// Use POST method to handle code generation requests
export async function POST(req) {
  const { prompt, temperature = 0.7, maxTokens = 1000 } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "Missing Gemini API key" }, { status: 500 });
  }

  try {
    const geminiResponse = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate code for the following request. Only respond with the code, no explanations:\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature,
          maxOutputTokens: maxTokens,
          topK: 1,
          topP: 1
        }
      }),
    });

    const data = await geminiResponse.json();

    if (!geminiResponse.ok) {
      return NextResponse.json({ error: data.error?.message || "Gemini API failed" }, { status: geminiResponse.status });
    }

    const code = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    return NextResponse.json({ code: code || "// No code generated" });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json({ error: "Server error: " + error.message }, { status: 500 });
  }
}
