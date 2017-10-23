
export class App {
    static ON_CREATE = "App::ON_CREATE";
    static onCreate() {
        return {
            type: this.ON_CREATE
        }
    }

    static SET_LOADING = "App::SET_LOADING";
    static setLoading(value) {
        console.log(`setting loading to ${value}`);
        return {
            type: this.SET_LOADING,
            value: value
        }
    }

    static SET_ERROR = "App::SET_ERROR";
    static setError(error) {
        return {
            type: this.SET_ERROR,
            error: error
        }
    }
}