import { permanentRedirect } from "next/navigation"

// The old standalone page was replaced by the /dev portfolio.
export default async function Redirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/dev`)
}
