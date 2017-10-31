import { App as Actions } from '../actions/index.jsx';

const initialState = {
    loading: true,
    error: null
};

export const app = (state = initialState, action) => {
    switch(action.type) {
        case Actions.SET_LOADING: {
            return {
                ...state,
                loading: action.value
            }
        }
        case Actions.SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }
        default: return state;
    }
};