import React from 'react';
import { connect } from 'react-redux';
import { InitialSetup, DashboardContainer, LoginContainer, Switch, AnimationFactory } from './index.jsx';
import { App as Actions } from '../actions/index.jsx';
import { Route } from 'react-router';

export class AppComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onCreate();
    }

    render() {
        return (
            <div>
                <Switch animation={AnimationFactory.FADE}>
                    <Route path={"/initialSetup"} component={InitialSetup}/>
                    <Route path={"/dashboard"} component={DashboardContainer}/>
                    <Route path={"/login"} component={LoginContainer}/>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.app.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        }
    }
};

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppComponent);

