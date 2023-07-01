export const dateFormatFunc = (date:any) => {
    const stringToDate = new Date(date);
    
    const boardDate = `${stringToDate.getFullYear()}년 ${stringToDate.getMonth()}월 ${stringToDate.getDay()}일`
    return boardDate;
  }