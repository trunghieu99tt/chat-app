import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const useLang = () => {
    const { i18n } = useTranslation();
    const [lang, setLang] = useLocalStorage("lang", "en");

    useEffect(() => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
    }, [lang]);

    const changeLang = (lang: string) => {
        setLang(lang);
    }

    return {
        lang,
        changeLang
    }

}

export { useLang };