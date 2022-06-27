import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TweetsList from "../tweets/TweetsList";

import * as tweetsActions from "../../utils/actions/tweets";
import * as searchActions from "../../utils/actions/search";

import { appColors } from "../../constants/colors";
import { getStringValue, getObjectValue } from "../../utils/storageFunctions";
import { collationNames, searchKeys, localStorageKeys } from "../../constants/commonKeys";

const TweetsSearchResults = () => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [tweetsResults, setTweetsResults] = useState([]);

	const loadSearchTweetsResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			let searchQuery = await getStringValue(collationNames.SEARCH + searchKeys.QUERY);
			let username = await getStringValue(collationNames.SEARCH + localStorageKeys.USERNAME);

			await searchActions.get_search_tweets(searchQuery);
			let searchTweetsArr = await getObjectValue(collationNames.SEARCH + searchKeys.TWEETS_RESULTS + searchQuery);

			await tweetsActions.get_who_to_follow(username);
			setTweetsResults(searchTweetsArr.tweetsResults);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadSearchTweetsResults().then(() => {
			setIsLoading(false);
		});
	}, [loadSearchTweetsResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadSearchTweetsResults} />
			</View>
		);
	}

	if (!isLoading && tweetsResults.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Search Tweets Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList
				onRefresh={loadSearchTweetsResults}
				isLoading={isLoading}
				data={tweetsResults}
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

export default TweetsSearchResults;
