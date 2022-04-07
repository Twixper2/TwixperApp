import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import "react-native-url-polyfill/auto";

import TwixperNavigator from "./navigation/TwixperNavigator";
import AppNavigator from "./navigation/AppNavigator";
import authReducer from "./store/reducers/auth";
import tweetsReducer from "./store/reducers/tweets";

const rootReducer = combineReducers({
	auth: authReducer,
	tweets: tweetsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigator />
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
