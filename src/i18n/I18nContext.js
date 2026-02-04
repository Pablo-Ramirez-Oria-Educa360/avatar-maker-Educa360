import React from "react";
import { DEFAULT_LANG, normalizeLang } from "./loaders";

export const LANG_STORAGE_KEY = "lang";

function getStoredLanguage() {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  try {
    return window.localStorage.getItem(LANG_STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function getQueryLanguage() {
  if (typeof window === "undefined" || !window.location) {
    return null;
  }

  const query = window.location.search;
  if (!query) {
    return null;
  }

  const params = new URLSearchParams(query);
  return params.get("lang");
}

function getNavigatorLanguage() {
  if (typeof navigator === "undefined") {
    return null;
  }

  return (navigator.languages && navigator.languages[0]) || navigator.language || null;
}

export function detectInitialLanguage() {
  const stored = getStoredLanguage();
  if (stored) {
    return normalizeLang(stored);
  }

  const queryLang = getQueryLanguage();
  if (queryLang) {
    return normalizeLang(queryLang);
  }

  const navigatorLang = getNavigatorLanguage();
  if (navigatorLang) {
    return normalizeLang(navigatorLang);
  }

  return DEFAULT_LANG;
}

const I18nContext = React.createContext({
  lang: DEFAULT_LANG,
  setLanguage: () => {},
  t: (key, values, fallbackText) => (typeof fallbackText === "string" ? fallbackText : key)
});

export default I18nContext;
