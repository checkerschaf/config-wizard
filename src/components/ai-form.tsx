import AiResponse from "@/components/ai-response"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { aiRequestSchema, AiRequestType } from "@/lib/ai/ai-request-schema"
import { useZodForm } from "@/lib/forms"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import clsx from "clsx"
import { Loader2, Wand2 } from "lucide-react"
import { Fragment, ReactNode, useRef, useState } from "react"

const SELECTABLE_AI_REQUEST_TYPES = [
  {
    label: "Docker",
    options: [
      { label: "Dockerfile optimization", value: "OPTIMIZE_DOCKERFILE" },
      { label: "Dockerfile creation", value: "CREATE_DOCKERFILE" },
      {
        label: "Docker Compose optimization",
        value: "OPTIMIZE_DOCKER_COMPOSE",
      },
      { label: "Docker Compose creation", value: "CREATE_DOCKER_COMPOSE" },
    ],
    icon: Icons.docker,
  },
  {
    label: "Custom (advanced)",
    options: [
      {
        label: "Optimize custom configuration",
        value: "OPTIMIZE_CUSTOM_CONFIG",
      },
      { label: "Create custom configuration", value: "CREATE_CUSTOM_CONFIG" },
    ],
  },
] as const satisfies readonly {
  label: string
  options: readonly { label: string; value: AiRequestType }[]
  icon?: React.ComponentType<{ className?: string }>
}[]

export const AiForm = () => {
  const [error, setError] = useState<string>()
  const [autoAnimate] = useAutoAnimate()
  const [response, setResponse] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const responseRef = useRef<HTMLDivElement>(null)
  const [responseAutoAnimate] = useAutoAnimate()

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useZodForm({
    schema: aiRequestSchema,
    shouldFocusError: true,
  })

  const onSubmit = handleSubmit(async (formData) => {
    setIsLoading(true)
    setResponse("")
    setError(undefined)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        setIsLoading(false)
        setError(await response.text())
        console.error(response)
        return
      }

      setIsLoading(false)
      setResponse(await response.text())
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } catch (error) {
      setIsLoading(false)
      if (error instanceof Error) {
        setError(error.message)
      }
      console.error(error)
    }
  })

  // This is a workaround for the fact that the Select component does not support the onChange event and ref forwarding
  const { ...registerTypeMethods } = register("type")
  const registerType = {
    onValueChange: (value: string) => {
      setValue("type", value as AiRequestType)
      clearErrors("type")
    },
    ...registerTypeMethods,
  }

  return (
    <>
      <form
        onSubmit={(data) => void onSubmit(data)}
        className="mx-auto flex max-w-lg flex-col gap-6 align-middle"
        ref={autoAnimate}
      >
        <InputDiv>
          <Label htmlFor="type">
            1. What do you want to optimize or create?
          </Label>
          <Select {...registerType}>
            <SelectTrigger {...registerType}>
              <SelectValue placeholder="Select AI request type" />
            </SelectTrigger>
            <SelectContent id="type">
              {SELECTABLE_AI_REQUEST_TYPES.map((group) => (
                <Fragment key={group.label}>
                  <SelectGroup>
                    <SelectLabel className="inline-flex items-center gap-1">
                      {"icon" in group && (
                        <group.icon className="h-5 w-5" aria-hidden="true" />
                      )}
                      {group.label}
                    </SelectLabel>
                    {group.options.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <span className="flex gap-1" aria-hidden="true">
                          {"icon" in group && (
                            <group.icon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          )}
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                </Fragment>
              ))}
            </SelectContent>
          </Select>
          <InputError>
            {errors.type && (
              <p className="text-sm text-red-500">{errors.type.message}</p>
            )}
          </InputError>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="intent">2. What do you want to achieve?</Label>
          <Input
            id="intent"
            placeholder="I want to..."
            {...register("intent")}
          />
          <p className="text-sm text-slate-500">
            Please describe as detailed as possible what your goal is. For
            example, &quot;I want to add multi stage builds to my
            Dockerfile&quot;.
          </p>
          <InputError>
            {errors.intent && (
              <p className="text-sm text-red-500">{errors.intent.message}</p>
            )}
          </InputError>
        </InputDiv>
        <InputDiv>
          <Label htmlFor="code">
            3. Paste your configuration or describe your tech stack
          </Label>
          <Textarea
            id="code"
            placeholder="Paste your code or configuration here"
            {...register("input")}
          />
          <p className="text-sm text-slate-500">
            This should be the input you want to optimize. For example, the
            content of a Dockerfile. For creation requests, please add details
            about the technologies you want to use.
          </p>
          <InputError>
            {errors.input && (
              <p className="text-sm text-red-500">{errors.input.message}</p>
            )}
          </InputError>
        </InputDiv>
        <div className="w-full">
          <Button size="lg" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <span>
              {isLoading
                ? "Generating configuration..."
                : "Generate configuration"}
            </span>
            <Wand2 className="ml-2 h-4 w-4 text-yellow-300" />
          </Button>
        </div>
        {error && (
          <p className="text-center text-sm text-red-500">
            Something went wrong: {error}
            <br />
            Please try again later.
          </p>
        )}
      </form>
      <div
        ref={responseRef}
        className={clsx("scroll-m-24 mt-12", response ? "" : "hidden")}
      >
        <div ref={responseAutoAnimate}>
          {response && <AiResponse response={response} isLoading={isLoading} />}
        </div>
      </div>
    </>
  )
}

const InputDiv = ({ children }: { children: ReactNode }) => (
  <div className="grid w-full items-center gap-1.5">{children}</div>
)

const InputError = ({ children }: { children: ReactNode }) => {
  const [autoAnimate] = useAutoAnimate()
  return <div ref={autoAnimate}>{children}</div>
}
