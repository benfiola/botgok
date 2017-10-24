import React from 'react';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { DashboardContainer } from '../containers/Dashboard/DashboardContainer.jsx';
import { LoginContainer } from '../containers/Login/LoginContainer.jsx';
import { Loading } from './Loading/Loading.jsx';
import { Fade } from 'react-bootstrap';
import { PropSwitch, PropRoute } from './Shared/index.jsx';
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
            <div>
                <Fade in={this.props.loading == null || this.props.loading} timeout={10000} unmountOnExit={true}>
                    <Loading />
                </Fade>
                <Fade in={!this.props.loading} timeout={10000}>
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

