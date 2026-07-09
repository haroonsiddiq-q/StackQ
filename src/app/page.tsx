"use client";
import { useEffect } from "react";
import { Home } from "@/app/components/layout/home";
import { About } from "@/app/components/layout/about";
import { Project } from "@/app/components/layout/project";
import { Education } from "@/app/components/layout/education";
import { Contact } from "@/app/components/layout/contact";

export default function Page() {
  useEffect(() => {
    window.dispatchEvent(new Event("cursor:refresh"));
  }, []);

  const baseClassMain = "h-screen overflow-hidden"

  return (
    <main className="mx-auto">
      <section id="home" className={baseClassMain}>
        <Home />
      </section>
      <section id="about" className={baseClassMain}>
        <About />
      </section>
      <section id="project" className={`${baseClassMain} bg-card`}>
        <Project />
      </section>
      <section id="education" className={baseClassMain}>
        <Education />
      </section>
      <section id="contact" className={baseClassMain}>
        <Contact />
      </section>
    </main>
  );
}
