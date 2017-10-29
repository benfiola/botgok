import { createErrorFromResponse } from './index.jsx';

export class User {
    static create(access_token, username, password, admin) {
        fetch(
            '/app_api/v1/user',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access_token}`
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    admin: admin
                })
            }
        ).then((response)=>{
            if(!response.ok) {
                throw createErrorFromResponse(response);
            }
        })
    }
}