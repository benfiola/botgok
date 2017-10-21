import React from 'react';
import { Route } from 'react-router';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { Dashboard } from './Dashboard/Dashboard.jsx';
import { Login } from './Login/Login.jsx';
import styles from './App.css';

export class App extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return [
            <Route key={"initialSetup"} path={"/initialSetup"} component={InitialSetup}/>,
            <Route key={"dashboard"} path={"/dashboard"} component={Dashboard}/>,
            <Route key={"login"} path={"/login"} component={Login}/>,
        ]
    }
}