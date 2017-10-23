import { takeLatest, put } from 'redux-saga/effects';
import { App as Actions } from '../actions/index.jsx';
import { push } from 'react-router-redux';

export function* onCreate() {
    //forcefully redirect to login on initial load
    yield* redirect("/login");
}

export function* handleError(error) {
    yield put(Actions.setError(error));
}

export function* redirect(page) {
    yield put(Actions.setLoading(true));
    yield put(push(page));
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
}