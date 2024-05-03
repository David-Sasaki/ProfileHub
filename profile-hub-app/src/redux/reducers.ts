import { CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE } from './actions';
import { Profile } from '../types/profileTypes';

interface ProfilesState {
    profiles: Profile[];
}

const initialState: ProfilesState = {
    profiles: [],
};

function profilesReducer(state = initialState, action: any): ProfilesState {
    switch (action.type) {
        case CREATE_PROFILE:
            return { ...state, profiles: [...state.profiles, action.payload] };
        case UPDATE_PROFILE:
            return {
                ...state,
                profiles: state.profiles.map(profile =>
                    profile.id === action.payload.id ? { ...profile, ...action.payload.profile } : profile
                ),
            };
        case DELETE_PROFILE:
            return {
                ...state,
                profiles: state.profiles.filter(profile => profile.id !== action.payload)
            };
        default:
            return state;
    }
}

export default profilesReducer;
