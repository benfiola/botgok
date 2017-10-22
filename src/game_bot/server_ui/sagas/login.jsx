import { takeLatest, put, call } from 'redux-saga/effects';
import { Login as Actions } from '../actions/index.jsx';
import { Auth as AuthAPI} from '../api/index.jsx';
import { AuthTokenStore } from '../utils/index.jsx';
import { push } from 'react-router-redux';
import { tokenCheck } from './auth.jsx';
import { handleError } from './app.jsx';
import { performInitialSetupCheck } from './initialSetup.jsx';

export function* onCreate() {
    const needsInitialSetup = yield* performInitialSetupCheck();
    if(needsInitialSetup) {
        yield put(push("/initialSetup/temporaryPassword"));
        return;
    }
    const validToken = yield* tokenCheck();
    if(validToken) {
        yield put(push("/dashboard"));
    }
}

export function* authorize(action) {
    try {
        yield put(Actions.setLoading(true));
        const accessToken = yield call(AuthAPI.authenticate, action.enteredUsername, action.enteredPassword);
        AuthTokenStore.set(accessToken);
        yield put(push("/dashboard"));
    } catch(error) {
        yield* handleError(error);
    } finally {
        yield put(Actions.setLoading(false));
    }
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
    yield takeLatest(Actions.AUTHORIZE,  authorize);
}