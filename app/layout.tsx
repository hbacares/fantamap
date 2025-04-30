import "./globals.css"
import { ReactNode } from "react"
import Providers from "@/components/providers"
import { Cinzel } from "next/font/google"

export const metadata = {
  title: "Fantasy Map Editor",
  description: "Create and explore fantasy worlds"
}

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cinzel.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}