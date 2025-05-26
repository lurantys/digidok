import { useState, useEffect } from "react";

const LANG_KEY = "digidok-lang";
const DEFAULT_LANG = "en";

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
  });

  useEffect(() => {
    localStorage.setItem(LANG_KEY, language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fr" : "en"));
  };

  return { language, setLanguage, toggleLanguage };
} 