export interface BoardUpdateDto{
    id : number;
    title : string;
    contents : string;
    ban : boolean;
    dateTime : string;
    isDeleted : boolean;
    isModified : boolean;
    recommend : number;

}