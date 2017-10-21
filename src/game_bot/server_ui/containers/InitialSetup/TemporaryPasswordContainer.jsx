import { connect } from 'react-redux';
import { TemporaryPassword } from '../../components/InitialSetup/TemporaryPassword.jsx';
import { InitialSetup } from '../../actions/index.jsx'
import { push } from 'react-router-redux';

const mapStateToProps = (state, ownProps) => {
    return {
        temporaryPasswordFile: state.initialSetup.temporaryPasswordFile,
        loading: state.initialSetup.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(InitialSetup.initializeInitialSetup());
        },
        onSubmit(enteredPassword) {
            dispatch(InitialSetup.authorizeTemporaryPassword(enteredPassword));
        }
    }
};

export const TemporaryPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemporaryPassword);