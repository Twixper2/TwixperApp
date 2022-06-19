import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import TwixperNavigator from "./TwixperNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import LoginTwitterScreen from "../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../screens/auth/LoginExperimentScreen";

import { loginWithUsername } from "../utils/config";
import Notification from "../components/notifications/Notification";
const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator
				screenOptions={{ headerShown: false, contentStyle: { marginTop: Platform.OS === "ios" ? 15 : 0 } }}
			>
				{loginWithUsername ? (
					<RootStack.Screen name="Login" component={Notification} />
				) : (
					<RootStack.Screen name="LoginTwitter" component={LoginTwitterScreen} />
				)}
				<RootStack.Screen name="LoginExperiment" component={LoginExperimentScreen} />
				<RootStack.Screen name="App" component={TwixperNavigator} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
