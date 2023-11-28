export class AccordeonUserData {
    firstName: string;
    city: string;
    email: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.city = obj ? obj.city : '';
        this.email = obj ? obj.email : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            city: this.city,
            email: this.email
        }
    }
}
