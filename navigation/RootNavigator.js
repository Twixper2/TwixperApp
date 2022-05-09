import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigator from "./AppNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import LoginTwitterScreen from "../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../screens/auth/LoginExperimentScreen";

import { loginWithUsername } from "../utils/config";

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator screenOptions={{ headerShown: false }}>
				{loginWithUsername ? (
					<RootStack.Screen name="Login" component={LoginScreen} />
				) : (
					<RootStack.Screen name="LoginTwitter" component={LoginTwitterScreen} />
				)}
				<RootStack.Screen name="LoginExperiment" component={LoginExperimentScreen} />
				<RootStack.Screen name="App" component={AppNavigator} />
			</RootStack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
