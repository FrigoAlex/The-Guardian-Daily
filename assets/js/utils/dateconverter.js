
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const formatDate = (date) => {
    const dataHour = new Date(date);
    const dataHourFormat = `${months[dataHour.getMonth()]} ${dataHour.getDate().toString().padStart(2, '0')}, ${dataHour.getFullYear()}`
    return dataHourFormat;
}