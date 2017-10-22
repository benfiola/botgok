import { InitialSetup as Actions, App as AppActions } from '../actions/index.jsx';
import { InitialSetup as API, Auth as AuthAPI } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { tokenCheck } from './auth.jsx';
import { handleError } from './app.jsx';
import { push } from 'react-router-redux';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* temporaryPasswordOnCreate() {
    try {
        yield put(AppActions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const temporaryFilePath = yield call(API.initialize);
            yield put(Actions.receiveTemporaryPasswordFile(temporaryFilePath));
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(AppActions.setLoading(false));
    }
}

export function* authorizeTemporaryPassword(action) {
    try {
        yield put(AppActions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const accessToken = yield call(AuthAPI.authenticate, "setup_user", action.enteredPassword);
            AuthTokenStore.set(accessToken);
            yield put(push("/initialSetup/createAdminUser"));
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(AppActions.setLoading(false));
    }
}

export function* createAdminAccountOnCreate() {
    try {
        yield put(AppActions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const validToken = yield* tokenCheck();
            if(!validToken) {
                yield put(push("/initialSetup/temporaryPassword"));
            }
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(AppActions.setLoading(false));
    }
}

export function* createFirstAdminAccount(action) {
    try {
        yield put(AppActions.setLoading(true));
        if(yield* performInitialSetupCheck()) {
            const accessToken = AuthTokenStore.get();
            yield call(API.create_admin_user, accessToken, action.enteredUsername, action.enteredPassword);
            const newAccessToken = yield call(AuthAPI.authenticate, "setup_user", action.enteredPassword);
            AuthTokenStore.set(newAccessToken);
            yield put(push("/dashboard"))
        }
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(AppActions.setLoading(false));
    }
}

export function* performInitialSetupCheck() {
    const value = yield call(API.check);
    if(!value) {
        yield put(push("/login"));
    }
    return value;
}

export function* sagas() {
    yield takeLatest(Actions.TEMPORARY_PASSWORD_ON_CREATE, temporaryPasswordOnCreate);
    yield takeLatest(Actions.AUTHORIZE_TEMPORARY_PASSWORD, authorizeTemporaryPassword);
    yield takeLatest(Actions.CREATE_ADMIN_ACCOUNT_ON_CREATE, createAdminAccountOnCreate);
    yield takeLatest(Actions.CREATE_FIRST_ADMIN_ACCOUNT, createFirstAdminAccount)
}