"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

// next-themes 0.4.6 intentionally renders a small inline bootstrap script.
// React 19 / Next.js 16 reports that as a dev-only warning even though the
// script is needed for the anti-FOUC theme initialization. Suppress only this
// known message; keep every other console.error untouched.
if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
  const consoleWithThemePatch = console as typeof console & {
    __themeScriptWarningPatched?: boolean
  }

  if (!consoleWithThemePatch.__themeScriptWarningPatched) {
    const originalError = console.error
    console.error = (...args: Parameters<typeof console.error>) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("Encountered a script tag while rendering React component")
      ) {
        return
      }
      originalError(...args)
    }
    consoleWithThemePatch.__themeScriptWarningPatched = true
  }
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}


export { ThemeProvider }