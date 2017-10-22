import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { AppContainer } from './containers/AppContainer.jsx';
import { reducers } from './reducers/index.jsx';
import { sagas } from './sagas/index.jsx';

import 'whatwg-fetch';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(
            sagaMiddleware,
            routerMiddleware(history)
        )
    )
);

sagaMiddleware.run(sagas);
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('container')
);