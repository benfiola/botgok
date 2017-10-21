import { InitialSetup as Actions } from '../actions/index.jsx';
import { InitialSetup as API } from '../api/index.jsx';
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

function* initializeStepOne() {
    const value = yield call(API.check);
    if(!value) {
        yield put(push("/login"));
        return;
    }
    yield put(Actions.setLoading(true));
    const temporaryFilePath = yield call(API.initialize);
    yield put(Actions.initializeStepOneComplete(temporaryFilePath));
    yield put(Actions.setLoading(false));
}

export function* sagas() {
    yield takeLatest(Actions.INITIALIZE_STEP_ONE, initializeStepOne);
}