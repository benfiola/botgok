import React from 'react';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';

export class TemporaryPassword extends React.Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            enteredPassword: ""
        };
    }

    onInputChange(e) {
        this.setState({
            enteredPassword: e.target.value
        });
    }

    onSubmit() {
        if(this.state.enteredPassword) {
            this.props.onSubmit(this.state.enteredPassword);
        }
    }

    render() {
        if(this.props.loading) {
            return <div>Loading</div>
        } else {
            return (
                <div>
                    <ControlLabel>Enter the temporary password located at {this.props.temporaryPasswordFile}</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter temporary password"
                        value={this.state.value}
                        onChange={this.onInputChange}
                    />
                    <Button onClick={this.onSubmit}>Submit</Button>
                </div>
            );
        }
    }

    componentDidMount() {
        this.props.onCreate();
    }
}