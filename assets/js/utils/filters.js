import {lang, pageSize, q} from "./inputElements.js";
import { debounceTimer } from "./constants.js";
import { debounce } from "./debounce.js";
import { Noticia } from "./classnews.js";
import { reactiveNews } from "./render.js";
import {saveStorage, getStoreElements} from "./store.js";

const reactiveNewsDebounce = debounce(reactiveNews, debounceTimer);


const compareParams = async (paramName, newParam) => {
    const params = getStoreElements(["lang", "q", "page-size", "page"]);
    if (params[paramName]!== newParam) {
        params[paramName] = newParam;
        params.page = 1;
        saveStorage(params);
        reactiveNewsDebounce((await Noticia.fetchNoticias(params)));   
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


