import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import 'react-native-url-polyfill/auto';

import TwixperNavigator from "./navigation/TwixperNavigator";
import authReducer from "./store/reducers/auth";


const rootReducer = combineReducers({
    auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
    return (
        <Provider store={store}>
            <TwixperNavigator />
        </Provider>
    );
}

// First - Vertical  | Second - Horizontal
// padding: 20% 10%
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: "#fff",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
});
