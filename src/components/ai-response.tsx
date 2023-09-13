import { Icons } from "@/components/icons"
import { Button, buttonVariants } from "@/components/ui/button"
import { appConfig } from "@/config/app"
import wizardImage from "@/images/wizard.png"
import { useCopyToClipboard } from "@/lib/use-copy-to-clipboard"
import DOMPurify from "isomorphic-dompurify"
import { Clipboard, ClipboardCheck, Loader2, Wand2 } from "lucide-react"
import { marked } from "marked"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

export default function AiResponse({
  response,
  isLoading,
}: {
  response: string
  isLoading: boolean
}) {
  const { isCopied, copyToClipboard } = useCopyToClipboard()

  return (
    <div className="flex w-full max-w-2xl flex-col">
      <div className="flex items-center justify-center gap-2 text-xl font-bold">
        <Image
          src={wizardImage}
          alt="wizard"
          width={48}
          height={48}
          className="h-12 w-12 rounded-3xl"
        />
        <span>{appConfig.name} response</span>
        {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
      </div>
      <div className="markdown prose prose-purple break-words prose-pre:whitespace-pre-line dark:prose-invert">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(response.trim())),
          }}
        />
      </div>
      <div className="flex justify-center gap-4 max-sm:flex-col">
        <Button
          variant="outline"
          onClick={() => copyToClipboard(response)}
          className="flex gap-2"
        >
          {isCopied ? (
            <ClipboardCheck className="h-5 w-5 motion-safe:animate-pulse" />
          ) : (
            <Clipboard className="h-5 w-5" />
          )}
          Copy to clipboard
        </Button>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col gap-6">
        <h4 className="text-center text-lg font-medium">
          <Balancer>
            Thanks for trying out {appConfig.name}!{" "}
            <Wand2 className="inline-block h-5 w-5" />
          </Balancer>
        </h4>
        <div className="flex justify-center gap-4 max-sm:flex-col">
          <Link
            href={appConfig.links.github}
            target="_blank"
            className={buttonVariants({ size: "lg" })}
          >
            <Icons.gitHub className="mr-2 h-5 w-5" />
            Star on GitHub
          </Link>
          <Link
            target="_blank"
            href={appConfig.links.twitter}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Icons.twitter className="mr-2 h-5 w-5" />
            Follow me on Twitter
          </Link>
        </div>
        <div>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            <Balancer>
              This is an early preview. If you have any feedback, please reach
              out to me on{" "}
              <Link
                target="_blank"
                className="font-medium underline underline-offset-4"
                href={appConfig.links.twitter}
              >
                Twitter
              </Link>{" "}
              or open an issue on{" "}
              <Link
                target="_blank"
                className="font-medium underline underline-offset-4"
                href={appConfig.links.github + "/issues"}
              >
                GitHub
              </Link>
              .
            </Balancer>
          </p>
        </div>
      </div>
    </div>
  )
}
