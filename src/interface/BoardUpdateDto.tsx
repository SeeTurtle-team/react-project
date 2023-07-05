export interface BoardUpdateDto{
    id : number;
    title : string;
    contents : string;
    ban : boolean;
    dateTime : Date;
    isDeleted : boolean;
    isModified : boolean;
    recommend : number;

}