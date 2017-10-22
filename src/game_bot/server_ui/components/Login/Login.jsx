import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { Title, Content } from '../Shared/index.jsx';
import CommonStyles from '../App.css';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: "",
            password: ""
        }
    }

    onSubmit() {
        this.props.onSubmit(this.state.username, this.state.password);
    }

    render() {
        return (
            <div>
                <Title>Login</Title>
                <Content className={CommonStyles.contentPanel}>
                    <div className={CommonStyles.instructionSection}>
                        <p className={CommonStyles.bigShoutout}>Hey there, how ya doin'?</p>
                    </div>
                    <FormControl
                        type="text"
                        placeholder="Your username?"
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                    />
                    <FormControl
                        type="text"
                        placeholder="Secret password goes here."
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

    componentDidMount() {
        this.props.onCreate();
    }
}