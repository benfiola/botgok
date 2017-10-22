import { connect } from 'react-redux';
import { InitialSetup } from '../../actions/index.jsx';
import { CreateAdminUser } from '../../components/InitialSetup/CreateAdminUser.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.app.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(InitialSetup.createAdminAccountOnCreate());
        },
        onSubmit(enteredUsername, enteredPassword) {
            dispatch(InitialSetup.createFirstAdminAccount(enteredUsername, enteredPassword));
        }
    }
};

export const CreateAdminUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUser);