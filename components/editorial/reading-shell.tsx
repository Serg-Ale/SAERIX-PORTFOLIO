"use client"

import { useCallback, useEffect, useState, type ReactNode } from "react"
import { useTranslations } from "next-intl"

type Panels = { left: boolean; right: boolean }
const STORAGE_KEY = "ed-panels-v2"

function Chevron({ flip }: { flip: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M12 4l-6 6 6 6" />
    </svg>
  )
}

/**
 * Three-column reading layout whose side panels collapse to give the text the whole stage.
 * State is remembered per browser; the `f` key toggles both at once.
 */
export function ReadingShell({ props, rail, children }: { props: ReactNode; rail: ReactNode; children: ReactNode }) {
  const t = useTranslations("editorial")
  const [panels, setPanels] = useState<Panels>({ left: false, right: true })

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null")
      if (saved && typeof saved.left === "boolean" && typeof saved.right === "boolean") setPanels(saved)
    } catch {
      /* storage unavailable: stay open */
    }
  }, [])

  const update = useCallback((next: Panels) => {
    setPanels(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "f" || event.metaKey || event.ctrlKey || event.altKey) return
      const target = event.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      const focus = panels.left || panels.right
      update({ left: !focus, right: !focus })
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [panels, update])

  return (
    <div className="ed-article" data-left={panels.left ? "open" : "closed"} data-right={panels.right ? "open" : "closed"}>
      <button
        type="button"
        className="ed-tab ed-tab-left"
        aria-expanded={panels.left}
        aria-controls="ed-col-left"
        title={t("focusHint")}
        onClick={() => update({ ...panels, left: !panels.left })}
      >
        <Chevron flip={!panels.left} />
        <span>{t("tabProps")}</span>
      </button>
      <button
        type="button"
        className="ed-tab ed-tab-right"
        aria-expanded={panels.right}
        aria-controls="ed-col-right"
        title={t("focusHint")}
        onClick={() => update({ ...panels, right: !panels.right })}
      >
        <span>{t("tabNav")}</span>
        <Chevron flip={panels.right} />
      </button>

      <button
        type="button"
        className="ed-focus-hint"
        aria-pressed={!panels.left && !panels.right}
        onClick={() => {
          const focus = panels.left || panels.right
          update({ left: !focus, right: !focus })
        }}
      >
        <kbd>F</kbd>
        <span>{panels.left || panels.right ? t("focus") : t("focusExit")}</span>
      </button>

      <div id="ed-col-left" className="ed-col ed-col-left" inert={!panels.left} aria-hidden={!panels.left}>
        {props}
      </div>
      {children}
      <div id="ed-col-right" className="ed-col ed-col-right" inert={!panels.right} aria-hidden={!panels.right}>
        {rail}
      </div>
    </div>
  )
}
