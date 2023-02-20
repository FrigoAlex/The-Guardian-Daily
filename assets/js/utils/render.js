import { formatDate } from "./dateconverter.js";

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

export const reactiveNews = (news) => {
    const newsElements = news.map((newChild) => {
    return renderNews(newChild);
});
const newsCont = document.querySelector(".news-cont");
renderCleaner(newsCont);
newsElements.forEach(element => {
    newsCont.appendChild(element);
}); 
}