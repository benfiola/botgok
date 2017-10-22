import { connect } from 'react-redux';
import { Login as Component } from '../../components/Login/Login.jsx';
import { Login as Actions } from '../../actions/index.jsx';

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

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);