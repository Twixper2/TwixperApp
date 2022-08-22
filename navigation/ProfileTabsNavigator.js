import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { appColors } from "../constants/colors";
import UserLikes from "../components/profile/UserLikes";
import UserTweets from "../components/profile/UserTweets";

const ProfileTabs = createMaterialTopTabNavigator();

const ProfileTabsNavigator = ({ username, userHandle }) => {
	return (
		<View style={styles.container}>
			<ProfileTabs.Navigator
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
				<ProfileTabs.Screen
					name="UserTweets"
					component={UserTweets}
					options={{ title: "Tweets" }}
					initialParams={{ username: username, userHandle: userHandle }}
				/>
				<ProfileTabs.Screen
					name="UserLikes"
					component={UserLikes}
					options={{ title: "Likes" }}
					initialParams={{ username: username, userHandle: userHandle }}
				/>
			</ProfileTabs.Navigator>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		backgroundColor: appColors.screenBackgroundColor,
	},
	tempText: {
		fontSize: 32,
		color: appColors.iconColor,
		textAlign: "center",
	},
});

export default ProfileTabsNavigator;
