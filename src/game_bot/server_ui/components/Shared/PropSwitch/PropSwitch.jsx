import React from 'react';
import { Switch } from 'react-router';

export class PropSwitch extends React.Component {
    render() {
        let children = React.Children.toArray(this.props.children).map((child)=>{
            return React.cloneElement(child, {
                ...this.props,
                ...child.props
            })
        });
        return (
            <Switch>
                {children}
            </Switch>
        )
    }
}