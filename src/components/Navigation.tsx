"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const darkMode = savedDarkMode !== null ? savedDarkMode === "true" : true;
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
    { name: "About", href: "#about" },
    { name: "Work", href: "#work" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "How I Work", href: "#how-i-work" },
    { name: "Contact", href: "#contact" },
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl shadow-sm dark:shadow-none"
          : "bg-transparent"
      }`}
    >
      <div className="container-max-width section-padding">
        <div className="flex items-center justify-between h-12">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 cursor-pointer hover:opacity-60 transition-opacity"
            onClick={() => scrollToSection("#hero")}
          >
            <Image
              src="/logo.png"
              alt="WhyBusyy"
              width={28}
              height={28}
              className="rounded-full dark:invert"
            />
            <span className="font-semibold text-sm tracking-tight text-slate-900 dark:text-white">
              WhyBusyy
            </span>
          </motion.button>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onClick={() => scrollToSection(item.href)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                {item.name}
              </motion.button>
            ))}

            {/* Resume download button */}
            <motion.a
              href="/resume.pdf"
              download
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium
                         text-slate-500 dark:text-slate-400
                         hover:text-slate-900 dark:hover:text-white
                         rounded-full border border-slate-200 dark:border-white/[0.08]
                         hover:border-slate-300 dark:hover:border-white/[0.15]
                         transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </motion.a>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={toggleDarkMode}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-slate-400 hover:text-white transition-colors" />
              ) : (
                <Moon className="w-4 h-4 text-slate-500 hover:text-slate-900 transition-colors" />
              )}
            </motion.button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={toggleDarkMode}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-slate-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-500" />
              )}
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isOpen ? (
                <X className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              ) : (
                <Menu className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white/95 dark:bg-dark-bg/95 backdrop-blur-xl"
          >
            <div className="section-padding py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left py-2.5 px-3 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                >
                  {item.name}
                </motion.button>
              ))}

              {/* Mobile resume download */}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: navItems.length * 0.05 }}
                className="flex items-center gap-2 w-full py-2.5 px-3 text-sm
                           text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                이력서 다운로드
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
