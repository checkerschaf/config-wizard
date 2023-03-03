import { aiRequestSchema } from "@/lib/ai/ai-request-schema"
import { generatePrompt } from "@/lib/ai/prompt"
import { NextRequest } from "next/server"

export const config = {
  runtime: "edge",
}

export default async function handler(req: NextRequest): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const json = await req.json()
    const schemaResult = aiRequestSchema.safeParse(json)

    if (!schemaResult.success) {
      return new Response("Bad request: " + schemaResult.error, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY) {
      return new Response("Missing OpenAI API key", { status: 500 })
    }

    const prompt = generatePrompt(schemaResult.data)

    const payload = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      stream: false,
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
      },
      method: "POST",
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      return new Response(response.statusText, { status: response.status })
    }

    const openaiJson = await response.json()
    const text = openaiJson?.choices?.[0]?.message?.content ?? ""
    return new Response(text)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 })
    }
    return new Response("Bad Request", { status: 400 })
  }
}
