import { connect } from 'react-redux';
import { App } from '../components/App.jsx';

const mapStateToProps = (state, ownProps) => {
    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onCreate() {
        }
    }
};

export const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);