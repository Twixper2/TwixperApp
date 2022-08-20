import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TweetsList from "../tweets/TweetsList";

import * as tweetsActions from "../../store/actions/tweets";
import * as profileActions from "../../store/actions/profile";

import { appColors } from "../../constants/colors";

const UserTweets = ({ route, navigation }) => {
	const { username, userHandle } = route.params;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { usersTweets } = useSelector((state) => state.profile);
	const dispatch = useDispatch();

	const loadUsersTweetsResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(profileActions.get_user_tweets(userHandle));
			await dispatch(tweetsActions.get_who_to_follow(userHandle));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUsersTweetsResults().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadUsersTweetsResults]);

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
