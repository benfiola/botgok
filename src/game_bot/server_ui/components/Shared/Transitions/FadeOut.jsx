import React from 'react';
import { Motion, spring } from 'react-motion';


export class FadeOut extends React.Component {
    constructor(props) {
        super(props);
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish() {
        console.log("done");
    }

    render() {
        return (
            <Motion in={this.props.in} onRest={this.onFinish} style={{opacity: spring(0, {stiffness: 60, damping: 15})}} defaultStyle={{opacity: 1}}>
                {(interpolatedStyle) => React.cloneElement(this.props.children, { style: interpolatedStyle })}
            </Motion>
        )
    }
}