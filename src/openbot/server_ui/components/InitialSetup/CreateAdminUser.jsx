import React from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Content, Title, Page } from '../index.jsx';
import CommonStyles from '../App.css';
import { InitialSetup } from '../../actions/index.jsx';

export class CreateAdminUserComponent extends React.Component {
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
            <Page className={this.props.className} style={this.props.style}>
                <Title>Create an Admin Account</Title>
                <Content className={CommonStyles.contentPanel}>
                    <div className={CommonStyles.instructionSection}>
                        <p className={CommonStyles.bigShoutout}>Aw yeah, that's the stuff.</p>
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
            </Page>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(InitialSetup.createAdminAccountOnCreate());
        },
        onSubmit(enteredUsername, enteredPassword) {
            dispatch(InitialSetup.createFirstAdminAccount(enteredUsername, enteredPassword));
        }
    }
};

export const CreateAdminUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUserComponent);