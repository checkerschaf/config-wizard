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

    return new Response(prompt)

    const payload: OpenAIPayload = {
      model: "text-davinci-003",
      prompt,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 750,
      stream: false,
      n: 1,
    }

    const response = await fetch("https://api.openai.com/v1/completions", {
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
    const text = openaiJson?.choices?.[0]?.text ?? ""
    return new Response(text)
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 })
    }
    return new Response("Bad Request", { status: 400 })
  }
}

export type OpenAIPayload = {
  model: string
  prompt: string
  temperature: number
  top_p: number
  frequency_penalty: number
  presence_penalty: number
  max_tokens: number
  stream: boolean
  n: number
}
