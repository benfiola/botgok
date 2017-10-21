import { InitialSetup as Actions } from '../actions/initialSetup.jsx';

const initialState = {
    loading: false,
    temporaryPasswordFile: null
};

export const initialSetup = (state = initialState, action) => {
    switch(action.type) {
        case Actions.INITIALIZE_STEP_ONE_COMPLETE: {
            return {
                ...state,
                temporaryPasswordFile: action.temporaryPasswordFile
            }
        }
        case Actions.SET_LOADING: {
            return {
                ...state,
                loading: action.value
            }
        }
        default: return state;
    }
};