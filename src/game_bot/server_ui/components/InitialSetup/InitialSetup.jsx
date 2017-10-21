import React from 'react';
import { Route } from 'react-router';
import { CreateAdminUserContainer } from '../../containers/InitialSetup/CreateAdminUserContainer.jsx';
import { TemporaryPasswordContainer } from '../../containers/InitialSetup/TemporaryPasswordContainer.jsx';


export class InitialSetup extends React.Component {
    render() {
        return [
            <Route path="/initialSetup/step1" component={TemporaryPasswordContainer} />,
            <Route path="/initialSetup/step2" component={CreateAdminUserContainer} />,
         ]
    }
}