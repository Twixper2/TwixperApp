import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";

const PushNotifications = () => {
	const scheduleNotificationHandler = () => {
		Notifications.scheduleNotificationAsync({
			content: {
				title: "My first local notification",
				body: "This is the body og the notification.",
				data: {
					userName: "max",
				},
			},
			trigger: {
				seconds: 5,
			},
		});
	};

	return (
		<View style={styles.container}>
			<Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default PushNotifications;
