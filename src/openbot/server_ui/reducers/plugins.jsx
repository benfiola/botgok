import { Plugins as Actions } from '../actions/index.jsx';

const initialState = {
    plugins: []
};

export const plugins = (state = initialState, action) => {
    switch(action.type) {
        case(Actions.RECEIVE_PLUGINS): {
            return {
                ...state,
                plugins: action.plugins
            }
        }
        default: return state;
    }
};


