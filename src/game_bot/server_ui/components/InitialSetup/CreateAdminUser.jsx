import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Content, Title } from '../Shared/index.jsx';
import styles from './Common.css';

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
        this.props.onSubmit(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <Title>Create an Admin Account</Title>
                <Content className={styles.contentPanel}>
                    <div className={styles.instructionSection}>
                        <p className={styles.bigShoutout}>Aw yeah, that's the stuff.</p>
                        <p>Now that we've gotten that out of the way, it's time that you create your first admin account with me.</p>
                    </div>
                    <FormControl
                        type="text"
                        placeholder="Put your best username right here."
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                    />
                    <FormControl
                        type="text"
                        placeholder="Put a nice secure password here."
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                    <Button onClick={this.onSubmit}>
                        Smash that submit button.
                    </Button>
                </Content>
            </div>
        );
    }
}