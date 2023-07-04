export const dateFormatFunc = (date:any) => {
    const stringToDate = new Date(date);
   
    const boardDate = `${stringToDate.getFullYear()}년 ${stringToDate.getMonth()+1}월 ${stringToDate.getDate()}일`
    return boardDate;
  }