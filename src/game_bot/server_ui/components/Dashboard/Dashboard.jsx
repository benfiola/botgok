import React from 'react';
import { Title, Content, Page } from '../Shared/index.jsx';
import { Button } from 'react-bootstrap';
import CommonStyles from '../App.css';

export class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.props.onLogout();
    }
    render() {
        return (
            <Page className={this.props.className} style={this.props.style}>
                <Title>Dashboard</Title>
                <Content className={CommonStyles.contentPanel}>
                    <div className={CommonStyles.instructionSection}>
                        <p className={CommonStyles.bigShoutout}>Stuff goes here!</p>
                        <Button onClick={this.onLogout}>
                            Log-out
                        </Button>
                    </div>
                </Content>
            </Page>
        )
    }

    componentDidMount() {
        this.props.onCreate();
    }
}