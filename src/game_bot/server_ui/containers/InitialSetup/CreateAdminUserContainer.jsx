import { connect } from 'react-redux';
import { CreateAdminUser } from '../../components/InitialSetup/CreateAdminUser.jsx';

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(InitialSetup.check());
        }
    }
};

export const CreateAdminUserContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAdminUser);