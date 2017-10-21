import React from 'react';

export class CreateAdminUser extends React.Component {
    componentDidMount() {
        this.props.onCreate();
    }

    render() {
        return <div>Create Admin User</div>
    }
}