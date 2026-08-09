export const checkValidData = (email, password) => {
    const isEmailValid =
        /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const isPasswordValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    const isNameValid =
        /^[A-Za-z]+(?:[-'][A-Za-z]+)*$/.test(name);

    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is not valid"
    if (!isNameValid) return "Enter a valid name"

    return null
}