import { SiteHeader } from "@/components/site-header"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="scroll-smooth">{children}</main>
    </>
  )
}
