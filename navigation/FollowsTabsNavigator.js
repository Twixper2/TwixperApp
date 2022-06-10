import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import UserFollowers from "../components/follows/UserFollowers";
import UserFollowing from "../components/follows/UserFollowing";

import { appColors } from "../constants/colors";

const UserFollowsTabs = createMaterialTopTabNavigator();

const FollowsTabsNavigator = ({ username }) => {
	return (
		<View style={{ flex: 1, flexDirection: "row" }}>
			<UserFollowsTabs.Navigator
				screenOptions={() => ({
					tabBarStyle: {
						width: "100%",
						backgroundColor: appColors.backgroundColor,
						borderColor: appColors.backgroundColor,
						shadowColor: "red",
						elevation: 2,
					},
					tabBarLabelStyle: {
						fontSize: 16,
						color: "white",
						fontWeight: "bold",
						alignSelf: "center",
						position: "relative",
					},
				})}
			>
				<UserFollowsTabs.Screen
					name="Followers"
					component={UserFollowers}
					initialParams={{ username: username }}
				/>
				<UserFollowsTabs.Screen
					name="Following"
					component={UserFollowing}
					initialParams={{ username: username }}
				/>
			</UserFollowsTabs.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: appColors.screenBackgroundColor,
	},
	tempText: {
		fontSize: 32,
		color: appColors.iconColor,
		textAlign: "center",
	},
});

export default FollowsTabsNavigator;
