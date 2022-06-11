import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PeopleList from "../people/PeopleList";

import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const WhoToFollow = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { whoToFollow } = useSelector((state) => state.tweets);
	const { username } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const loadWhoToFollow = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(tweetsActions.get_who_to_follow(username));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

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
