import { useCallback, useEffect, useState } from "react"

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback((text: string) => {
    if (navigator.clipboard) {
      setIsCopied(true)
      void navigator.clipboard.writeText(text)
    }
  }, [])

  useEffect(() => {
    if (isCopied) {
      const timeout = setTimeout(() => {
        setIsCopied(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [isCopied])

  return { isCopied, copyToClipboard }
}
