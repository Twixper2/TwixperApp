import { AUTHENTICATE_TWITTER } from "../actions/auth";

const initialState = {
    authUrl: null,
    oauthToken: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_TWITTER:
            return {
                authUrl: action.authUrl,
                oauthToken: action.oauthToken
            };

        default:
            return state;
    }
};
