import React from 'react';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';

export class CreateAdminUser extends React.Component {
    constructor(props) {
        super(props);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: "",
            password: ""
        };
    }

    componentDidMount() {
        this.props.onCreate();
    }

    onUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit() {
        this.props.onSubmit(this.state.username, this.state.password, this.props.temporaryAccessToken);
    }

    render() {
        return (
            <div>
                <ControlLabel>Username</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter username"
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                />
                <ControlLabel>Password</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Enter temporary password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                />
                <Button onClick={this.onSubmit}>Submit</Button>
            </div>
        )
    }
}