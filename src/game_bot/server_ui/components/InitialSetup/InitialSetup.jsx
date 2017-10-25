import React from 'react';
import { Route } from 'react-router';
import { AnimationFactory, Switch } from '../Shared/index.jsx';
import { CreateAdminUserContainer } from '../../containers/InitialSetup/CreateAdminUserContainer.jsx';
import { TemporaryPasswordContainer } from '../../containers/InitialSetup/TemporaryPasswordContainer.jsx';


export class InitialSetup extends React.Component {
    render() {
        return (
            <Switch animation={AnimationFactory.SLIDE}>
                <Route path="/initialSetup/temporaryPassword" component={TemporaryPasswordContainer} />
                <Route path="/initialSetup/createAdminUser" component={CreateAdminUserContainer} />
            </Switch>
        )
    }
}