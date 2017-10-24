import React from 'react';

export class Page extends React.Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}