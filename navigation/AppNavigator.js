// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";
import ProfileScreen from "../screens/user/ProfileScreen";

// import DrawerNavigator from "./DrawerNavigator";
import HomeNavigator from "./HomeNavigator";

// const AppStack = createNativeStackNavigator();
const AppDrawer = createDrawerNavigator();

const AppNavigator = () => {
	return (
		<AppDrawer.Navigator>
			<AppDrawer.Screen name="HomeNavigator" component={HomeNavigator} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
			{/* <AppDrawer.Screen name="HomeNavigator" component={HomeNavigator} />
			<AppDrawer.Screen name="DrawerNavigator" component={DrawerNavigator} /> */}
		</AppDrawer.Navigator>
	);
};

export default AppNavigator;
