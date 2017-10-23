import { InitialSetup as Actions, App as AppActions } from '../actions/index.jsx';
import { InitialSetup as API } from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { tokenCheck, authenticate } from './auth.jsx';
import { handleError, redirect } from './app.jsx';
import { call, put, takeLatest } from 'redux-saga/effects';

export function* temporaryPasswordOnCreate() {
    try {
        if(yield* performInitialSetupCheck()) {
            const temporaryFilePath = yield call(API.initialize);
            yield put(Actions.receiveTemporaryPasswordFile(temporaryFilePath));
            yield put(AppActions.setLoading(false));
        }
    } catch(error) {
        yield* handleError(error);
    }
}

export function* authorizeTemporaryPassword(action) {
    try {
        if(yield* performInitialSetupCheck()) {
            yield* authenticate("setup_user", action.enteredPassword);
            yield* redirect("/initialSetup/createAdminUser");
        }
    } catch(error) {
        yield* handleError(error);
    }
}

export function* createAdminAccountOnCreate() {
    try {
        if(yield* performInitialSetupCheck()) {
            const validToken = yield* tokenCheck();
            if(!validToken) {
                yield* redirect("/initialSetup/temporaryPassword");
                return ;
            }
            yield put(AppActions.setLoading(false));
        }
    } catch(error) {
        yield* handleError(error);
    }
}

export function* createFirstAdminAccount(action) {
    try {
        if(yield* performInitialSetupCheck()) {
            yield call(API.create_admin_user, AuthTokenStore.get(), action.enteredUsername, action.enteredPassword);
            yield* authenticate(action.enteredUsername, action.enteredPassword);
            yield* redirect("/dashboard");
        }
    } catch(error) {
        yield* handleError(error);
    }
}

export function* performInitialSetupCheck() {
    const value = yield call(API.check);
    if(!value) {
        yield* redirect("/login");
    }
    return value;
}

export function* sagas() {
    yield takeLatest(Actions.TEMPORARY_PASSWORD_ON_CREATE, temporaryPasswordOnCreate);
    yield takeLatest(Actions.AUTHORIZE_TEMPORARY_PASSWORD, authorizeTemporaryPassword);
    yield takeLatest(Actions.CREATE_ADMIN_ACCOUNT_ON_CREATE, createAdminAccountOnCreate);
    yield takeLatest(Actions.CREATE_FIRST_ADMIN_ACCOUNT, createFirstAdminAccount)
}