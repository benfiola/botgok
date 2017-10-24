import React from 'react';

export class Page extends React.Component {
    render() {
        if(this.props.loading == null || this.props.loading) {
            return null;
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}