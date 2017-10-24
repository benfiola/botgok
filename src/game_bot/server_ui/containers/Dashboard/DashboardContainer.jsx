import { Dashboard } from '../../components/Dashboard/Dashboard.jsx';
import { connect } from 'react-redux';
import { Dashboard as Actions } from '../../actions/index.jsx';

const mapStateToProps = (state, ownProps) => {
    return {
        loading: state.app.loading
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
            dispatch(Actions.onCreate());
        },
        onLogout() {
            dispatch(Actions.onLogout());
        }
    };
};

export const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);