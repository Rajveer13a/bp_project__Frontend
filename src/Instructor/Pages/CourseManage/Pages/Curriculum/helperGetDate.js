const date = new Date();

const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with '0' if needed
const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
const year = date.getFullYear(); // Get the full year

const formattedDate = `${day}/${month}/${year}`;
export default formattedDate