import {lang, pageSize, q} from "./inputElements.js";
import { Noticia } from "./classnews.js";
import { reactiveNews } from "./render.js";
import {saveStorage, getStoreElements} from "./store.js";

const compareParams = async (paramName, newParam) => {
    const params = getStoreElements(["lang", "q", "page-size"]);
    if (params[paramName]!== newParam) {
        params[paramName] = newParam;
        reactiveNews((await Noticia.fetchNoticias(params)).noticias);
        saveStorage(params);
    }
};

    lang.oninput = async (event) => {
    compareParams("lang", event.target.value.trim());
}
    pageSize.oninput = async (event) => {
    compareParams("page-size", event.target.value.trim());
}
    q.oninput = async (event) => {
    compareParams("q", event.target.value.trim());
}


