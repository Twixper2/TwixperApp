import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerNavigator from "./DrawerNavigator";
import HomeNavigator from "./HomeNavigator";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
	return (
		<AppStack.Navigator>
			<AppStack.Screen name="HomeNavigator" component={HomeNavigator} />
			<AppStack.Screen name="DrawerNavigator" component={DrawerNavigator} />
		</AppStack.Navigator>
	);
};

export default AppNavigator;
