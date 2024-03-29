import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { appColors } from "../constants/colors";
import TweetsSearchResults from "../components/search/TweetsSearchResults";
import PeopleSearchResults from "../components/search/PeopleSearchResults";

const SearchTabs = createMaterialTopTabNavigator();

const SearchTabsNavigator = () => {
	return (
		<View style={{ flex: 1, flexDirection: "row" }}>
			<SearchTabs.Navigator
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
				<SearchTabs.Screen name="TweetsResults" component={TweetsSearchResults} options={{ title: "Tweets" }} />
				<SearchTabs.Screen name="PeopleResults" component={PeopleSearchResults} options={{ title: "People" }} />
			</SearchTabs.Navigator>
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

export default SearchTabsNavigator;
