import { connect } from 'react-redux';
import { InitialSetup } from '../../actions/index.jsx';
import { CreateAdminUser } from '../../components/InitialSetup/CreateAdminUser.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        temporaryAccessToken: state.initialSetup.temporaryAccessToken
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(InitialSetup.initializeStepTwo());
        },
        onSubmit(enteredUsername, enteredPassword, temporaryAccessToken) {
            dispatch(InitialSetup.authorizeStepTwo(enteredUsername, enteredPassword, temporaryAccessToken));
        }
    }
};

export const CreateAdminUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUser);