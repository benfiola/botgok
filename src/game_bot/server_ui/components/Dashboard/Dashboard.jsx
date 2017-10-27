import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';

import { Title, Content, Page } from '../index.jsx';
import { Dashboard as Actions } from '../../actions/index.jsx';
import CommonStyles from '../App.css';

export class DashboardComponent extends React.Component {
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

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        },
        onLogout() {
            dispatch(Actions.onLogout());
        }
    };
};

export const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);