import React from 'react';
import styles from './Title.css';

export class Title extends React.Component {
    render() {
        return (
            <div className={styles.titleSection}>
                <div className={styles.title}>{this.props.children}</div>
            </div>
        );
    }
}