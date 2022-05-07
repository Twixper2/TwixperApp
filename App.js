import "react-native-gesture-handler";

import "react-native-url-polyfill/auto";

import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { StyleSheet } from "react-native";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth";
import tweetsReducer from "./store/reducers/tweets";

import AppNavigator from "./navigation/AppNavigator";
import AuthNavigator from "./navigation/AuthNavigator";

const rootReducer = combineReducers({
	auth: authReducer,
	tweets: tweetsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//  TODO: Check if is Authenticated !!
const isAuthenticated = false;

export default function App() {
	return (
		<Provider store={store}>
			<StatusBar style="light" />
			<NavigationContainer>
				{!isAuthenticated && <AuthNavigator />}
				{isAuthenticated && <AppNavigator />}
			</NavigationContainer>
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
