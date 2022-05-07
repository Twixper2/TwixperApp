import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import HomeScreen from "../screens/home/HomeScreen";
import SearchScreen from "../screens/home/SearchScreen";
import MessagesScreen from "../screens/home/MessagesScreen";
import NotificationsScreen from "../screens/home/NotificationsScreen";

const HomeBottomTabs = createBottomTabNavigator();

const HomeNavigator = () => {
	return (
		<HomeBottomTabs.Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "rgb(29, 161, 242)",
				tabBarInactiveTintColor: "rgb(136, 153, 166)",
				tabBarActiveBackgroundColor: "rgb(0, 79, 114)",
				tabBarInActiveBackgroundColor: "rgb(27, 42, 51)",
				tabBarStyle: {
					borderWidth: 0,
					position: "absolute",
					bottom: 0,
					left: 0,
					width: "100%",
					backgroundColor: "rgb(27, 42, 51)",
					borderColor: "rgb(27, 42, 51)",
					shadowColor: "red",
					elevation: 2,
				},
				tabBarLabelStyle: { fontSize: 14, color: "#fff", position: "relative", alignSelf: "center" },
				tabBarIconStyle: { marginBottom: 5, marginTop: 5 },
				tabBarItemStyle: { justifyContent: "center", alignItems: "center" },
				tabBarShowLabel: false,
			}}
		>
			<HomeBottomTabs.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => <Octicons name={"home"} size={30} color={color} />,
				}}
			/>
			<HomeBottomTabs.Screen
				name="Search"
				component={SearchScreen}
				options={{
					tabBarIcon: ({ color }) => <EvilIcons name={"search"} size={35} color={color} />,
				}}
			/>
			<HomeBottomTabs.Screen
				name="Notifications"
				component={NotificationsScreen}
				options={{
					tabBarIcon: ({ color }) => <Ionicons name={"ios-notifications-outline"} size={30} color={color} />,
				}}
			/>
			<HomeBottomTabs.Screen
				name="Messages"
				component={MessagesScreen}
				options={{
					tabBarIcon: ({ color }) => <FontAwesome name={"envelope-o"} size={26} color={color} />,
				}}
			/>
		</HomeBottomTabs.Navigator>
	);
};

export default HomeNavigator;
