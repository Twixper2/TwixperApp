import { useState } from "react";
import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";
import uuid from "react-native-uuid";

import Tweet from "./Tweet";
import WhoToFollow from "../people/WhoToFollow";

import { appColors } from "../../constants/colors";

const TweetsList = ({ data, onRefresh, isLoading, withWhoToFollow }) => {
	const [whoToAdded, setWhoToAdded] = useState(false);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	if (!whoToAdded && withWhoToFollow) {
		data.splice(5, 0, { tweetId: false, whoToFollowId: uuid.v4() });
		setWhoToAdded(true);
	} else if (whoToAdded && withWhoToFollow) {
		data.splice(5, 1, { tweetId: false, whoToFollowId: uuid.v4() });
	}
	return (
		<View style={styles.tweetsList}>
			<FlatList
				onRefresh={onRefresh}
				refreshing={isLoading}
				data={data}
				keyExtractor={(item) => (item.tweetId ? item.tweetId : item.whoToFollowId)}
				renderItem={(itemData) => (
					<View>{itemData.item?.tweetId ? <Tweet tweetData={itemData.item} /> : <WhoToFollow />}</View>
				)}
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
