

export class InitialSetup {
    static AUTHORIZE_TEMPORARY_PASSWORD = "InitialSetup::AUTHORIZE_TEMPORARY_PASSWORD";
    static authorizeTemporaryPassword(enteredPassword) {
        return {
            type: this.AUTHORIZE_TEMPORARY_PASSWORD,
            enteredPassword: enteredPassword
        }
    }

    static CREATE_FIRST_ADMIN_ACCOUNT = "InitialSetup::CREATE_FIRST_ADMIN_ACCOUNT";
    static createFirstAdminAccount(enteredUsername, enteredPassword) {
        return {
            type: this.CREATE_FIRST_ADMIN_ACCOUNT,
            enteredUsername: enteredUsername,
            enteredPassword: enteredPassword
        }
    }

    static TEMPORARY_PASSWORD_ON_CREATE = "InitialSetup::TEMPORARY_PASSWORD_ON_CREATE";
    static temporaryPasswordOnCreate() {
        return {
            type: this.TEMPORARY_PASSWORD_ON_CREATE
        }
    }

    static CREATE_ADMIN_ACCOUNT_ON_CREATE = "InitialSetup::CREATE_ADMIN_ACCOUNT_ON_CREATE";
    static createAdminAccountOnCreate() {
        return {
            type: this.CREATE_ADMIN_ACCOUNT_ON_CREATE
        }
    }

    static RECEIVE_TEMPORARY_PASSWORD_FILE = "InitialSetup::RECEIVE_TEMPORARY_PASSWORD_FILE";
    static receiveTemporaryPasswordFile(temporaryPasswordFile) {
        return {
            type: this.RECEIVE_TEMPORARY_PASSWORD_FILE,
            temporaryPasswordFile: temporaryPasswordFile
        }
    }
}