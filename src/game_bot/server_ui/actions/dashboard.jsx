

export class Dashboard {
    static ON_CREATE = "Dashboard::ON_CREATE";
    static onCreate() {
        return {
            type: this.ON_CREATE
        }
    }

    static ON_LOGOUT = "Dashboard::ON_LOGOUT";
    static onLogout() {
        return {
            type: this.ON_LOGOUT
        }
    }
}