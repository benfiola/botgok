import { createErrorFromResponse } from './index.jsx';


export class Plugins {
    static getPlugins(access_token) {
        return fetch(
            '/api/v1/plugins',
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `JWT ${access_token}`
                }
            }
        ).then((response)=>{
            if(response.ok) {
                return response.json();
            }
            throw createErrorFromResponse(response);
        }).then((json)=>{
            console.log(json);
            return json.result;
        })
    }
}