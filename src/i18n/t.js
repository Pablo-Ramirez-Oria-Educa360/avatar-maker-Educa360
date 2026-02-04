import { DEFAULT_LANG } from "./loaders";

function interpolate(template, values) {
  if (!template || !values) {
    return template;
  }

  return Object.keys(values).reduce((acc, placeholder) => {
    const pattern = new RegExp(`\\{${placeholder}\\}`, "g");
    const replacement = values[placeholder] !== undefined && values[placeholder] !== null ? String(values[placeholder]) : "";
    return acc.replace(pattern, replacement);
  }, template);
}

function resolveFromPack(pack, key) {
  if (!pack || typeof pack !== "object") {
    return undefined;
  }

  return pack[key];
}

export function createTranslator(lang, packs, fallbackLang = DEFAULT_LANG) {
  return (key, values, fallbackText) => {
    if (!key) {
      return "";
    }

    const activePack = packs[lang];
    const defaultPack = packs[fallbackLang];

    let raw = resolveFromPack(activePack, key);

    if (raw == null && lang !== fallbackLang) {
      raw = resolveFromPack(defaultPack, key);
    }

    if (raw == null) {
      raw = typeof fallbackText === "string" ? fallbackText : key;
    }

    if (typeof raw !== "string") {
      return raw;
    }

    return interpolate(raw, values);
  };
}
