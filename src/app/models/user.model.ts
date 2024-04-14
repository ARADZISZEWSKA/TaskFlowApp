export class User {
    id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    roles: string[];
    projectIds: string[];

    constructor(id: string = '', email: string = '', password: string = '', firstName: string = '', lastName: string = '', roles: string[] = [], projectIds: string[] = []) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roles = roles;
        this.projectIds = projectIds;
    }

    passwordsMatch(confirmPassword: string): boolean {
        console.log(`Password: ${this.password}, ConfirmPassword: ${confirmPassword}`);
        return this.password === confirmPassword;
    }

    isValidEmail(): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email);
    }

    isValidPassword(): boolean {
        return this.password.length >= 8;
    }

    isValidName(): boolean {
        return this.firstName.trim().length > 0 && this.lastName.trim().length > 0;
    }

    isValidUser(): boolean {
        return this.isValidEmail() && this.isValidPassword() && this.isValidName();
    }
}
