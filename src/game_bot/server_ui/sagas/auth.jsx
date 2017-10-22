import { put, call, takeLatest } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { Auth as API } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';

export function* tokenCheck() {
    const authToken = AuthTokenStore.get();
    if(!authToken) {
        yield put(push("/login"));
    }
    const validToken = yield call(API.validToken, authToken);
    if(!validToken) {
        yield put(push("/login"));
    }
    return authToken && validToken;
}