import React from 'react';
import { FormControl, ControlLabel, Button } from 'react-bootstrap';
import { Title, Content } from '../Shared/index.jsx';
import styles from './Common.css';

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
            <div>
                <Title>Temporary Password</Title>
                <Content className={styles.contentPanel}>
                    <div className={styles.instructionSection}>
                        <p className={styles.bigShoutout}>Why, hello there.</p>
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
            </div>
        );
    }

    componentDidMount() {
        this.props.onCreate();
    }
}