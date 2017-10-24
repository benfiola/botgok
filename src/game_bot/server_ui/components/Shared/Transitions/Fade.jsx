import React from 'react';
import Transition from 'react-transition-group/Transition.js';

export class Fade extends React.Component {
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
            <Transition in={this.props.in} timeout={this.props.timeout}>
                {(state) => (
                    React.cloneElement(
                        this.props.children,
                        {
                            ...this.props.children.props,
                            style: {
                                ...this.defaultStyles(),
                                ...this.transitionStyles(state)
                            }
                        }
                    )
                )}
            </Transition>
        )
    }
}