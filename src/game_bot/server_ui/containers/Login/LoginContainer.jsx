import { connect } from 'react-redux';
import { Login as Component } from '../../components/Login/Login.jsx';
import { Login as Actions } from '../../actions/index.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        },
        onSubmit(enteredUsername, enteredPassword) {
            dispatch(Actions.authorize(enteredUsername, enteredPassword))
        }
    }
};

export const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component);