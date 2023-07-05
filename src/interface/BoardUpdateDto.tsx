export interface BoardUpdateDto{
    id : number;
    title : string;
    contents : string;
    dateTime : Date;
    userId: number;
    boaardCategoryId: number;
    recommendCount: number;
}