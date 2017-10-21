import { createErrorFromResponse } from "./index.jsx";

export class InitialSetup {
    static check() {
        return fetch(`/api/v1/initial_setup/check`).then((response) => {
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

    static create_admin_user(temporary_access_token, username, password) {
        return fetch(
            `/api/v1/initial_setup/create_admin_user`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${temporary_access_token}`
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                })
            }
        ).then((response) => {
            if(! response.ok) {
                throw createErrorFromResponse(response);
            }
        })
    }
}