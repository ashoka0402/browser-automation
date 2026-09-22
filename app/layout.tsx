import { ClerkProvider } from "@clerk/nextjs"
import { shadcn } from "@clerk/ui/themes"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="dark font-sans antialiased"
    >
      <body>
        <ClerkProvider
         
          appearance={{ theme: shadcn }}
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          signInFallbackRedirectUrl="/dashboard"
  signUpFallbackRedirectUrl="/dashboard"
        >
          <ThemeProvider>
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
