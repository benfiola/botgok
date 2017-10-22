import React from 'react';
import { Route } from 'react-router';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { Dashboard } from './Dashboard/Dashboard.jsx';
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
        return [
            <Route key={"initialSetup"} path={"/initialSetup"} component={InitialSetup}/>,
            <Route key={"dashboard"} path={"/dashboard"} component={Dashboard}/>,
            <Route key={"login"} path={"/login"} component={LoginContainer}/>,
            <Fade in={this.props.loading} timeout={300} mountOnEnter={true} unmountOnExit={true}>
                <div className={styles.fadeOverlay}>

                </div>
            </Fade>
        ]
    }
}