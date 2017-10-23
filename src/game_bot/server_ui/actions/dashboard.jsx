

export class Dashboard {
    static ON_CREATE = "Dashboard::ON_CREATE";
    static onCreate() {
        return {
            type: this.ON_CREATE
        }
    }
}