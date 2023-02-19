import { Noticia } from "./utils/classnews.js";
import { renderNews } from "./utils/render.js";

const getNews = await Noticia.fetchNoticias({
    lang: "",
    q: "",
    "page-size": 10,
    page: 1,
});
    const newsElements = getNews.map((news) => {
        return renderNews(news);
});
const newsCont = document.querySelector(".news-cont");
console.log(newsCont)
newsElements.forEach(element => {
    newsCont.appendChild(element);
});
