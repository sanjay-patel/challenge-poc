export class User {
    constructor(
        public id: number,
        public name: string,
        public dateOfBirth: string,
        public email: string,
        public status: string,
        public hourlyRate: number
    ) { }
}
