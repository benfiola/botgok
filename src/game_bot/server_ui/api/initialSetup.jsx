import { createErrorFromResponse } from "./index.jsx";

export class InitialSetup {
    static check() {
        return fetch(`/api/v1/initial_setup/check`).then((response) => {
            console.log("here");
            if(response.ok) {
                return response.json();
            }
            throw createErrorFromResponse(response);
        }).then((json)=>{
            return json.result;
        });
    }

    static initialize() {
        return fetch(`/api/v1/initial_setup/initialize`).then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw createErrorFromResponse(response);
        }).then((json)=>{
            return json.result;
        });
    }

    static create_admin_user(username, password) {
        return fetch(`/api/v1/initial_setup/create_admin_user`).then((response) => {
            if(! response.ok) {
                throw createErrorFromResponse(response);
            }
        })
    }
}