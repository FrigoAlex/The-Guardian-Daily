import { formatDate } from "./dateconverter.js";
import { Noticia } from "./classnews.js";
import { getStoreElements } from "./store.js";
import { arrowLeft, arrowRight, pagElementsUl, loaderCont, newsCont } from "./inputElements.js";

const nodeCreate = (element, className, Attribute, textContent) => {
    const nodeElement = document.createElement(element);
    nodeElement.classList.add(...className);
    nodeElement.textContent = textContent;
    Object.keys(Attribute).forEach(key => {
        nodeElement.setAttribute(key, Attribute[key]);
    });
    return nodeElement;
}

export const renderCleaner = (element) => {
    element.innerHTML = "";
}

export const renderNews = ({ author, headline, sectionName, thumbnail, webUrl, webPublicationDate }) => {
    const authorNode = nodeCreate("li", ["card-footer-element", "bi", "bi-person-fill"], {}, author);
    const headlineNode = nodeCreate("h4", ["card-title"], {}, headline);
    const sectionNameNode = nodeCreate("li", ["card-footer-element", "bi", "bi-folder-fill"], {}, sectionName);
    const thumbnailNode = nodeCreate("img", ["card-img"], { src: thumbnail, alt: "New image" }, "");
    const webUrlNode = nodeCreate("a", ["card-link"], { href: webUrl, target: "_blank" }, "");
    const webPublicationDateNode = nodeCreate("li", ["card-footer-element", "bi", "bi-calendar-event"], {}, formatDate(webPublicationDate));
    const cardNode = nodeCreate("div", ["card"], {}, "");
    const cardBodyNode = nodeCreate("div", ["card-body"], {}, "");
    const cardFooterNode = nodeCreate("div", ["card-footer"], {}, "");
    const cardFooterListNode = nodeCreate("ul", ["card-footer-list"], {}, "");
    cardFooterListNode.appendChild(authorNode);
    cardFooterListNode.appendChild(sectionNameNode);
    cardFooterListNode.appendChild(webPublicationDateNode);
    cardFooterNode.appendChild(cardFooterListNode);
    cardBodyNode.appendChild(headlineNode);
    cardNode.appendChild(thumbnailNode);
    cardNode.appendChild(cardBodyNode);
    cardNode.appendChild(cardFooterNode);
    cardNode.appendChild(webUrlNode);
    return cardNode;
}

const paginationActive = (totalPages, page, segments) => {
    const getPageData = (startIndex) => Array.from(
      { length: segments },
      (_, i) => ({
        page: startIndex + i,
        active: startIndex + i === page
      })
    );
  
    if (page == totalPages) {
      return getPageData(totalPages - segments + 1);
    } else if (page == 1) {
      return getPageData(1);
    } else {
      return getPageData(page - Math.floor(segments / 2));
    }
  };
  
export const renderPagination = (pages) => {
    const actualPage = Number(localStorage.getItem("page"));
    const pagesArray = paginationActive(pages, actualPage, 3);
    renderCleaner(pagElementsUl);
    pagesArray.forEach(({ page, active }) => {
      const pageElement = nodeCreate("li", ["pag-element"], {}, page);
      if (active) {
        pageElement.classList.add("pag-element-active");
      }
      pageElement.addEventListener("click", async () => {
        localStorage.setItem("page", page);
        reactiveNews(await Noticia.fetchNoticias(getStoreElements(["lang", "q", "page-size", "page"])));
      });
      pagElementsUl.appendChild(pageElement);
    });
    arrowLeft.onclick = async () => {
        localStorage.setItem("page", 1);
        reactiveNews(await Noticia.fetchNoticias(getStoreElements(["lang", "q", "page-size", "page"])));
    }
    arrowRight.onclick = async () => {
        localStorage.setItem("page", pages);
        reactiveNews(await Noticia.fetchNoticias(getStoreElements(["lang", "q", "page-size", "page"])));
    }
    if(actualPage==pages){
        arrowRight.classList.add("disabled");
    }else{
        arrowRight.classList.remove("disabled");
    }
        if(actualPage==1){
        arrowLeft.classList.add("disabled");
        }else{
        arrowLeft.classList.remove("disabled");
        }
};

export const reactiveNews = ({noticias:news, pages}) => {
    const newsElements = news.map((newChild) => {
    return renderNews(newChild);
});

renderCleaner(newsCont);
newsElements.forEach(element => {
    newsCont.appendChild(element);
}); 

renderPagination(pages);
}

export const renderLoader = async (callback) => {
    renderCleaner(newsCont);
    loaderCont.classList.remove("disabled");
    await callback();
    loaderCont.classList.add("disabled");
}