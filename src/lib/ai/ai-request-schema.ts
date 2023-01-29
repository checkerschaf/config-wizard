import { z } from "zod"

export const AiRequestOptimizeTypes = {
  OPTIMIZE_DOCKERFILE: "OPTIMIZE_DOCKERFILE",
  OPTIMIZE_DOCKER_COMPOSE: "OPTIMIZE_DOCKER_COMPOSE",
  OPTIMIZE_CUSTOM_CONFIG: "OPTIMIZE_CUSTOM_CONFIG",
} as const

export const AiRequestCreateTypes = {
  CREATE_DOCKERFILE: "CREATE_DOCKERFILE",
  CREATE_DOCKER_COMPOSE: "CREATE_DOCKER_COMPOSE",
  CREATE_CUSTOM_CONFIG: "CREATE_CUSTOM_CONFIG",
} as const

export const AiRequestTypes = {
  ...AiRequestOptimizeTypes,
  ...AiRequestCreateTypes,
} as const
export type AiRequestType = (typeof AiRequestTypes)[keyof typeof AiRequestTypes]
export type AiRequestCreateType =
  (typeof AiRequestCreateTypes)[keyof typeof AiRequestCreateTypes]
export type AiRequestOptimizeType =
  (typeof AiRequestOptimizeTypes)[keyof typeof AiRequestOptimizeTypes]

export const aiRequestSchema = z
  .object({
    type: z.preprocess(
      (val) => val || undefined,
      z.nativeEnum(AiRequestTypes, {
        required_error: "Please select an ai request type.",
      })
    ),
    intent: z
      .string()
      .max(250, {
        message: "The intent must be at most 250 characters long.",
      })
      .optional(),
    input: z
      .string()
      .min(10, {
        message: "The input must be at least 10 characters long.",
      })
      .max(1000, {
        message: "The input must be at most 1000 characters long.",
      }),
  })
  .refine(
    (data) => {
      // If the request is custom, then the intent must be defined
      if (
        data.type !== "CREATE_CUSTOM_CONFIG" &&
        data.type !== "OPTIMIZE_CUSTOM_CONFIG"
      ) {
        return true
      }
      return !!data.intent
    },
    {
      message: "The intent must be defined for custom (advanced) requests.",
      path: ["intent"],
    }
  )
