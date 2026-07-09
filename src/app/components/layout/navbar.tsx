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

export function Navbar() {
    const [hoveredPath, setHoveredPath] = useState<string | null>(null);

    return (
        <nav className="sticky top-2 z-50 w-full">
            <div className="relative mx-auto flex items-center justify-center px-4">

                <div className="p-2 border border-border bg-card rounded-full">
                    <div className="flex items-center font-medium">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onMouseEnter={() => setHoveredPath(link.href)}
                                onMouseLeave={() => setHoveredPath(null)}
                                className={`uppercase relative px-4 py-2 rounded-full transition-colors duration-300 ${
                                    hoveredPath === link.href ? "text-card" : "text-text"
                                }`}
                            >
                                <span className="relative z-10">{link.label}</span>

                                <AnimatePresence>
                                    {hoveredPath === link.href && (
                                        <motion.div
                                            layoutId="navbar-pill"
                                            className="absolute inset-0 z-0 rounded-full bg-text"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                opacity: { duration: 0.15, ease: "easeInOut" },
                                                layout: {
                                                    type: "tween",
                                                    ease: [0.25, 0.1, 0.25, 1],
                                                    duration: 0.4,
                                                },
                                            }}
                                        />
                                    )}
                                </AnimatePresence>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="absolute right-2">
                    <ThemeToggle />
                </div>

            </div>
        </nav>
    );
}