import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import AlertNotification from "./AlertNotification";
import FollowerNotification from "./FollowerNotification";
import SuggestionsNotification from "./SuggestionsNotification";

import { appColors } from "../../constants/colors";
import {
	LIKE_NOTIFICATION,
	ALERTS_NOTIFICATION,
	RETWEETED_NOTIFICATION,
	FOLLOWERS_NOTIFICATION,
	SUGGESTIONS_NOTIFICATION,
} from "../../constants/notificationTypes";

const NotificationsList = ({ data, onRefresh, isLoading }) => {
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	const renderItem = ({ item }) => {
		if (item.notificationType === LIKE_NOTIFICATION) {
			return <></>;
		} else if (item.notificationType === ALERTS_NOTIFICATION) {
			return <AlertNotification notificationData={item} />;
		} else if (item.notificationType === RETWEETED_NOTIFICATION) {
			return <></>;
		} else if (item.notificationType === FOLLOWERS_NOTIFICATION) {
			return <FollowerNotification notificationData={item} />;
		} else if (item.notificationType === SUGGESTIONS_NOTIFICATION) {
			return <SuggestionsNotification notificationData={item} />;
		}
	};

	return (
		<View style={styles.notificationsList}>
			<FlatList
				onRefresh={onRefresh}
				refreshing={isLoading}
				data={data}
				keyExtractor={(item) => item.notificationID}
				renderItem={renderItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	notificationsList: {
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

export default NotificationsList;
