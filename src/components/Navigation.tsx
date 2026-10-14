"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const darkMode =
      savedDarkMode !== null
        ? savedDarkMode === "true"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTimeout(() => {
      setIsDark(darkMode);
    }, 0);

    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navItems = [
    { name: "Work", href: "#featured" },
    { name: "How I Work", href: "#how-i-work" },
    { name: "Projects", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
  ];

  const scrollToSection = (href: string) => {
    setIsOpen(false);

    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const navHeight = 48;
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 100);
  };

  // 맨 위(파란 히어로 위)에서는 글자·아이콘을 흰색으로
  const onHero = !scrolled && !isOpen;

  return (
    <nav
      aria-label="주요 내비게이션"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-sm dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="container-max-width section-padding">
        <div className="flex items-center justify-between h-12">
          <button
            className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity rounded-md"
            onClick={() => scrollToSection("#hero")}
            aria-label="WhyBusyy 홈으로 이동"
          >
            <Image
              src="/logo.png"
              alt=""
              width={28}
              height={28}
              className="rounded-full dark:invert"
              aria-hidden="true"
            />
            <span className={`font-semibold text-sm tracking-tight ${onHero ? "text-white" : "text-slate-900 dark:text-white"}`}>
              WhyBusyy
            </span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-xs transition-colors cursor-pointer ${
                  onHero
                    ? "text-white/80 hover:text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            <button
              onClick={toggleDarkMode}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className={`w-4 h-4 transition-colors ${onHero ? "text-white" : "text-slate-400 hover:text-white"}`} aria-hidden="true" />
              ) : (
                <Moon className={`w-4 h-4 transition-colors ${onHero ? "text-white" : "text-slate-500 hover:text-slate-900"}`} aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className={`w-4 h-4 ${onHero ? "text-white" : "text-slate-400"}`} aria-hidden="true" />
              ) : (
                <Moon className={`w-4 h-4 ${onHero ? "text-white" : "text-slate-500"}`} aria-hidden="true" />
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isOpen ? (
                <X className="w-4 h-4 text-slate-600 dark:text-slate-400" aria-hidden="true" />
              ) : (
                <Menu className={`w-4 h-4 ${onHero ? "text-white" : "text-slate-600 dark:text-slate-400"}`} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl"
          >
            <div className="section-padding py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-2.5 px-3 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
