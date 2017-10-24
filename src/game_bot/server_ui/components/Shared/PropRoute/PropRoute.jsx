import React from 'react';
import { Route } from 'react-router';

export class PropRoute extends React.Component {
    render() {
        let { component, path, key, ...rest} = this.props;
        let Component = component;
        return (
            <Route
                path={path}
                key={key}
                render={(props)=><Component {...rest} {...props} />}/>
        )
    }
}