import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TweetsList from "../tweets/TweetsList";

import * as tweetsActions from "../../utils/actions/tweets";
import * as profileActions from "../../utils/actions/profile";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, profileKeys } from "../../constants/commonKeys";

const UserTweets = ({ route, navigation }) => {
	const { username } = route.params;

	const [error, setError] = useState();
	const [usersTweets, setUserTweets] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadUsersTweetsResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await profileActions.get_user_tweets(username);
			// await tweetsActions.get_who_to_follow(username);
			let userTweetsArr = await getObjectValue(collationNames.PROFILE + profileKeys.USER_TWEETS + username);
			setUserTweets(userTweetsArr.usersTweets);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUsersTweetsResults().then(() => {
			setIsLoading(false);
		});
	}, [loadUsersTweetsResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUsersTweetsResults} />
			</View>
		);
	}

	if (!isLoading && usersTweets.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Tweets Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList
				onRefresh={loadUsersTweetsResults}
				isLoading={isLoading}
				data={usersTweets}
				withWhoToFollow={true}
			/>
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

export default UserTweets;
