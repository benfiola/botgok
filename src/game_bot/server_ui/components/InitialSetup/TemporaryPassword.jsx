import React from 'react';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Title, Content, Page } from '../Shared/index.jsx';
import CommonStyles from '../App.css';

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
        let enteredText = e.target.value;
        this.setState({
            enteredPassword: enteredText
        });
        if(enteredText) {
            this.props.onSubmit(enteredText)
        }
    }

    onSubmit() {
        if(this.state.enteredPassword) {
            this.props.onSubmit(this.state.enteredPassword);
        }
    }

    render() {
        return (
            <Page className={this.props.className} style={this.props.style}>
                <Title>Temporary Password</Title>
                <Content className={CommonStyles.contentPanel}>
                    <div className={CommonStyles.instructionSection}>
                        <p className={CommonStyles.bigShoutout}>Why, hello there.</p>
                        <p>It looks like you're just getting started with game_bot.</p>
                        <p>Could you do me a solid?  Run the following command on your server, and tell me what you get.</p>
                        <pre>cat {this.props.temporaryPasswordFile}</pre>
                    </div>
                    <FormControl
                        type="text"
                        placeholder="Drop that temporary password in here all careful like."
                        value={this.state.value}
                        onChange={this.onInputChange}
                    />
                </Content>
            </Page>
        );
    }

    componentDidMount() {
        this.props.onCreate();
    }
}