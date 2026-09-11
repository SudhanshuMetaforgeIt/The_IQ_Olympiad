"use client";

import { useState, useEffect, useCallback } from "react";

const SIDEBAR_STORAGE_KEY = "student_sidebar_open";
const SIDEBAR_EVENT_NAME = "student_sidebar_toggle";

export function useStudentSidebar() {
  const [isOpen, setIsOpenState] = useState<boolean>(true);

  useEffect(() => {
    // Determine initial state: respect localStorage if set, else open on desktop, closed on mobile
    const isMobile = window.innerWidth < 768;
    const saved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (saved !== null) {
      setIsOpenState(saved === "true");
    } else {
      setIsOpenState(!isMobile);
    }

    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen?: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isOpen === "boolean") {
        setIsOpenState(customEvent.detail.isOpen);
      } else {
        const currentSaved = localStorage.getItem(SIDEBAR_STORAGE_KEY);
        setIsOpenState(currentSaved === "true");
      }
    };

    window.addEventListener(SIDEBAR_EVENT_NAME, handleSync);
    return () => window.removeEventListener(SIDEBAR_EVENT_NAME, handleSync);
  }, []);

  const setIsOpen = useCallback((open: boolean) => {
    setIsOpenState(open);
    if (typeof window !== "undefined") {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
      window.dispatchEvent(
        new CustomEvent(SIDEBAR_EVENT_NAME, { detail: { isOpen: open } })
      );
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsOpenState((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
        window.dispatchEvent(
          new CustomEvent(SIDEBAR_EVENT_NAME, { detail: { isOpen: next } })
        );
      }
      return next;
    });
  }, []);

  return { isOpen, setIsOpen, toggleSidebar };
}
