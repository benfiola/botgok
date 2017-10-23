import { takeLatest, put, call } from 'redux-saga/effects';
import { Login as Actions, App as AppActions } from '../actions/index.jsx';
import { Auth as AuthAPI} from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { tokenCheck } from './auth.jsx';
import { handleError, redirect } from './app.jsx';
import { performInitialSetupCheck } from './initialSetup.jsx';

export function* onCreate() {
    const needsInitialSetup = yield* performInitialSetupCheck();
    if(needsInitialSetup) {
        yield* redirect("/initialSetup/temporaryPassword");
        return;
    }
    const validToken = yield* tokenCheck();
    if(validToken) {
        yield* redirect("/dashboard");
        return;
    }
    yield put(AppActions.setLoading(false));
}

export function* authorize(action) {
    try {
        const accessToken = yield call(AuthAPI.authenticate, action.enteredUsername, action.enteredPassword);
        AuthTokenStore.set(accessToken);
        yield* redirect("/dashboard");
    } catch(error) {
        yield* handleError(error);
    }
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
    yield takeLatest(Actions.AUTHORIZE,  authorize);
}