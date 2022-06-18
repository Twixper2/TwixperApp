import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TweetsList from "../../components/tweets/TweetsList";

import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const TweetScreen = ({ route, navigation }) => {
	const mainTweet = route.params.data;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { tweetsComments } = useSelector((state) => state.tweets.tweetScreen);
	const dispatch = useDispatch();

	const loadTweetsComments = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(tweetsActions.get_tweet_screen(mainTweet));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadTweetsComments().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadTweetsComments]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadTweetsComments} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList
				onRefresh={loadTweetsComments}
				isLoading={isLoading}
				data={[{ tweetId: mainTweet.tweetId, tweetData: mainTweet }, ...tweetsComments]}
				withWhoToFollow={false}
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

export default TweetScreen;
