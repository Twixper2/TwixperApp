import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TweetsList from "../tweets/TweetsList";

import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const UserLikes = ({ route, navigation }) => {
	const { username } = route.params;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { usersLikes } = useSelector((state) => state.tweets.profile);
	const dispatch = useDispatch();

	const loadUsersLikesResults = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(tweetsActions.get_user_likes(username));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUsersLikesResults().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadUsersLikesResults]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUsersLikesResults} />
			</View>
		);
	}

	if (!isLoading && usersLikes.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Likes Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<TweetsList onRefresh={loadUsersLikesResults} isLoading={isLoading} data={usersLikes} />
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

export default UserLikes;
