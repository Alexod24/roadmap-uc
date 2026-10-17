import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roadmap Académico: Matemática Discreta 2 | Universidad Continental",
  description: "Roadmap táctico de supervivencia y excelencia académica para Matemática Discreta 2 (UC). Enfoque 80/20, primeros principios, trampas típicas y preparación de hitos evaluativos C1, EP, C2 y EF.",
};

import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0f12] text-zinc-100 dark:bg-[#0d0f12] dark:text-zinc-100">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
