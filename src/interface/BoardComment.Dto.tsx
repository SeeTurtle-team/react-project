export interface BoardCommentDto{
    boardComment_id: number;
    boardComment_contents: string;
    boardComment_dateTime: Date;
    boardComment_isDeleted: boolean;
    boardComment_isModitied: boolean;
    user_nickname: string;
    boardId: number;
    userId: number;
}