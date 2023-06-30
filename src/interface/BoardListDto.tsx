export interface Board {
    board_id: number;
    board_title: string;
    board_contents: string;
    board_dateTime: Date;
    board_isDeleted: boolean;
    board_isModified: boolean;
    board_recommend: number;
    user_nickname: string;
    boardCategoryId: number;
}