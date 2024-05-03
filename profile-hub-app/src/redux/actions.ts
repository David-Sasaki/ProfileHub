import { Profile } from '../types/profileTypes';

export const CREATE_PROFILE = 'CREATE_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';

export function createProfile(profile: Profile) {
    return { type: CREATE_PROFILE, payload: profile };
}

export function updateProfile(id: string, profile: Profile) {
    return { type: UPDATE_PROFILE, payload: { id, profile } };
}

export function deleteProfile(id: string) {
    return { type: DELETE_PROFILE, payload: id };
}
