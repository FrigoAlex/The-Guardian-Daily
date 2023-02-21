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
        tags
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
        this.thumbnail=thumbnail?thumbnail:"/assets/img/Breaking news.jpg";
        this.isHosted=isHosted;
        this.pillarId=pillarId;
        this.pillarName=pillarName;
        this.author=tags.length>0?tags[0].webTitle:"Unknown";
    
    }
    static async fetchNoticias(props){
    const keys=Object.keys(props)
    const query=keys.filter(key=>props[key]!="").map(key=>`${key}=${props[key]}`).join("&")
    const data= await fetch(`${API_URL}?${query}&api-key=${API_KEY}&format=json&show-fields=headline,thumbnail&show-tags=contributor`)
    const json=await data.json()
    const noticias=json.response.results.map(noticia=>new Noticia(noticia))
    return {noticias, pages:json.response.pages > 750 ? 750 : json.response.pages};
    }
}