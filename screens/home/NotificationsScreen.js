import { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Button } from "react-native";

import NotificationsList from "../../components/notifications/NotificationsList";

import * as tweetsActions from "../../utils/actions/tweets";

import { appColors } from "../../constants/colors";
import { getObjectValue } from "../../utils/storageFunctions";
import { collationNames, tweetsKeys } from "../../constants/commonKeys";

const NotificationsScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);
	const [error, setError] = useState();
	const [notifications, setNotifications] = useState([]);

	const loadNotifications = useCallback(async () => {
		setError(null);
		setIsRefreshing(true);
		try {
			await tweetsActions.get_notifications();
			let notificationsArr = await getObjectValue(collationNames.TWEETS + tweetsKeys.NOTIFICATIONS);
			setNotifications(notificationsArr);
		} catch (err) {
			setError(err);
		}
		setIsRefreshing(false);
	}, [setIsLoading, setError]);

	useEffect(() => {
		setIsLoading(true);
		loadNotifications().then(() => {
			setIsLoading(false);
		});
	}, [loadNotifications]);

	if (error) {
		return (
			<View style={styles.centered}>
				<Text>An error occurred!</Text>
				<Button title="Try again" onPress={loadNotifications} />
			</View>
		);
	}

	if (!isLoading && notifications.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No User Tweets Result Found.</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<NotificationsList onRefresh={loadNotifications} isLoading={isLoading} data={notifications} />
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
