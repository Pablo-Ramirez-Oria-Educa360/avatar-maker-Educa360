const SUPPORTED_LANGS = ["en", "es"];
export const DEFAULT_LANG = "en";
const packCache = {};

export function normalizeLang(code) {
  if (!code || typeof code !== "string") {
    return DEFAULT_LANG;
  }

  const normalized = code.toLowerCase().split("-")[0];
  return SUPPORTED_LANGS.includes(normalized) ? normalized : DEFAULT_LANG;
}

export function loadPack(lang) {
  const normalized = normalizeLang(lang);

  if (packCache[normalized]) {
    return Promise.resolve(packCache[normalized]);
  }

  return import(/* webpackChunkName: "lang-[request]" */ `./lang/${normalized}.json`)
    .then(module => {
      const pack = module.default || module;
      packCache[normalized] = pack;
      return pack;
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error(`Unable to load language pack: ${normalized}`, error);
      if (normalized === DEFAULT_LANG) {
        throw error;
      }
      return loadPack(DEFAULT_LANG);
    });
}

export function cachePack(lang, pack) {
  packCache[normalizeLang(lang)] = pack;
}
