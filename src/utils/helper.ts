const formatNumber = (value: any) => {
    return (value && (value as number).toLocaleString("en-US")) || "0";
};

const randomDate = (start: any, end: any, startHour: any, endHour: any) => {
    var date = new Date(+start + Math.random() * (end - start));
    var hour = (startHour + Math.random() * (endHour - startHour)) | 0;
    date.setHours(hour);
    return date;
};

const getDaysDiffBetweenDates = (date1: Date, date2: Date) => {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24));
}

const urlify = (text: string) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>')
}

const isEqual = (objA: any, objB: any) => JSON.stringify(objA) === JSON.stringify(objB);



export { formatNumber, randomDate, getDaysDiffBetweenDates, urlify, isEqual };
