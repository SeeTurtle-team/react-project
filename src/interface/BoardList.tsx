export interface board {
    board_id: number;
    board_title: string;
    board_contents: string;
    board_dateTime: Date;
    board_isDeleted: boolean;
    board_isModified: boolean;
    board_recommand: number;
    user_nickname: string;
    boardCategoryId: number;
}