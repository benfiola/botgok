

export class AuthTokenStore {
    static KEY = "_openBot_accessToken";

    static get() {
        return window.sessionStorage.getItem(this.KEY);
    }

    static set(authToken) {
        window.sessionStorage.setItem(this.KEY, authToken);
    }

    static clear() {
        window.sessionStorage.removeItem(this.KEY);
    }
}