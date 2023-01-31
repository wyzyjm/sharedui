import React from "react";
import { useEffect, useState } from "react";
import { IntlProvider, useIntl, WrappedComponentProps } from "react-intl";
import { SharedComponentsContext } from "../../components/core/SharedComponentsContext";
import messagesCs from '../../translations/cs/clientResources.json';
import messagesDe from '../../translations/de/clientResources.json';
import messagesEn from '../../translations/en/clientResources.json';
import messagesEs from '../../translations/es/clientResources.json';
import messagesFr from '../../translations/fr/clientResources.json';
import messagesHu from '../../translations/hu/clientResources.json';
import messagesId from '../../translations/id/clientResources.json';
import messagesIt from '../../translations/it/clientResources.json';
import messagesJa from '../../translations/ja/clientResources.json';
import messagesKo from '../../translations/ko/clientResources.json';
import messagesNl from '../../translations/nl/clientResources.json';
import messagesPl from '../../translations/pl/clientResources.json';
import messagesPtBr from '../../translations/pt-BR/clientResources.json';
import messagesPtPt from '../../translations/pt-PT/clientResources.json';
import messagesRu from '../../translations/ru/clientResources.json';
import messagesSv from '../../translations/sv/clientResources.json';
import messagesTr from '../../translations/tr/clientResources.json';
import messagesZhHans from '../../translations/zh-Hans/clientResources.json';
import messagesZhHant from '../../translations/zh-Hant/clientResources.json';
import { INTL } from "../../util/intlUtil";

export const DefaultLocalizationLanguage = getLocaleName(navigator?.languages[0] || navigator.language || "en-US");

const LocalizedMessages = {
  "cs": messagesCs,
  "de": messagesDe,
  "en": messagesEn,
  "es": messagesEs,
  "fr": messagesFr,
  "hu": messagesHu,
  "id": messagesId,
  "it": messagesIt,
  "ja": messagesJa,
  "ko": messagesKo,
  "nl": messagesNl,
  "pl": messagesPl,
  "pt-BR": messagesPtBr,
  "pt-PT": messagesPtPt,
  "ru": messagesRu,
  "sv": messagesSv,
  "tr": messagesTr,
  "zh-Hans": messagesZhHans,
  "zh-Hant": messagesZhHant
}

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
  LocalizationMessages = (LocalizedMessages as any)[folderName];
};

export const useLocalization = () => {
  const [locale, setLocale] = useState(DefaultLocalizationLanguage);
  const [messages, setMessages] = useState(LocalizationMessages);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    initializeLocale(locale);
  }, []);

  const initializeLocale = (locale: string) => {
    if (!messages && locale) {
      try {
        changeMessages(locale);
        setMessages(LocalizationMessages);
      } catch (e: any) { }

      setIsInitialized(true);
    } else if (messages && locale) {
      setIsInitialized(true);
    }
  };

  const changeLocale = (nextLocale: string) => {
    if (nextLocale !== locale) {
      changeMessages(nextLocale);
      setMessages(LocalizationMessages);
      setLocale(nextLocale);
    }
  };

  return { locale, messages, isInitialized, changeLocale };
};

export function withLocalization<P>(WrappedComponent: React.FunctionComponent<P>): React.FunctionComponent<P> {
  return (props: P) => {
    const localeProperties = useLocalization();
    const sharedComponentsContext = React.useContext(SharedComponentsContext);
    if (sharedComponentsContext) {
      // sharedComponentsContext would be null if the SharedComponentsContext is not used as an ancestor.
      const locale = sharedComponentsContext.locale;

      if (localeProperties.locale !== locale) {
        localeProperties.changeLocale(locale);
      }
    } else {
      console.warn("SharedComponentsContext.Provider is not used as an ancestor for shared components. This would prevent localization in the shared components.");
    }

    return localeProperties.isInitialized ? (<><IntlProvider locale={localeProperties.locale} messages={localeProperties.messages} textComponent="span">
      <WrappedComponent {...props} />
    </IntlProvider></>) : (<></>);
  };
}

export function initializeComponent<P>(WrappedComponent: React.FunctionComponent<P>): React.FunctionComponent<P> {
  return (props: P) => {
    const intl = useIntl();
    INTL.setIntl(intl);

    return (<WrappedComponent {...props} />);
  };
};