
export class Login {
    static ON_CREATE = "Login::ON_CREATE";
    static onCreate() {
        return {
            type: this.ON_CREATE
        }
    }

    static AUTHORIZE = "Login::AUTHORIZE";
    static authorize(enteredUsername, enteredPassword) {
        return {
            type: this.AUTHORIZE,
            enteredUsername: enteredUsername,
            enteredPassword: enteredPassword
        }
    }
}