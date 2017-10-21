import React from 'react';
import { FormControl, ControlLabel } from 'react-bootstrap';

export class TemporaryPassword extends React.Component {
    render() {
        if(this.props.loading) {
            return <div>Loading</div>
        } else {
            return (
                <div>
                    <ControlLabel>Enter the temporary password located at {this.props.temporaryPasswordFile}</ControlLabel>
                    <FormControl
                        type="text"
                        placeholder="Enter temporary password" />
                </div>
            );
        }
    }

    componentDidMount() {
        this.props.onCreate();
    }
}