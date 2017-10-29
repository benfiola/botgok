import { takeLatest, put, call } from 'redux-saga/effects';
import { Dashboard as Actions, App as AppActions } from '../actions/index.jsx';
import { Plugins as PluginsAPI } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/AuthTokenStore.jsx';
import { tokenCheck, logout } from './auth.jsx';
import { redirect } from './app.jsx';

export function* onCreate() {
    const validToken = yield* tokenCheck();
    if(!validToken) {
        return;
    }
    yield put(AppActions.setLoading(false));
}

export function* onLogout() {
    yield* logout();
    yield* redirect("/login");
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
    yield takeLatest(Actions.ON_LOGOUT, onLogout);
}