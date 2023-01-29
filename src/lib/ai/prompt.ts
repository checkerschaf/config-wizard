import { aiRequestSchema } from "@/lib/ai/ai-request-schema"
import { z } from "zod"

export type GeneratePromptOptions = {
  type: z.infer<typeof aiRequestSchema>["type"]
  input: z.infer<typeof aiRequestSchema>["input"]
  intent?: z.infer<typeof aiRequestSchema>["intent"]
}

export const generatePrompt = (
  promptOptions: GeneratePromptOptions
): string => {
  switch (promptOptions.type) {
    case "OPTIMIZE_DOCKERFILE":
      return fillOptimizationPrompt({
        typeName: "Dockerfile",
        defaultIntent:
          "minimize the size of the image, improve build times and do other optimizations while keeping the same functionality",
        ...promptOptions,
      })
    case "OPTIMIZE_DOCKER_COMPOSE":
      return fillOptimizationPrompt({
        typeName: "Docker Compose",
        defaultIntent:
          "minimize the size of the image, improve build times and do other optimizations while keeping the same functionality",
        ...promptOptions,
      })
    case "CREATE_DOCKERFILE":
      return fillCreatePrompt({
        typeName: "Dockerfile",
        defaultIntent: "create a Dockerfile that will build the application",
        ...promptOptions,
      })
    case "CREATE_DOCKER_COMPOSE":
      return fillCreatePrompt({
        typeName: "Docker Compose",
        defaultIntent:
          "create a Docker Compose that will build the application",
        ...promptOptions,
      })
    case "CREATE_CUSTOM_CONFIG":
      return fillCreatePrompt({
        typeName: "configuration",
        defaultIntent: "create a configuration that will build the application",
        ...promptOptions,
      })
    case "OPTIMIZE_CUSTOM_CONFIG":
      return fillOptimizationPrompt({
        typeName: "configuration",
        defaultIntent:
          "optimize or create the configuration while keeping the same functionality",
        ...promptOptions,
      })
  }

  throw new Error("Unknown ai request type")
}

const generalFormat =
  "Please return the answer in the markdown format and wrap blocks of code in lines with only triple backticks (```). " +
  "Also add comments, give other suggestions, and add links to the documentation where appropriate."

const fillOptimizationPrompt = ({
  intent,
  typeName,
  input,
  defaultIntent,
}: GeneratePromptOptions & {
  defaultIntent: string
  typeName: string
}) => {
  return `Optimize the following ${typeName}. The intent is: "${
    intent || defaultIntent
  }". ${generalFormat}
Here is the content of the ${typeName}:

${input}`
}

const fillCreatePrompt = ({
  intent,
  typeName,
  input,
  defaultIntent,
}: GeneratePromptOptions & {
  defaultIntent: string
  typeName: string
}) => {
  return `Create a new ${typeName}. The intent of the ${typeName} is: "${
    intent || defaultIntent
  }". ${generalFormat}
  Here is what the content of the ${typeName} should contain:

  ${input}`
}
