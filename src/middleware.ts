import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import { ipAddress } from "@vercel/edge"
import { NextResponse, type NextRequest } from "next/server"

const ratelimitGlobal = new Ratelimit({
  // The `@ts-ignore` is required because the `Redis.fromEnv()` function is currently not typed correctly
  // @ts-ignore
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "60 s"),
})

const ratelimit = new Ratelimit({
  // The `@ts-ignore` is required because the `Redis.fromEnv()` function is currently not typed correctly
  // @ts-ignore
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "60 s"),
})

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // If the rate limiter is disabled, skip the middleware
  if ((process.env.ENABLE_RATELIMIT || "false") !== "true") {
    return NextResponse.next()
  }

  // First check if the global rate limit is exceeded
  const { success: globalSuccess } = await ratelimitGlobal.limit("global")

  // If the global rate limit is exceeded, return a 429 Too Many Requests response
  if (!globalSuccess) {
    return new Response("Too many requests", { status: 429 })
  }

  // Get the IP address of the request and use it as the key for the rate limiter
  const ip = ipAddress(request) || "unknown"
  const { success } = await ratelimit.limit(ip)

  // If the rate limit is exceeded, return a 429 Too Many Requests response
  if (!success) {
    return new Response("Too many requests", { status: 429 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/api/generate",
  runtime: "experimental-edge",
}
