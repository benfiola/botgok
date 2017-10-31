import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col } from 'react-bootstrap';

import { Switch, AnimationFactory, PluginsContainer } from '../index.jsx';
import { Route } from 'react-router';
import { push } from 'react-router-redux';
import { Dashboard as Actions } from '../../actions/index.jsx';

export class DashboardComponent extends React.Component {
    constructor(props){
        super(props);
        this.onPluginsClick = this.props.onNavigate.bind(this, "/dashboard/plugins");
    }

    render() {
        return (
            <Row>
                <Col xs={1}>
                    <Row>
                        <Col xs={12}>
                            <Button onClick={this.onPluginsClick}>Plugins</Button>
                            <Button onClick={this.props.onLogout}>Log Out</Button>
                        </Col>
                    </Row>
                </Col>
                <Col xs={11}>
                    <Switch animation={AnimationFactory.FADE}>
                        <Route path={"/dashboard/plugins"} component={PluginsContainer} />
                    </Switch>
                </Col>
            </Row>
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
        onNavigate(page) {
            dispatch(push(page));
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