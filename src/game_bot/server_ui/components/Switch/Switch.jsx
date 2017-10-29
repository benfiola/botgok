import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedSwitch } from 'react-router-transition';
import { AnimationFactory } from '../index.jsx';

export class Switch extends React.Component {xw
    render() {
        let { animation, stiffness, damping } = this.props;
        let props = AnimationFactory.generateProps(animation, {stiffness, damping});
        let className = "animated-view-wrapper";
        return (
            <AnimatedSwitch {...props} className={className}>
                {this.props.children}
            </AnimatedSwitch>
        )
    }
}