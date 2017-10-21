export { InitialSetup } from './initialSetup.jsx';

export function createErrorFromResponse(response) {
    return Error(`Request to ${response.url} failed with status code ${response.status}`);
}