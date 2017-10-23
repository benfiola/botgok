import React from 'react';
import { Title, Content } from '../Shared/index.jsx';
import CommonStyles from '../App.css';

export class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <Title>Dashboard</Title>
                <Content className={CommonStyles.contentPanel}>
                    <div className={CommonStyles.instructionSection}>
                        <p className={CommonStyles.bigShoutout}>Stuff goes here!</p>
                    </div>
                </Content>
            </div>
        )
    }

    componentDidMount() {
        this.props.onCreate();
    }
}