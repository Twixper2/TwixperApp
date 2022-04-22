import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/home/HomeScreen";
import MessagesScreen from "../screens/home/MessagesScreen";
import NotificationsScreen from "../screens/home/NotificationsScreen";
import SearchScreen from "../screens/home/SearchScreen";

const HomeBottomTabs = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<HomeBottomTabs.Navigator screenOptions={{ headerShown: false }}>
			<HomeBottomTabs.Screen name="Home" component={HomeScreen} />
			<HomeBottomTabs.Screen name="Search" component={SearchScreen} />
			<HomeBottomTabs.Screen name="Notifications" component={NotificationsScreen} />
			<HomeBottomTabs.Screen name="Messages" component={MessagesScreen} />
		</HomeBottomTabs.Navigator>
	);
};

export default HomeNavigator;
