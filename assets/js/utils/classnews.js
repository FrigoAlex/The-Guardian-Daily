import { API_URL, API_KEY } from "./constants.js";

export class Noticia{
    constructor({
        id,
        type,
        sectionId,
        sectionName,
        webPublicationDate,
        webTitle,
        webUrl,
        apiUrl,
        fields:{headline,thumbnail},
        isHosted,
        pillarId,
        pillarName,
        tags:[{webTitle:author}]
    }){
        this.id=id;
        this.type=type;
        this.sectionId=sectionId;
        this.sectionName=sectionName;
        this.webPublicationDate=webPublicationDate;
        this.webTitle=webTitle;
        this.webUrl=webUrl;
        this.apiUrl=apiUrl;
        this.headline=headline;
        this.thumbnail=thumbnail?thumbnail:"/assets/img/Breaking news.png";
        this.isHosted=isHosted;
        this.pillarId=pillarId;
        this.pillarName=pillarName;
        this.author=author;
    
    }
    static async fetchNoticias(props){
    const keys=Object.keys(props)
    const query=keys.filter(key=>props[key]!="").map(key=>`${key}=${props[key]}`).join("&")
    const data= await fetch(`${API_URL}?${query}&api-key=${API_KEY}&format=json&show-fields=headline,thumbnail&show-tags=contributor`)
    const json=await data.json()
    const noticias=json.response.results.map(noticia=>new Noticia(noticia))
    return noticias
    }
}