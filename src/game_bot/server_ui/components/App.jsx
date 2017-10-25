import React from 'react';
import { InitialSetup } from './InitialSetup/InitialSetup.jsx';
import { DashboardContainer } from '../containers/Dashboard/DashboardContainer.jsx';
import { LoginContainer } from '../containers/Login/LoginContainer.jsx';
import { Route } from 'react-router';
import { Switch, AnimationFactory } from './Shared/index.jsx';

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
                <Switch animation={AnimationFactory.SLIDE}>
                    <Route path={"/initialSetup"} component={InitialSetup}/>
                    <Route path={"/dashboard"} component={DashboardContainer}/>
                    <Route path={"/login"} component={LoginContainer}/>
                </Switch>
            </div>
        );
    }
}

