import { setupI18n } from "@lingui/core";

export const defaultLocale = "fr";

export const locales = {
  fr: "Français",
  nl: "Nederland"
}

function loadCatalog(locale) {
    return import(/* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
        `./locales/${locale}/messages.js`);
}

export const i18n = setupI18n();
i18n.willActivate(loadCatalog);
i18n.activate(defaultLocale);
