"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/app/components/ui/theme-toggle";

const NAV_LINKS = [
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export function VerticalNavbar() {
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    return (
        <nav className="fixed inset-y-0 right-4 z-50 flex items-center">
            <div className="bg-card border-12 border-slash">
                <div className="flex flex-col items-end text-xs">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            onMouseEnter={() => setHoveredPath(link.href)}
                            onMouseLeave={() => setHoveredPath(null)}
                            className={`uppercase relative px-4 py-2 rounded-full transition-colors duration-300 ${hoveredPath === link.href ? "text-card" : "text-text"
                                }`}
                        >
                            <span className="relative z-10">{link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="absolute right-0 top-2">
                <ThemeToggle />
            </div>
        </nav>
    );
}