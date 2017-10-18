import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Navigation } from '../components/Navigation.jsx';

const mapStateToProps = (state, props) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => {
            dispatch(push(path));
        }
    }
};

export const NavigationContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Navigation);