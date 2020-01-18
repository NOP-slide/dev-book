import { GET_PROFILE, GET_PROFILES, GET_REPOS, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE, PREPARE_GET_PROFILES, PREPARE_GET_PROFILE } from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    repos: [],
    loading: true,
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case PREPARE_GET_PROFILE:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: true
            }
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case PREPARE_GET_PROFILES:
            return {
                ...state,
                profile: null,
                profiles: [],
                repos: [],
                loading: true
            }
        case GET_PROFILES:
            return {
                ...state,
                profiles: payload,
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: null,
                repos: [],
                loading: false
            }
        case GET_REPOS:
            return {
                ...state,
                repos: payload,
                loading: false
            }
        default:
            return state;
    }
}