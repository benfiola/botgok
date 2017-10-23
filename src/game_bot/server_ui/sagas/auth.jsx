import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Auth as API } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { redirect } from './app.jsx';

export function* tokenCheck() {
    //helper function that validates our stored token.
    const authToken = AuthTokenStore.get();
    if(!authToken) {
        yield* redirect("/login");
        return false;
    }
    const validToken = yield call(API.validToken, authToken);
    if(!validToken) {
        yield* redirect("/login");
        return false;
    }
    return true;
}

export function* authenticate(username, password) {
    const accessToken = yield call(API.authenticate, username, password);
    AuthTokenStore.set(accessToken);
}

export function* logout() {
    AuthTokenStore.clear();
}