import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import Tweet from "./Tweet";

const TweetsList = ({ data, onRefresh, isLoading }) => {
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color="rgb(29, 161, 242)" />
			</View>
		);
	}

	return (
		<View style={styles.tweetsList}>
			<FlatList
				onRefresh={onRefresh}
				refreshing={isLoading}
				data={data}
				keyExtractor={(item) => item.tweetId}
				renderItem={(itemData) => <Tweet tweetData={itemData.item} />}
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
		backgroundColor: "rgb(27, 40, 54)",
	},
});

export default TweetsList;
