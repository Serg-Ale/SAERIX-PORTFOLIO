// Renders the two full-story variants of the DEV landing on the /dev route. C is
// the default page; B (scenes) is kept behind ?variant=B until it is removed.

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
