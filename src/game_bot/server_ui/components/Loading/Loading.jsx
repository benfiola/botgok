import React from 'react';
import { Page, Title } from '../Shared/index.jsx';
import styles from './Loading.css';

export class Loading extends React.Component {
    render() {
        let className = [styles.loadingDiv];
        if(this.props.className) {
            className.push(this.props.className);
        }
        className = className.join(" ");
        return (
            <div className={className} style={this.props.style}>
            </div>
        )
    }
}