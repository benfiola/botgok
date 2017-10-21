import React from 'react';
import { Panel } from 'react-bootstrap';
import styles from './Content.css';

export class Content extends React.Component {
    render() {
        let classNames = [styles.contentPanel];
        if(this.props.classNames) {
            classNames.push(this.props.classNames);
        }
        return (
            <Panel className={classNames.join(" ")}>
                {this.props.children}
            </Panel>
        )
    }
}