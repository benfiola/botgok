import { combineReducers } from 'redux';
import { initialSetup } from './initialSetup.jsx';
import { routerReducer as router } from 'react-router-redux';

export const reducers = combineReducers({
    initialSetup,
    router
});

