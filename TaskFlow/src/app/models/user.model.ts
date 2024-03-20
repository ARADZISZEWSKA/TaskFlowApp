export class User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;

    constructor(email: string = '', password: string = '', firstName: string = '', lastName: string = '') {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }


    // Email validation
    isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    // Password validation (example: min 8 characters)
    isValidPassword(): boolean {
        return this.password.length >= 8;
    }

    // First and last name validation
    isValidName(): boolean {
        return this.firstName.trim().length > 0 && this.lastName.trim().length > 0;
    }

    // General validation that calls all other validation methods
    isValidUser(): boolean {
        return this.isValidEmail() && this.isValidPassword() && this.isValidName();
    }
}

