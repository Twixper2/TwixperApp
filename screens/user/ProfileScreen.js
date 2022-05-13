import { StyleSheet, Text, View } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const ProfileScreen = (props) => {
	return (
		<View style={styles.container}>
			<Text>This is ProfileScreen !!</Text>

			<View style={[styles.header, { backgroundColor: "pink" }]}>
				<Ionicons name="arrow-back" size={30} color="white" style={styles.backButton} onPress={() => props.navigation.navigate("Home")} />

				<Text style={[styles.headerName, { color: "white" }]}>Maverick </Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "rgb(20, 29, 38)",
// 	},
// 	header: {
// 		minHeight: 60,
// 		flex: 0.1,
// 		borderColor: "red",
// 		borderWidth: 0,
// 		zIndex: 1000000000,
// 	},
// 	backButton: {
// 		backgroundColor: "transparent",
// 		position: "absolute",
// 		top: -5,
// 		left: -10,
// 		padding: 20,
// 		paddingLeft: 15,
// 	},
// 	headerName: {
// 		backgroundColor: "transparent",
// 		position: "absolute",
// 		top: 0,
// 		left: 50,
// 		padding: 20,
// 		paddingLeft: 15,
// 		fontWeight: "bold",
// 	},
// 	menuIcon: {
// 		color: "white",
// 		position: "absolute",
// 		top: 20,
// 		right: 20,
// 	},
// 	topContainer: {
// 		top: -height + 100,
// 		zIndex: 2,
// 		justifyContent: "center",
// 		alignItems: "center",
// 		backgroundColor: "yellow",
// 		width: 100,
// 		alignSelf: "center",
// 	},
// 	banner: {
// 		position: "absolute",
// 		height: 380,
// 		borderColor: "red",
// 		borderWidth: 0,
// 		width: width,
// 		top: 0,
// 		justifyContent: "flex-end",
// 		flexDirection: "column",
// 	},
// 	topBannerContainer: {
// 		flex: 1,
// 		borderColor: "yellow",
// 		borderWidth: 0,
// 	},
// 	bannerImageContainer: {
// 		flex: 0.25,
// 		borderColor: "red",
// 		borderWidth: 0,
// 	},
// 	info: {
// 		flex: 0.75,
// 		borderColor: "blue",
// 		flexDirection: "column",
// 		borderWidth: 0,
// 	},
// 	infoTop: {
// 		borderColor: "red",
// 		flexDirection: "row",
// 		borderWidth: 0,
// 		justifyContent: "space-between",
// 		padding: 10,
// 		paddingLeft: 15,
// 		paddingRight: 15,
// 	},
// 	editProfileButton: {
// 		backgroundColor: "transparent",
// 		borderColor: "rgb(29, 161, 242)",
// 		borderWidth: 1,
// 		borderRadius: 25,
// 		padding: 6,
// 		width: 100,
// 	},
// 	editProfileButtonText: {
// 		color: "rgb(136, 153, 166)",
// 		fontWeight: "bold",
// 		backgroundColor: "transparent",
// 		fontSize: 14,
// 	},
// 	nameAndHandle: {
// 		borderColor: "red",
// 		flexDirection: "column",
// 		borderWidth: 0,
// 		justifyContent: "space-between",
// 		paddingLeft: 15,
// 	},
// 	name: { color: "white", fontWeight: "bold", fontSize: 18 },
// 	handle: { color: "rgb(136, 153, 166)", fontWeight: "bold", fontSize: 14 },
// 	bio: {
// 		flexDirection: "column",
// 		justifyContent: "space-between",
// 		padding: 5,
// 		paddingLeft: 15,
// 	},
// 	cityAndLinkContainer: {
// 		flexDirection: "row",
// 		justifyContent: "flex-start",
// 		padding: 5,
// 		paddingLeft: 15,
// 	},
// 	city: { color: "rgb(29, 161, 242)", fontSize: 14, marginLeft: 15 },
// 	link: { color: "rgb(29, 161, 242)", fontSize: 14, marginLeft: 15 },
// 	dobContainer: {
// 		flexDirection: "row",
// 		justifyContent: "flex-start",
// 		padding: 5,
// 		paddingLeft: 15,
// 	},
// 	dob: { color: "rgb(136, 153, 166)", fontSize: 14, marginLeft: 10 },
// 	followingAndFollowersContainer: {
// 		flexDirection: "row",
// 		justifyContent: "flex-start",
// 		padding: 5,
// 		paddingLeft: 15,
// 	},
// 	followingContainer: {
// 		flexDirection: "row",
// 		justifyContent: "flex-start",
// 		marginRight: 15,
// 	},
// 	followingCount: { color: "white", fontWeight: "bold" },
// 	followingText: {
// 		color: "rgb(136, 153, 166)",
// 		fontWeight: "300",
// 		marginLeft: 5,
// 	},
// 	followersContainer: { flexDirection: "row" },
// 	followersCount: { color: "white", fontWeight: "bold" },
// 	followersText: {
// 		color: "rgb(136, 153, 166)",
// 		fontWeight: "300",
// 		marginLeft: 0,
// 	},
// 	userPhoto: {
// 		width: 70,
// 		height: 70,
// 		borderRadius: 55,
// 		zIndex: 1000000000000,
// 		borderWidth: 0,
// 		borderColor: "black",
// 		resizeMode: "cover",
// 	},
// });

export default ProfileScreen;
