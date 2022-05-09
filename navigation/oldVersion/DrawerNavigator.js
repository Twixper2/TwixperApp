import { createDrawerNavigator } from "@react-navigation/drawer";

import FollowersScreen from "../../screens/user/FollowersScreen";
import FollowingScreen from "../../screens/user/FollowingScreen";
import ProfileScreen from "../../screens/user/ProfileScreen";
import HomeNavigator from "../HomeNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name="HomeNavigator" component={HomeNavigator} />
			<Drawer.Screen name="Profile" component={ProfileScreen} />
			<Drawer.Screen name="Following" component={FollowingScreen} />
			<Drawer.Screen name="Followers" component={FollowersScreen} />
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
