import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeNavigator from "./HomeNavigator";
import ProfileScreen from "../screens/user/ProfileScreen";
import FollowersScreen from "../screens/user/FollowersScreen";
import FollowingScreen from "../screens/user/FollowingScreen";

import CreateTweetScreen from "../screens/CreateTweetScreen";

// import CustomHeader from "../components/UI/CustomHeader";

import { getUserTwitterEntity } from "../utils/storageFunctions";
import DrawerContainer from "./DrawerContainer";

const HomeTweetStack = createNativeStackNavigator();

const HomeAndCreateTweetStack = () => {
	return (
		<HomeTweetStack.Navigator>
			<HomeTweetStack.Screen
				name="CreateTweet"
				component={CreateTweetScreen}
				options={{
					headerLeft: ({ navigation }) => (
						<Button
							icon={{ name: "clear", type: "material", style: { color: "rgb(29, 161, 242)", size: 30 } }}
							buttonStyle={{ backgroundColor: "transparent" }}
							onPress={() => navigation.dispatch(NavigationActions.back())}
						/>
					),
				}}
			/>
			<HomeTweetStack.Screen name="HomeWithTweet" component={HomeNavigator} options={{ header: () => null }} />
		</HomeTweetStack.Navigator>
	);
};

const AppDrawer = createDrawerNavigator();

const TwixperNavigator = () => {
	const [userEntityData, setUserEntityData] = useState("");

	useEffect(async () => {
		let userData = await getUserTwitterEntity();

		setUserEntityData(userData);
	}, [getUserTwitterEntity, setUserEntityData]);

	return (
		<AppDrawer.Navigator drawerContent={(props) => <DrawerContainer {...props} userData={userEntityData} />}>
			<AppDrawer.Screen name="Home" component={HomeAndCreateTweetStack} />
			<AppDrawer.Screen name="Profile" component={ProfileScreen} />
			<AppDrawer.Screen name="Following" component={FollowingScreen} />
			<AppDrawer.Screen name="Followers" component={FollowersScreen} />
		</AppDrawer.Navigator>
	);
};

export default TwixperNavigator;
