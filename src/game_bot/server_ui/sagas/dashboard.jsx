import { takeLatest, put, call } from 'redux-saga/effects';
import { Dashboard as Actions, App as AppActions } from '../actions/index.jsx';
import { tokenCheck } from './auth.jsx';
import { redirect } from './app.jsx';

export function* onCreate() {
    const validToken = yield* tokenCheck();
    if(!validToken) {
        yield* redirect("/login");
        return;
    }
    yield put(AppActions.setLoading(false));
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
}