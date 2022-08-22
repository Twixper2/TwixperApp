import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import PeopleList from "../people/PeopleList";

import * as followsActions from "../../store/actions/follows";

import { appColors } from "../../constants/colors";

const UserFollowers = ({ route, navigation }) => {
	const { username } = route.params;

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const { userFollowers } = useSelector((state) => state.follows);
	const dispatch = useDispatch();

	const loadUserFollowers = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await dispatch(followsActions.get_user_followers(username));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadUserFollowers().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadUserFollowers]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadUserFollowers} />
			</View>
		);
	}

	if (!isLoading && userFollowers.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Followers Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<PeopleList onRefresh={loadUserFollowers} isLoading={isLoading} data={userFollowers} />
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

export default UserFollowers;
