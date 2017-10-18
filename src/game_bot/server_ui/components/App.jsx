import React from 'react';
import { Route } from 'react-router';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { Dashboard } from './Dashboard/Dashboard.jsx';
import { Login } from './Login/Login.jsx';
import { NavigationContainer } from '../containers/NavigationContainer.jsx';

export class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return [
            <NavigationContainer />,
            <Route path={"/initialSetup"} component={InitialSetup}/>,
            <Route path={"/dashboard"} component={Dashboard}/>,
            <Route path={"/login"} component={Login}/>,
        ]
    }
}