export interface Blog{
    id:string,
    name:string,
    img:string,
    explanation:string,
    keywords: string[],
    metaExplanation:string
    minute:number
}

export interface Comments{
    id:string,
    name:string,
    mail:string,
    content:string
    commentDate:string
    blogId:string
}