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
            dispatch(InitialSetup.initializeStepOne());
        },
        onSubmit(enteredPassword) {
            dispatch(InitialSetup.authorizeStepOne(enteredPassword));
        }
    }
};

export const TemporaryPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemporaryPassword);