import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import PeopleList from "../people/PeopleList";

import * as tweetsActions from "../../utils/actions/tweets";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, tweetsKeys } from "../../constants/commonKeys";

const WhoToFollow = ({ route, navigation }) => {
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [whoToFollow, setWhoToFollow] = useState([]);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const loadWhoToFollow = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			let whoToFollowArr = await getObjectValue(collationNames.TWEETS + tweetsKeys.WHO_TO_FOLLOW);
			setWhoToFollow(whoToFollowArr);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadWhoToFollow().then(() => {
			setIsLoading(false);
		});
	}, [loadWhoToFollow]);

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<Text style={styles.text}>Who to follow</Text>
				<PeopleList onRefresh={loadWhoToFollow} isLoading={isLoading} data={whoToFollow} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: appColors.screenBackgroundColor,
	},
	container: {
		backgroundColor: appColors.screenBackgroundColor,
		borderColor: appColors.silverBorderColor,
		borderWidth: 0.5,
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
	text: {
		fontSize: 20,
		color: "white",
		fontWeight: "bold",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
});

export default WhoToFollow;
