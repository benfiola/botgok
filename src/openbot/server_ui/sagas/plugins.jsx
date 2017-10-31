import { Plugins as Actions, App as AppActions } from '../actions/index.jsx';
import { Plugins as API } from '../api/index.jsx';
import { call, takeLatest, put} from 'redux-saga/effects';
import { AuthTokenStore } from '../utils/index.jsx';
import { tokenCheck } from './auth.jsx';

export function* onCreate() {
    const validToken = yield* tokenCheck();
    if(!validToken) {
        return;
    }
    const plugins = yield call(API.getPlugins, AuthTokenStore.get())
    yield put(Actions.receivePlugins(plugins));
    yield put(AppActions.setLoading(false));
}

export function* sagas() {
    yield takeLatest(Actions.ON_CREATE, onCreate);
}