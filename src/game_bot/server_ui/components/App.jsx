import React from 'react';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { DashboardContainer } from '../containers/Dashboard/DashboardContainer.jsx';
import { LoginContainer } from '../containers/Login/LoginContainer.jsx';
import { Loading } from './Loading/Loading.jsx';
import { PropSwitch, PropRoute, Fade } from './Shared/index.jsx';
import styles from './App.css';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.transitionTimeout = 500;
    }

    componentDidMount() {
        this.props.onCreate();
    }

    render() {
        return (
            <div>
                <Fade in={this.props.loading == null || this.props.loading} timeout={this.transitionTimeout} unmountOnExit={true}>
                    <Loading />
                </Fade>
                <Fade in={!this.props.loading} timeout={this.transitionTimeout}>
                    <PropSwitch>
                        <PropRoute key={"initialSetup"} path={"/initialSetup"} component={InitialSetup}/>
                        <PropRoute key={"dashboard"} path={"/dashboard"} component={DashboardContainer}/>
                        <PropRoute key={"login"} path={"/login"} component={LoginContainer}/>
                    </PropSwitch>
                </Fade>
            </div>
        );
    }
}

