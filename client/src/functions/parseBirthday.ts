/**
 * User data has birthday formatted as a UNIX Timestamp. We need to display the birthday as mm/dd/yyy, 
 * so this function parses it into such format.
 * 
 * @param {birthday}: the user's birthday attribute. Expects a UNIX timestamp of type <string>
 * 
 */
function parseBirthday(birthday: string): string {
    const birthdayDate: Date = new Date(parseInt(birthday));

    const date: string = String(birthdayDate.getDate()).padStart(2, '0');

    // Date.getMonth() returns 0-based months. Need to add 1 to get correct month number.
    const month: string = String(birthdayDate.getMonth() + 1).padStart(2, '0');

    const year: number = birthdayDate.getFullYear();
    return `${month}/${date}/${year}`;
}

export default parseBirthday;