import { Noticia } from "./utils/classnews.js";
import { reactiveNews } from "./utils/render.js";
import "./utils/filters.js";
import {saveStorage, isStore} from "./utils/store.js";


const params = {
    lang: isStore("lang")||"",
    q: isStore("q")||"",
    "page-size": Number(isStore("page-size")||10),
    page: 1,
};
saveStorage(params);

reactiveNews((await Noticia.fetchNoticias(params)).noticias);