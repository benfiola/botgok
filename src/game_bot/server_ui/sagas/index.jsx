import "regenerator-runtime/runtime";
import { sagas as initialSetupSagas } from './initialSetup.jsx';

export function* sagas() {
    yield initialSetupSagas();
}