import React from 'react';

export class Page extends React.Component {
    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}