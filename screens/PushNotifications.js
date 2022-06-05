import { Alert, Button, StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldPlaySound: false,
			shouldSetBadge: false,
			shouldShowAlert: true,
		};
	},
});

const PushNotifications = () => {
	useEffect(() => {
		async function configurePushNotifications() {
			const { status } = await Notifications.getPermissionsAsync();
			let finalStatus = status;

			if (finalStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				Alert.alert("Permission required", "Push notifications need the appropriate permissions.");
				return;
			}

			const pushTokenData = await Notifications.getExpoPushTokenAsync();
			console.log(pushTokenData);

			if (Platform.OS === "android") {
				Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.DEFAULT,
				});
			}
		}

		configurePushNotifications();
	}, []);

	useEffect(() => {
		const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
			console.log("NOTIFICATION RECEIVED");
			console.log(notification);
			const userName = notification.request.content.data.userName;

			console.log(userName);
		});

		const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
			console.log("NOTIFICATION RESPONSE RECEIVED");
			console.log(response);
			const userName = response.notification.request.content.data.userName;

			console.log(userName);
		});

		return () => {
			subscription1.remove();
			subscription2.remove();
		};
	}, []);

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

	const sendPushNotificationHandler = () => {
		fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				to: "ExponentPushToken[aNQBtRFekzsFU568p91WMg]",
				title: "Test - sent from a device!",
				body: "This is a test!",
			}),
		});
	};

	return (
		<View style={styles.container}>
			<Button title="Schedule Notification" onPress={scheduleNotificationHandler} />
			<Button title="Send Push Notification" onPress={sendPushNotificationHandler} />
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
