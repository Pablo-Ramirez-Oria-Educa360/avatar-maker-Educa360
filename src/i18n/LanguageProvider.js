import React, { useEffect, useRef, useState } from "react";
import I18nContext, { LANG_STORAGE_KEY, detectInitialLanguage } from "./I18nContext";
import { DEFAULT_LANG, cachePack, loadPack, normalizeLang } from "./loaders";
import { createTranslator } from "./t";

let initialPacks = {};

try {
  // eslint-disable-next-line global-require
  const defaultPack = require("./lang/en.json");
  cachePack(DEFAULT_LANG, defaultPack);
  initialPacks = { [DEFAULT_LANG]: defaultPack };
} catch (error) {
  // eslint-disable-next-line no-console
  console.error("Unable to load default language pack", error);
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLanguage());
  const [packs, setPacks] = useState(initialPacks);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const normalized = normalizeLang(lang);

    loadPack(normalized)
      .then(pack => {
        cachePack(normalized, pack);
        if (!isMounted.current) {
          return;
        }
        setPacks(current => ({
          ...current,
          [normalized]: pack
        }));
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error("Failed to set language pack", error);
      });
  }, [lang]);

  const translator = createTranslator(lang, packs);

  const handleSetLanguage = nextLang => {
    const normalized = normalizeLang(nextLang);

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        window.localStorage.setItem(LANG_STORAGE_KEY, normalized);
      } catch (err) {
        // ignore storage failures
      }
    }

    setLang(normalized);
  };

  return (
    <I18nContext.Provider value={{ lang, setLanguage: handleSetLanguage, t: translator }}>
      {children}
    </I18nContext.Provider>
  );
}
