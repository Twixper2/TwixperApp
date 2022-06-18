import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import Tweet from "./Tweet";
import WhoToFollow from "../people/WhoToFollow";

import { appColors } from "../../constants/colors";
import MainTweet from "./MainTweet";

const TweetsList = ({ data, onRefresh, isLoading, withWhoToFollow }) => {
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	let tweetsArr;

	if (withWhoToFollow) {
		tweetsArr = JSON.parse(JSON.stringify(data));
		tweetsArr.splice(Math.floor(Math.random() * data.length), 0, { whoToFollowId: true });
	} else {
		tweetsArr = data;
	}

	const extractKey = (item) => {
		if ("whoToFollowId" in item) {
			return item.whoToFollowId;
		} else {
			return item.tweetId;
		}
	};

	const renderItem = ({ item }) => {
		if ("whoToFollowId" in item) {
			return <WhoToFollow />;
		} else if ("isMainTweet" in item) {
			return <MainTweet tweetData={item.tweetData} />;
		} else {
			return <Tweet tweetData={item} />;
		}
	};

	return (
		<View style={styles.tweetsList}>
			<FlatList
				onRefresh={onRefresh}
				refreshing={isLoading}
				data={tweetsArr}
				keyExtractor={extractKey}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	tweetsList: {
		// height: "90%",
		display: "flex",
		justifyContent: "center",
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

export default TweetsList;
