import { InitialSetup as Actions, Auth as AuthActions } from '../actions/index.jsx';
import { InitialSetup as API, Auth as AuthAPI } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* initializeInitialSetup() {
    try {
        yield put(Actions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const temporaryFilePath = yield call(API.initialize);
            yield put(Actions.receiveTemporaryPasswordFile(temporaryFilePath));
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(Actions.setLoading(false));
    }
}

export function* authorizeTemporaryPassword(action) {
    try {
        yield put(Actions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const accessToken = yield call(AuthAPI.authenticate, "setup_user", action.enteredPassword);
            AuthTokenStore.set(accessToken);
            yield put(push("/initialSetup/createAdminUser"));
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(Actions.setLoading(false));
    }
}

export function* performInitialSetupCheck() {
    const value = yield call(API.check);
    if(!value) {
        yield put(push("/login"));
    }
    return value;
}

export function* createFirstAdminAccount(action) {
    try {
        yield put(Actions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const accessToken = AuthTokenStore.get();
            yield call(API.create_admin_user, accessToken, action.enteredUsername, action.enteredPassword);
            yield put(push("/wizard/integrations"))
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(Actions.setLoading(false));
    }
}

export function* handleError(error) {
    yield put(Actions.initialSetupError(error));
}

export function* sagas() {
    yield takeLatest(Actions.INITIALIZE_INITIAL_SETUP, initializeInitialSetup);
    yield takeLatest(Actions.AUTHORIZE_TEMPORARY_PASSWORD, authorizeTemporaryPassword);
    yield takeLatest(Actions.INITIAL_SETUP_CHECK, performInitialSetupCheck);
    yield takeLatest(Actions.CREATE_FIRST_ADMIN_ACCOUNT, createFirstAdminAccount)
}