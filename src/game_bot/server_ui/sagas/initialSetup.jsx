import { InitialSetup as Actions } from '../actions/index.jsx';
import { InitialSetup as API, Auth as AuthAPI } from '../api/index.jsx';
import Cookies from 'universal-cookie';
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* initializeStepOne() {
    try {
        const value = yield call(API.check);
        if(!value) {
            yield put(push("/login"));
            return;
        }
        yield put(Actions.setLoading(true));
        const temporaryFilePath = yield call(API.initialize);
        yield put(Actions.initializeStepOneComplete(temporaryFilePath));
    } catch(error) {

    } finally {
        yield put(Actions.setLoading(false));
    }
}

export function* authorizeStepOne(action) {
    try {
        const value = yield call(API.check);
        if(!value) {
            yield put(push("/login"));
            return;
        }
        const accessToken = yield call(AuthAPI.authenticate, "setup_user", action.enteredPassword);
        yield put(Actions.authorizeStepOneComplete(accessToken));
        yield put(push("/initialSetup/createAdminUser"));
    } catch(error) {
        console.log(error);
    }
}

export function* initializeStepTwo() {
    try {
        const value = yield call(API.check);
        if (!value) {
            yield put(push("/login"));
            return;
        }
    } catch(error) {

    } finally {

    }
}

export function* authorizeStepTwo(action) {
    try {
        const value = yield call(API.check);
        if (!value) {
            yield put(push("/login"));
            return;
        }
        yield call(API.create_admin_user, action.temporaryAccessToken, action.enteredUsername, action.enteredPassword);
        yield put(push("/wizard/integrations"))
    } catch(error) {

    } finally {

    }
}

export function* sagas() {
    yield takeLatest(Actions.INITIALIZE_STEP_ONE, initializeStepOne);
    yield takeLatest(Actions.AUTHORIZE_STEP_ONE, authorizeStepOne);
    yield takeLatest(Actions.INITIALIZE_STEP_TWO, initializeStepTwo);
    yield takeLatest(Actions.AUTHORIZE_STEP_TWO, authorizeStepTwo)
}