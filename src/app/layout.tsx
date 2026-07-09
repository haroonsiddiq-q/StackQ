import type { Metadata } from "next";
import CustomCursor from "@/app/components/ui/custom-cursor";
import { CustomScrollbar } from "@/app/components/ui/custom-scrollbar";
import { ThemeProvider } from "@/app/components/ui/theme-provider";
import { Navbar } from "@/app/components/layout/navbar";
import { VerticalNavbar } from "@/app/components/layout/vertical-navbar";
import "./globals.css";

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
      <body className="bg-background text-text antialiased transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CustomCursor />
          <CustomScrollbar />
          
          {/* <Navbar /> */}
          <VerticalNavbar />
          
          <main className="mx-auto">
            {children}
          </main>
          
        </ThemeProvider>
      </body>
    </html>
  );
}