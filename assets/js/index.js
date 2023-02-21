import { Noticia } from "./utils/classnews.js";
import { lang, pageSize, q } from "./utils/inputElements.js";
import { reactiveNews, renderLoader } from "./utils/render.js";
import "./utils/filters.js";
import {saveStorage, isStore} from "./utils/store.js";


const params = {
    lang: isStore("lang")||"",
    q: isStore("q")||"",
    "page-size": Number(isStore("page-size")||10),
    page: 1
};

lang.value = params.lang;
pageSize.value = params["page-size"];
q.value = params.q;

saveStorage(params);

renderLoader(async () => {
    reactiveNews(await Noticia.fetchNoticias(params));
});