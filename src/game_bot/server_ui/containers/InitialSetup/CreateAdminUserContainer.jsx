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
            dispatch(InitialSetup.performInitialSetupCheck());
        },
        onSubmit(temporaryAccessToken, enteredUsername, enteredPassword) {
            dispatch(InitialSetup.createFirstAdminAccount(temporaryAccessToken, enteredUsername, enteredPassword));
        }
    }
};

export const CreateAdminUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUser);