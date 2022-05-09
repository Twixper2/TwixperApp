import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../screens/auth/LoginScreen";
import LoginTwitterScreen from "../../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../../screens/auth/LoginExperimentScreen";

import { loginWithUsername } from "../../utils/config";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			{loginWithUsername ? (
				<AuthStack.Screen name="Login" component={LoginScreen} />
			) : (
				<AuthStack.Screen name="LoginTwitter" component={LoginTwitterScreen} />
			)}
			<AuthStack.Screen name="LoginExperiment" component={LoginExperimentScreen} />
		</AuthStack.Navigator>
	);
};

export default AuthNavigator;
