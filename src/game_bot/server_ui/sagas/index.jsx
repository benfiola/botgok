import "regenerator-runtime/runtime";

import { sagas as initialSetupSagas } from './initialSetup.jsx';
import { sagas as loginSagas } from './login.jsx';
import { sagas as appSagas } from './app.jsx';

export function* sagas() {
    yield* initialSetupSagas();
    yield* appSagas();
    yield* loginSagas();
}