import React from 'react';
import { Route, Switch } from 'react-router';
import { CreateAdminUserContainer } from '../../containers/InitialSetup/CreateAdminUserContainer.jsx';
import { TemporaryPasswordContainer } from '../../containers/InitialSetup/TemporaryPasswordContainer.jsx';


export class InitialSetup extends React.Component {
    render() {
        return (
            <Switch>
                <Route key={"temporaryPassword"} path="/initialSetup/temporaryPassword" component={TemporaryPasswordContainer} />
                <Route key={"createAdminUser"} path="/initialSetup/createAdminUser" component={CreateAdminUserContainer} />
            </Switch>
        )
    }
}