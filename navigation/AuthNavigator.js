import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginTwitterScreen from "../screens/auth/LoginTwitterScreen";
import LoginExperimentScreen from "../screens/auth/LoginExperimentScreen";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthStack.Navigator screenOptions={{ headerShown: false }}>
			<AuthStack.Screen name="LoginTwitter" component={LoginTwitterScreen} />
			<AuthStack.Screen name="LoginExperiment" component={LoginExperimentScreen} />
		</AuthStack.Navigator>
	);
};

export default AuthNavigator;
