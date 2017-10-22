import { takeLatest, put } from 'redux-saga/effects';
import { App as Actions } from '../actions/index.jsx';
import { push } from 'react-router-redux';

export function* onCreate() {
    yield put(push("/login"))
}

export function* handleError(error) {
    yield put(Actions.setError(error));
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
}