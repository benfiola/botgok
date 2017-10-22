import { createErrorFromResponse } from './index.jsx';

export class Auth {
    static authenticate(username, password) {
        return fetch(
            '/auth',
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        'username': username,
                        'password': password
                })
            }
        ).then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw createErrorFromResponse(response);
        }).then((json) => {
            return json.access_token;
        })
    }

    static validToken(accessToken) {
        return fetch(
            '/api/v1/auth/logged_in',
            {
                method: 'GET',
                headers: {
                    "Authorization": `JWT ${accessToken}`
                }
            }
        ).then((response) => {
            return response.ok;
        })
    }
}