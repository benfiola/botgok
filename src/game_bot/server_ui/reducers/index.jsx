import { combineReducers } from 'redux';
import { initialSetup } from './initialSetup.jsx';
import { plugins } from './plugins.jsx';
import { routerReducer as routing } from 'react-router-redux';
import { app } from './app.jsx';

export const reducers = combineReducers({
    app,
    initialSetup,
    plugins,
    routing
});





