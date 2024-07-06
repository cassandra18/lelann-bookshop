
// Function to check password strength
function isPasswordStrong(password) {
    // Check minimum length
    if (password.length < 8) {
        return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return false;
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
        return false;
    }

    // check for special characters
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        return false;
    }

    // All checks passed, password is considered strong
    return true;
}

module.exports = { isPasswordStrong };