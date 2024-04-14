export class User {
    id: string;
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    role: string;
    projectIds: string[];

    constructor(id: string = '', email: string = '', password: string = '', confirmPassword: string = '', firstName: string = '', lastName: string = '', role: string="", projectIds: string[] = []) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.projectIds = projectIds;
    }

    get name(): string {
        return `${this.firstName} ${this.lastName}`;
    }
    
    passwordsMatch(): boolean {
        console.log(`Password: ${this.password}, ConfirmPassword: ${this.confirmPassword}`);
        return this.password === this.confirmPassword;
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
