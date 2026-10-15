import { permanentRedirect } from "next/navigation"

// The old blog was folded into the editorial area. Keep old links alive.
export default async function BlogRedirect({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  permanentRedirect(`/${locale}/laboratorio`)
}
