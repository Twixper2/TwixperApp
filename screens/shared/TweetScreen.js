import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import TweetsList from "../../components/tweets/TweetsList";

import * as tweetsActions from "../../utils/actions/tweets";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, tweetsKeys } from "../../constants/commonKeys";

const TweetScreen = ({ route, navigation }) => {
	const mainTweet = route.params.data;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const [tweetsComments, setTweetsComments] = useState([]);

	const loadTweetsComments = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await tweetsActions.get_tweet_screen(mainTweet);
			let tweetScreen = await getObjectValue(collationNames.TWEETS + tweetsKeys.TWEET_SCREEN + mainTweet.tweetId);
			setTweetsComments(tweetScreen.tweetsComments);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadTweetsComments().then(() => {
			setIsLoading(false);
		});
	}, [loadTweetsComments]);

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
				data={[{ tweetId: mainTweet.tweetId, tweetData: mainTweet, isMainTweet: true }, ...tweetsComments]}
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
