import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TweetsList from "../tweets/TweetsList";

import { appColors } from "../../constants/colors";

const TweetsSearchResults = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const searchResults = useSelector((state) => state.tweets.searchTweets);
	const dispatch = useDispatch();

	const loadSearchTweetsResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			console.log("TODO!");
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadSearchTweetsResults().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadSearchTweetsResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadSearchTweetsResults} />
			</View>
		);
	}

	if (!isLoading && searchResults.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Search Tweets Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList onRefresh={loadSearchTweetsResults} isLoading={isLoading} data={searchResults} />
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
		backgroundColor: "rgb(27, 40, 54)",
	},
});

export default TweetsSearchResults;
