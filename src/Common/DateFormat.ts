export const dateFormatFunc = (date:any) => {
    const stringToDate = new Date(date);
    let month = (stringToDate.getMonth() + 1).toString();
    let day = stringToDate.getDate().toString();
    let hour = stringToDate.getHours().toString();
    let minute = stringToDate.getMinutes().toString();

    month = Number(month) >= 10 ? month : '0' + month;
    day = Number(day) >= 10 ? day : '0' + day;
    hour = Number(hour) >= 10 ? hour : '0' + hour;
    minute = Number(minute) >= 10 ? minute : '0' + minute;

    const boardDate = `${stringToDate.getFullYear().toString().substring(2, 4)}-${month}-${day} ${hour}:${minute}`
    return boardDate;
  }