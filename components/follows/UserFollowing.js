import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import PeopleList from "../people/PeopleList";

import * as followsActions from "../../utils/actions/follows";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, followsKeys } from "../../constants/commonKeys";

const UserFollowing = ({ route, navigation }) => {
	const { username } = route.params;

	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [userFollowing, setUserFollowing] = useState([]);

	const loadUserFollowing = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await followsActions.get_user_following(username);
			let userFollows = await getObjectValue(collationNames.FOLLOWS + followsKeys.USER_FOLLOWING + username);
			setUserFollowing(userFollows.userFollowing);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUserFollowing().then(() => {
			setIsLoading(false);
		});
	}, [loadUserFollowing]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUserFollowing} />
			</View>
		);
	}

	if (!isLoading && userFollowing.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Following Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PeopleList onRefresh={loadUserFollowing} isLoading={isLoading} data={userFollowing} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: appColors.screenBackgroundColor,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 10,
		backgroundColor: appColors.screenBackgroundColor,
	},
});

export default UserFollowing;
