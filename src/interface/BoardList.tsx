    // export interface board {
    //     title: string;
    //     contents: string;
    //     userId: number;
    //     recommand: number;
    //     dateTime: Date;
    //     boardCategoryId: string;
    //     nickname: string;
    //     img: string;
    //   }

      

    export interface board {
        board_title: string;
        board_dateTime: Date;
        board_isDeleted: boolean;
        board_isModified: boolean;
        board_recommand: number;
        user_nickname: string;
        boardCategoryId: number;
    }