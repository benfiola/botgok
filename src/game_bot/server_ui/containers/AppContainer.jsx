import { connect } from 'react-redux';
import { App as Component } from '../components/App.jsx';
import { App as Actions } from '../actions/index.jsx';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.app.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        }
    }
};

export const AppContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Component));