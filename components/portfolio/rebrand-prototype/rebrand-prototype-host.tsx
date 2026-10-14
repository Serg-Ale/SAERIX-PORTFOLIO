// PROTOTYPE — throwaway. Two full-story variants of the new DEV landing (hero →
// cases → how I work → path → stack → own projects → contact), rendered on the
// existing /dev route and selected with ?variant=B|C. Variant A was discarded.

import type { ProtoLocale } from "./copy"
import { PrototypeSwitcher } from "./prototype-switcher"
import { VariantBScenes } from "./variant-b-scenes"
import { VariantCDecisionLog } from "./variant-c-decision-log"

export function RebrandPrototypeHost({ variant, locale }: { variant: "B" | "C"; locale: ProtoLocale }) {
  return (
    <>
      {variant === "B" && <VariantBScenes locale={locale} />}
      {variant === "C" && <VariantCDecisionLog locale={locale} />}
      <PrototypeSwitcher current={variant} />
    </>
  )
}
