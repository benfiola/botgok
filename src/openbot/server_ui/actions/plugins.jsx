

export class Plugins {
    static ON_CREATE = "Plugins::ON_CREATE";
    static onCreate() {
        return {
            type: this.ON_CREATE
        }
    }

    static RECEIVE_PLUGINS = "Plugins::RECEIVE_PLUGINS";
    static receivePlugins(plugins) {
        return {
            type: this.RECEIVE_PLUGINS,
            plugins: plugins
        }
    }
}