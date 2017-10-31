export { InitialSetup } from './initialSetup.jsx';
export { Auth } from './auth.jsx';
export { User } from './user.jsx';
export { Plugins } from './plugins.jsx';

export function createErrorFromResponse(response) {
    return Error(`Request to ${response.url} failed with status code ${response.status}`);
}