import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";

import Tweet from "../tweets/Tweet";

const TweetsSearchResults = () => {
	const searchResults = useSelector((state) => state.tweets.searchTweets);

	return (
		<View>
			<FlatList
				//  TODO: Hackathon- onRefresh Function
				// onRefresh={loadFeedTweets}
				// refreshing={isLoading}
				data={searchResults}
				keyExtractor={(item) => item.tweetId}
				renderItem={(itemData) => <Tweet tweetData={itemData.item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({});

export default TweetsSearchResults;
