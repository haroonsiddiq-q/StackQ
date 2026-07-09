"use client";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.dispatchEvent(new Event("cursor:refresh"));
  }, []);

  return (
    <div className="h-[100rem]"></div>
  );
}
