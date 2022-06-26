import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TweetsList from "../tweets/TweetsList";

import * as profileActions from "../../utils/actions/profile";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, profileKeys } from "../../constants/commonKeys";

const UserLikes = ({ route, navigation }) => {
	const { username } = route.params;

	const [error, setError] = useState();
	const [usersLikes, setUserLikes] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadUsersLikesResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await profileActions.get_user_likes(username);
			let userLikesArr = await getObjectValue(collationNames.PROFILE + profileKeys.USER_LIKES + username);
			setUserLikes(userLikesArr.usersLikes);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUsersLikesResults().then(() => {
			setIsLoading(false);
		});
	}, [loadUsersLikesResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUsersLikesResults} />
			</View>
		);
	}

	if (!isLoading && usersLikes.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Likes Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList onRefresh={loadUsersLikesResults} isLoading={isLoading} data={usersLikes} />
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

export default UserLikes;
