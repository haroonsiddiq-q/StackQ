import type { Metadata } from "next";
import { Press_Start_2P, Inter } from "next/font/google";
import CustomCursor from "@/app/components/ui/custom-cursor";
import { CustomScrollbar } from "@/app/components/ui/custom-scrollbar";
import { ThemeProvider } from "@/app/components/ui/theme-provider";
import { Navbar } from "@/app/components/layout/navbar";
import "./globals.css";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});
 
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "StackQ - Portfolio",
  description: "Full-Stack Engineering Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${pressStart2P.variable} ${inter.variable} bg-background text-text antialiased transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <CustomScrollbar />

          <Navbar />

          {children}

        </ThemeProvider>
      </body>
    </html>
  );
}