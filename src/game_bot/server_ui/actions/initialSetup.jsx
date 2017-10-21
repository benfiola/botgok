

export class InitialSetup {
    static AUTHORIZE_STEP_ONE = "InitialSetup::AUTHORIZE_STEP_ONE";
    static authorizeStepOne(enteredPassword) {
        return {
            type: this.AUTHORIZE_STEP_ONE,
            enteredPassword: enteredPassword
        }
    }

    static AUTHORIZE_STEP_ONE_COMPLETE = "InitialSetup::AUTHORIZE_STEP_ONE_COMPLETE";
    static authorizeStepOneComplete(temporaryAccessToken) {
        return {
            type: this.AUTHORIZE_STEP_ONE_COMPLETE,
            temporaryAccessToken: temporaryAccessToken
        }
    }

    static AUTHORIZE_STEP_TWO = "InitialSetup::AUTHORIZE_STEP_TWO";
    static authorizeStepTwo(enteredUsername, enteredPassword, temporaryAccessToken) {
        return {
            type: this.AUTHORIZE_STEP_TWO,
            enteredUsername: enteredUsername,
            enteredPassword: enteredPassword,
            temporaryAccessToken: temporaryAccessToken
        }
    }

    static INITIALIZE_STEP_ONE = "InitialSetup::INITIALIZE_STEP_ONE";
    static initializeStepOne() {
        return {
            type: this.INITIALIZE_STEP_ONE
        }
    }

    static INITIALIZE_STEP_ONE_COMPLETE = "InitialSetup::INITIALIZE_STEP_ONE_COMPLETE";
    static initializeStepOneComplete(temporaryPasswordFile) {
        return {
            type: this.INITIALIZE_STEP_ONE_COMPLETE,
            temporaryPasswordFile: temporaryPasswordFile
        }
    }

    static INITIALIZE_STEP_ONE_ERROR = "InitialSetup::INITIALIZE_STEP_ONE_ERROR";
    static initializeStepOneError(error) {
        return {
            type: this.INITIALIZE_STEP_ONE_ERROR,
            error: error
        }
    }

    static INITIALIZE_STEP_TWO = "InitialSetup::INITIALIZE_STEP_TWO";
    static initializeStepTwo() {
        return {
            type: this.INITIALIZE_STEP_TWO
        }
    }

    static INITIALIZE_STEP_TWO_ERROR = "InitialSetup::INITIALIZE_STEP_TWO_ERROR";
    static initializeStepTwoError(error) {
        return {
            type: this.INITIALIZE_STEP_TWO_ERROR,
            error: error
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