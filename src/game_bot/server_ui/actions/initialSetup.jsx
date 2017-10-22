

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

    static INITIALIZE_INITIAL_SETUP = "InitialSetup::INITIALIZE_INITIAL_SETUP";
    static initializeInitialSetup() {
        return {
            type: this.INITIALIZE_INITIAL_SETUP
        }
    }

    static RECEIVE_TEMPORARY_PASSWORD_FILE = "InitialSetup::RECEIVE_TEMPORARY_PASSWORD_FILE";
    static receiveTemporaryPasswordFile(temporaryPasswordFile) {
        return {
            type: this.RECEIVE_TEMPORARY_PASSWORD_FILE,
            temporaryPasswordFile: temporaryPasswordFile
        }
    }

    static INITIAL_SETUP_ERROR = "InitialSetup::INITIAL_SETUP_ERROR";
    static initialSetupError(error) {
        return {
            type: this.INITIAL_SETUP_ERROR,
            error: error
        }
    }

    static INITIAL_SETUP_CHECK = "InitialSetup::INITIAL_SETUP_CHECK ";
    static performInitialSetupCheck() {
        return {
            type: this.INITIAL_SETUP_CHECK
        }
    }

    static SET_LOADING = "InitialSetup::SET_LOADING";
    static setLoading(value) {
        return {
            type: this.SET_LOADING,
            value: value
        }
    }
}