import { InitialSetup as Actions } from '../actions/initialSetup.jsx';

const initialState = {
    loading: false,
    temporaryPasswordFile: null,
    temporaryAccessToken: null
};

export const initialSetup = (state = initialState, action) => {
    switch(action.type) {
        case Actions.RECEIVE_TEMPORARY_PASSWORD_FILE: {
            return {
                ...state,
                temporaryPasswordFile: action.temporaryPasswordFile
            }
        }
        case Actions.RECEIVE_TEMPORARY_ACCESS_TOKEN: {
            return {
                ...state,
                temporaryAccessToken: action.temporaryAccessToken
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