import { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import TweetsList from "../../components/tweets/TweetsList";

import * as tweetsActions from "../../utils/actions/tweets";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, tweetsKeys } from "../../constants/commonKeys";

const HomeScreen = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const [feedTweetsArr, setFeedTweetsArr] = useState([]);

	const loadFeedTweets = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await tweetsActions.get_feed_tweets();
			let feedTweets = await getObjectValue(collationNames.TWEETS + tweetsKeys.FEED_TWEETS);
			setFeedTweetsArr(feedTweets);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadFeedTweets().then(() => {
			setIsLoading(false);
		});
	}, [loadFeedTweets]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadFeedTweets} />
			</View>
		);
	}

	if (!isLoading && feedTweetsArr?.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Feed Tweets found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList onRefresh={loadFeedTweets} isLoading={isLoading} data={feedTweetsArr} />
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

export default HomeScreen;
