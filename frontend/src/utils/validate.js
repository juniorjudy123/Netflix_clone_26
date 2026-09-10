export const checkValidData = (username, password) => {
    if (!username.trim()) return "Username is required";

    const isPasswordValid =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if (!isPasswordValid) return "Password is not valid";

    return null;
}