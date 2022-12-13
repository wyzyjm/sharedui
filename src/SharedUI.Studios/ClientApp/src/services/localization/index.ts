import { useEffect, useState } from "react";

export const DefaultLocalizationLanguage = getLocaleName(navigator?.languages[0] || navigator.language || "en-US");

function getLocaleName(localeString: string) {
  const locale = localeString.toLowerCase();
  let localeStandard = locale;
  if (locale.indexOf("-") > 0) {
    localeStandard = locale.substr(0, locale.indexOf("-"));
  }

  let localeName = "en";
  switch (localeStandard) {
    case "cs":
      localeName = "cs";
      break;
    case "de":
      localeName = "de";
      break;
    case "en":
      localeName = "en";
      break;
    case "es":
      localeName = "es";
      break;
    case "fr":
      localeName = "fr";
      break;
    case "hu":
      localeName = "hu";
      break;
    case "it":
      localeName = "it";
      break;
    case "ja":
      localeName = "ja";
      break;
    case "ko":
      localeName = "ko";
      break;
    case "nl":
      localeName = "nl";
      break;
    case "pl":
      localeName = "pl";
      break;
    case "pt":
      if (locale == "pt-br") {
        localeName = "pt-BR";
      } else {
        localeName = "pt-PT";
      }
      break;
    case "ru":
      localeName = "ru";
      break;
    case "sv":
      localeName = "sv";
      break;
    case "tr":
      localeName = "tr";
      break;
    case "zh":
      if (locale == "zh-hant" || locale == "zh-tw" || locale == "zh-hk") {
        localeName = "zh-Hant";
      } else {
        localeName = "zh-Hans";
      }
      break;
    default:
      localeName = "en";
      break;
  }

  return localeName;
}

let LocalizationMessages: any = undefined;

const changeMessages = async (localeCode: string) => {
  if (!localeCode) {
    return;
  }

  let folderName = getLocaleName(localeCode);
  LocalizationMessages = await import(
    `../../translations/${folderName}/clientResources.json`
  );
};

export const useLocalization = () => {
  const [locale, setLocale] = useState(DefaultLocalizationLanguage);
  const [messages, setMessages] = useState(LocalizationMessages);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeLocale(locale);
  }, []);

  const initializeLocale = async (locale: string) => {
    if (!messages && locale) {
      try {
        await changeMessages(locale);
        setMessages(LocalizationMessages);
      } catch (e: any) { }

      setIsInitialized(true);
    }
  };

  const changeLocale = async (nextLocale: string) => {
    if (nextLocale) {
      await changeMessages(nextLocale);
      setMessages(LocalizationMessages);
      setLocale(nextLocale);
    }
  };

  return { locale, messages, isInitialized, changeLocale };
};