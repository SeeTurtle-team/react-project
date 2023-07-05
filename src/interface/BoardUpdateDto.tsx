export interface BoardUpdateDto{
    id : number;
    title : string;
    contents : string;
    dateTime : Date;
    userId:number;
    boardCategoryId:number;
    recommendCount : string;
    nickname:string;
    category:string;
}