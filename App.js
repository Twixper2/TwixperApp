import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import 'react-native-url-polyfill/auto';



//  TODO: Look on rn-shop-app :
//          - enableScreens ?
//          - rootReducer !
//          - store = createStore ??

import authReducer from "./store/reducers/auth";
import CopyWelcomeScreen from "./screens/CopyWelcomeScreen";

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <CopyWelcomeScreen />
        </Provider>
    );
}

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
});
