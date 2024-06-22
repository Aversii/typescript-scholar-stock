export class UserValidator {
    public static validateName(name: string): void {
        if (!name || name.trim().length === 0 || name ==="") {
            throw new Error('Name cannot be empty.');
        }
        if (name.length < 3) {
            throw new Error('Name must be at least 3 characters long.');
        }
    }

    public static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            throw new Error('Invalid email format.');
        }
    }

    public static validatePassword(password: string): void {
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters long.');
        }
    }
}
