import React from 'react';
import { Button } from 'react-bootstrap';

export class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.navigateToLogin = this.navigate.bind(this, "/login");
        this.navigateToDashboard = this.navigate.bind(this, "/dashboard");
        this.navigateToInitialSetup = this.navigate.bind(this, "/initialSetup");
    }

    navigate(path) {
        this.props.navigate(path);
    }

    render() {
        return (
            <div>
                <Button onClick={this.navigateToLogin}>Login</Button>
                <Button onClick={this.navigateToDashboard}>Dashboard</Button>
                <Button onClick={this.navigateToInitialSetup}>Initial Setup</Button>
            </div>
        );
    }
}