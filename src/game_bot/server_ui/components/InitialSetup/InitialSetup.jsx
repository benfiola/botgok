import React from 'react';
import { PropRoute, PropSwitch } from '../Shared/index.jsx';
import { CreateAdminUserContainer } from '../../containers/InitialSetup/CreateAdminUserContainer.jsx';
import { TemporaryPasswordContainer } from '../../containers/InitialSetup/TemporaryPasswordContainer.jsx';


export class InitialSetup extends React.Component {
    render() {
        return (
            <PropSwitch>
                <PropRoute key={"temporaryPassword"} path="/initialSetup/temporaryPassword" component={TemporaryPasswordContainer} />
                <PropRoute key={"createAdminUser"} path="/initialSetup/createAdminUser" component={CreateAdminUserContainer} />
            </PropSwitch>
        )
    }
}