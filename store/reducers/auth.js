import { AUTHENTICATE_TWITTER } from "../actions/auth";

const initialState = {
    oauthToken: null,
    authUrl: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE_TWITTER:
            console.log("reduced");
            return {
                oauthToken: action.oauthToken,
                authUrl: action.authUrl,
            };

        default:
            return state;
    }
};
