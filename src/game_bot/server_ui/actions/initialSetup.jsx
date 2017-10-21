

export class InitialSetup {
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
    static initializeError(error) {
        return {
            type: this.INITIALIZE_STEP_ONE_ERROR,
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