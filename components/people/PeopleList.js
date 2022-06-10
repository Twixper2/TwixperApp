import { StyleSheet, FlatList, View, ActivityIndicator } from "react-native";

import PersonPreview from "./PersonPreview";

import { appColors } from "../../constants/colors";

const PeopleList = ({ data, onRefresh, isLoading }) => {
	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="small" color={appColors.iconColor} />
			</View>
		);
	}

	return (
		<View style={styles.peopleList}>
			<FlatList
				onRefresh={onRefresh}
				refreshing={isLoading}
				data={data}
				keyExtractor={(item) => item.userHandle}
				renderItem={(itemData) => <PersonPreview personData={itemData.item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	peopleList: {
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

export default PeopleList;
