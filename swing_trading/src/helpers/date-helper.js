//COnverting from millisceonds to seconds, tranforimg data that comes from FinnHub API
export const convertDateToUnixTimeStamp = (date) =>{
    date = new Date(date);
return Math.floor(date.getTime()/1000);
}

export const convertUnixTimeStampToDate = (unixTimeStamp) =>{
    const millisceonds = unixTimeStamp*1000;
    return new Date(millisceonds).toLocaleDateString();
    }

    export const creatDate = (date, days, weeks, months, years) =>
    {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days + 7*weeks);
        newDate.setDate(newDate.getMonth() + months);
        newDate.setDate(newDate.getFullYear() + years);
    };
//==================================


//====================================================================================================================================
