import React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createBrowserHistory';
import { Route } from 'react-router';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';

import { TestComponent } from './components/TestComponent.jsx';
import { reducers } from './reducers/index.jsx';

const history = createHistory();
const store = createStore(
    reducers,
    applyMiddleware(
        createSagaMiddleware(),
        routerMiddleware(history)
    )
);

console.log(ConnectedRouter);
render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <TestComponent />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('container')
);