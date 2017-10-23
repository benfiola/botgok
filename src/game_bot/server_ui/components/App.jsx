import React from 'react';
import { Route, Switch } from 'react-router';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { DashboardContainer } from '../containers/Dashboard/DashboardContainer.jsx';
import { LoginContainer } from '../containers/Login/LoginContainer.jsx';
import { Fade } from 'react-bootstrap';
import styles from './App.css';

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onCreate();
    }

    render() {
        return (
            <Fade key={"fader"} in={!this.props.loading} timeout={10000}>
                <div>
                    <Switch>
                        <Route key={"initialSetup"} path={"/initialSetup"} component={InitialSetup}/>
                        <Route key={"dashboard"} path={"/dashboard"} component={DashboardContainer}/>
                        <Route key={"login"} path={"/login"} component={LoginContainer}/>
                    </Switch>
                </div>
            </Fade>
        );
    }
}