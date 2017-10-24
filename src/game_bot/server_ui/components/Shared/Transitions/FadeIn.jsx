import React from 'react';
import { Loading } from '../../Loading/Loading.jsx';
import { Motion, TransitionMotion, spring } from 'react-motion';


export class FadeIn extends React.Component {
    constructor(props) {
        super(props);
        this.defaultStyles = this.defaultStyles.bind(this);
        this.transitionStyles = this.transitionStyles.bind(this);
    }

    defaultStyles() {
        return {
            opacity: 0,
            transition: `opacity ${this.props.timeout}ms ease-in-out`,
        }
    }

    transitionStyles(style) {
        return {
            "entering": {opacity: 0},
            "entered": {opacity: 1}
        }[style]
    }

    render() {
        return (
            <Motion in={this.props.in} style={{opacity: spring(1, {stiffness: 60, damping: 15})}} defaultStyle={{opacity: 0}}>
                {(interpolatedStyle) => React.cloneElement(this.props.children, { style: interpolatedStyle })}
            </Motion>
        )
    }
}