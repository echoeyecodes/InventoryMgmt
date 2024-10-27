"use client";

import i18next, { FlatNamespace, KeyPrefix } from "i18next";
import { useEffect, useState, useCallback } from "react";
import {
  FallbackNs,
  initReactI18next,
  useTranslation as _useTranslation,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";
import { getOptions, supportedLngs } from "./options";

i18next.use(initReactI18next).init({
  ...(getOptions() as any),
  preload: supportedLngs,
});

export function useTranslation<
  Ns extends FlatNamespace,
  KPrefix extends KeyPrefix<FallbackNs<Ns>> = undefined
>(
  namespace?: Ns,
  options?: UseTranslationOptions<KPrefix>
): UseTranslationResponse<FallbackNs<Ns>, KPrefix> {
  const ret = _useTranslation(namespace, options);
  const { i18n } = ret;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (activeLng === i18n.resolvedLanguage) return;
    setActiveLng(i18n.resolvedLanguage);
  }, [activeLng, i18n.resolvedLanguage]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (i18n.resolvedLanguage) return;
    i18n.changeLanguage(i18n.resolvedLanguage);
  }, [i18n.resolvedLanguage, i18n]);

  return ret;
}

export function useChangeLanguage() {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(
    (lng: string) => {
      if (supportedLngs.includes(lng)) {
        console.log("changing language to", lng);
        i18n.changeLanguage(lng);
      }
    },
    [i18n]
  );

  return changeLanguage;
}

export default i18next;
