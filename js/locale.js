const defaultLocale = "en";
const supportedLocales = ["en", "hu"];

let locale;
let translations = {};

document.addEventListener("DOMContentLoaded", () => {
    const initialLocale = supportedOrDefault(browserLocales(true));
    
    setLocale(initialLocale);
    bindLocaleSwitcher(initialLocale);
});

function isSupported(locale) {
return supportedLocales.indexOf(locale) > -1;
}

function supportedOrDefault(locales) {
return locales.find(isSupported) || defaultLocale;
}

function browserLocales(languageCodeOnly = false) {
return navigator.languages.map((locale) =>
    languageCodeOnly ? locale.split("-")[0] : locale,
);
}

async function setLocale(newLocale) {
    if (newLocale === locale) return;
    const newTranslations =
        await fetchTranslationsFor(newLocale);
    locale = newLocale;
    translations = newTranslations;
    translatePage();
}

async function fetchTranslationsFor(newLocale) {
    const response = await fetch(`/lang/${newLocale}.json`);
    return await response.json();
}

function translatePage() {
    document
        .querySelectorAll("[data-i18n-key]")
        .forEach(translateElement);
}

function translateElement(element) {
    const key = element.getAttribute("data-i18n-key");
    const translation = translations[key];
    element.innerHTML = translation;
}

function bindLocaleSwitcher(initialValue) {
    const switcher = document.querySelector("[data-i18n-switcher]");
    const radioButtons = switcher.querySelectorAll("input[name='locale']");
    switcher.value = initialValue;
    radioButtons.forEach(radio => {
        if (radio.value === initialValue) {
            radio.checked = true;
        }
    });
    switcher.onchange = (e) => {
        setLocale(e.target.value);
    };
}