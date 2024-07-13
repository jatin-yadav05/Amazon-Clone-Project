export function calculateDate(date){
    const dateObj = new Date(date);
    const options = { month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate;
}

export function calculateDateWithDay(date){
    const dateObj = new Date(date);
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', options);
    return formattedDate;    
}