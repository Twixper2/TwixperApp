import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import NotificationsList from "../../components/notifications/NotificationsList";

// import * as tweetsActions from "../../store/actions/tweets";

import { appColors } from "../../constants/colors";

const NotificationsScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	// const { usersTweets } = useSelector((state) => state.tweets.profile);
	const dispatch = useDispatch();

	const usersNotifications = [
		{
			notificationType: "Alerts",
			notificationID: "1",
		},
		{
			notificationType: "Followers",
			notificationID: "2",
		},
		{
			notificationType: "Suggestions",
			notificationID: "3",
		},
	];

	const loadNotifications = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			// await dispatch(tweetsActions.get_user_tweets(username));
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [dispatch, setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadNotifications().then(() => {
			setIsLoading(false);
		});
	}, [dispatch, loadNotifications]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadNotifications} />
			</View>
		);
	}

	if (!isLoading && usersNotifications.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Tweets Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<NotificationsList onRefresh={loadNotifications} isLoading={isLoading} data={usersNotifications} />
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

export default NotificationsScreen;
