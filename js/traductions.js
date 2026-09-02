let language = localStorage.getItem("language") || "en"

const languageInputs = {
    es: $("#language-es"),
    en: $("#language-en"),
    ca: $("#language-ca")
}

const traductions = {
    es: {
        main_title: "Lista de la compra",
        language: "Idioma",
        save: "Guardar",
        by_author: "Por Jesús Ameller",
        add: "Añadir",
        product: "Producto",
        english: "Inglés",
        spanish: "Español",
        catalan: "Catalán",
        configuration: "Configuración",
        share: "Compartir",
        link: "Enlace de tu lista!",
        copy: "Copiar",
        copiedSuccessfully: "Se ha copiado correctamente",
        noProducts: "No hay productos",
        savedSuccessfully: "Guardado correctamente",
    },
    en: {
        main_title: "Groceries List",
        language: "Language",
        save: "Save",
        by_author: "By Jesús Ameller",
        add: "Add",
        product: "Product",
        english: "English",
        spanish: "Spanish",
        catalan: "Catalan",
        configuration: "Configuration",
        share: "Share",
        link: "Link of your list!",
        copy: "Copy",
        copiedSuccessfully: "It has been copied correctly",
        noProducts: "There are no products",
        savedSuccessfully: "Saved successfully",
    },
    ca: {
        main_title: "Llista de la compra",
        language: "Idioma",
        save: "Desar",
        by_author: "Per Jesús Ameller",
        add: "Afegir",
        product: "Producte",
        english: "Inglés",
        spanish: "Espanyol",
        catalan: "Català",
        configuration: "Configuració",
        share: "Compartir",
        link: "Enllaç de la teva llista!",
        copy: "Copiar",
        copiedSuccessfully: "S'ha copiat correctament",
        noProducts: "No hi ha productes",
        savedSuccessfully: "Guardat correctament",
    }
}

const getLanguage = () => navigator.language.split("-")[0];

const translate = (lang) => {

    lang = lang || language || getLanguage() || "en";

    Object.keys(languageInputs).forEach(tag => {
        let el = languageInputs[tag];
        el.checked = tag === lang
    })

    $$("[translate]").forEach(el => {
        let key = el.attributes.getNamedItem("translate").nodeValue
        let value = traductions[lang][key];

        if (el.tagName === "INPUT") el.placeholder = value;
        else el.textContent = value;
    });

    language = lang
    save();
}