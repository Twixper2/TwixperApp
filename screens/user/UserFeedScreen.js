import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Button, StyleSheet, Platform, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Tweet from "../../components/tweets/Tweet";
import Tweet2 from "../../components/tweets/Tweet2";

import * as tweetsActions from "../../store/actions/tweets";

const UserFeedScreen = (props) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const feedTweetsArr = useSelector((state) => state.tweets.feedTweets);
	const dispatch = useDispatch();

	const loadFeedTweets = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(tweetsActions.get_feed_tweets());
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	// useEffect(() => {
	// 	const willFocusSub = props.navigation.addListener("willFocus", loadFeedTweets);

	// 	return () => {
	// 		willFocusSub.remove();
	// 	};
	// }, [loadFeedTweets]);

	useEffect(() => {
		setIsLoading(true);
		loadFeedTweets().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadFeedTweets]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadFeedTweets} />
			</View>
		);
	}

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!isLoading && feedTweetsArr.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No Feed Tweets found.</Text>
			</View>
		);
	}

	return (
		<View>
			<View style={styles.menuBar}></View>
			<View style={styles.writeNewTweet}></View>
			<View style={styles.tweetsList}>
				<FlatList
					//  TODO: onRefresh Function
					onRefresh={loadFeedTweets}
					refreshing={isLoading}
					data={feedTweetsArr}
					keyExtractor={(item) => item.tweetId}
					renderItem={(itemData) => <Tweet2 tweetData={itemData.item} />}
				/>
			</View>
		</View>
	);
};

UserFeedScreen.navigationOptions = (navData) => {
	return {
		headerTitle: "",
	};
};

const styles = StyleSheet.create({
	menuBar: {},
	writeNewTweet: {},
	tweetsList: {
		// height: "90%",
		display: "flex",
		justifyContent: "center",
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default UserFeedScreen;
