import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quiz App - Test Your Tech Knowledge",
  description: "Interactive quiz application for various technology stacks",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="bg-gray-900 text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              Developed by <span className="font-semibold text-blue-400">Pavitra Kopuru</span> • Year 2025
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
