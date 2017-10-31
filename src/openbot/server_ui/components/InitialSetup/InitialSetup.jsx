import React from 'react';
import { Route } from 'react-router';
import { AnimationFactory, Switch, CreateAdminUserContainer, TemporaryPasswordContainer } from '../index.jsx';


export class InitialSetup extends React.Component {
    render() {
        return (
            <Switch animation={AnimationFactory.FADE}>
                <Route path="/initialSetup/temporaryPassword" component={TemporaryPasswordContainer} />
                <Route path="/initialSetup/createAdminUser" component={CreateAdminUserContainer} />
            </Switch>
        )
    }
}