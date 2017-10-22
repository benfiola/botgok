import "regenerator-runtime/runtime";

import { sagas as initialSetupSagas } from './initialSetup.jsx';
import { sagas as authSagas } from './auth.jsx';

export function* sagas() {
    yield* initialSetupSagas();
    yield* authSagas();
}