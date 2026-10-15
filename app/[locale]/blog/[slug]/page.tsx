import { notFound, permanentRedirect } from "next/navigation"
import { getPostBySlug } from "@/lib/blog/server"

export default async function BlogPostRedirect({ params }: { params: Promise<{ locale: "en" | "pt-BR"; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()
  permanentRedirect(`/${locale}/${post.contentType === "essay" ? "ensaios" : "laboratorio"}/${slug}`)
}
