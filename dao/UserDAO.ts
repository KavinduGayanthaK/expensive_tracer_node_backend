export default class UserDAO {
    id: string;
    username: string; // Fixed typo
    password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
}
