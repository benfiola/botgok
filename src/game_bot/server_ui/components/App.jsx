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
        this.onEnter = this.onEnter.bind(this);
        this.onExit = this.onExit.bind(this);
    }

    componentDidMount() {
        this.props.onCreate();
    }

    onEnter(){
        console.log("enter");
    }

    onExit() {
        console.log("exit");
    }

    render() {
        return (
            <Fade key={"fader"} onEntering={this.onEnter} onExiting={this.onExit} in={!this.props.loading} timeout={10000}>
                <Switch>
                    <Route key={"initialSetup"} path={"/initialSetup"} component={InitialSetup}/>
                    <Route key={"dashboard"} path={"/dashboard"} component={DashboardContainer}/>
                    <Route key={"login"} path={"/login"} component={LoginContainer}/>
                </Switch>
            </Fade>
        );
    }
}

