import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/routing"

const CONTACT = [
  { label: "GitHub", href: "https://github.com/Serg-Ale", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/serg-alexandre", external: true },
  { label: "Email", href: "mailto:sergioalexandre0716@gmail.com", external: false },
]

export async function EditorialFooter() {
  const t = await getTranslations("editorial")
  const tn = await getTranslations("nav")
  const year = new Date().getFullYear()

  return (
    <footer className="ed-footer">
      <div className="ed-wrap">
        <div className="ed-footer-grid">
          <div>
            <p className="ed-footer-name">Sérgio Alexandre</p>
            <p className="ed-footer-tag">{t("footer.tagline")}</p>
          </div>

          <nav aria-label={t("footer.read")}>
            <h2>{t("footer.read")}</h2>
            <ul>
              <li><Link href="/ensaios">{tn("essays").charAt(0) + tn("essays").slice(1).toLowerCase()}</Link></li>
              <li><Link href="/laboratorio">{tn("laboratory").charAt(0) + tn("laboratory").slice(1).toLowerCase()}</Link></li>
              <li><Link href="/dev">{t("navDev")}</Link></li>
            </ul>
          </nav>

          <nav aria-label={t("footer.contact")}>
            <h2>{t("footer.contact")}</h2>
            <ul>
              {CONTACT.map((item) => (
                <li key={item.label}>
                  <a href={item.href} {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="ed-footer-rights">© {year} {t("footer.rights")}</p>
      </div>
    </footer>
  )
}
