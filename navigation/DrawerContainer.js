import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
// import { NavigationActions, DrawerActions } from "react-navigation";
import { DrawerActions } from "@react-navigation/native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const DrawerContainer = (props) => {
	const { navigation, userData } = props;

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.headerContainer}>
					<Text style={styles.accountInfo}>Account info</Text>
					<Ionicons name="close" size={23} color="white" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
				</View>

				<Image onPress={() => props.navigation.navigate("Profile")} source={{ uri: userData.profile_image_url_https }} style={styles.photo} />

				<Text style={styles.userName}>{userData.name} </Text>
				<Text style={styles.userHandle}>@{userData.screen_name} </Text>

				<View style={styles.followCountsContainer}>
					<Text style={styles.followingCount}>
						{userData.friends_count} <Text style={styles.followingText}> Following</Text>
					</Text>
					<Text style={styles.followersCount}>
						{userData.followers_count} <Text style={styles.followersText}> Followers</Text>
					</Text>
				</View>
			</View>

			<ScrollView>
				<TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())} style={[styles.list, styles.firstList]}>
					<View>
						<FontAwesome style={styles.icon} name="user-o" size={20} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Profile </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => props.navigation.navigate("Site")} style={styles.list}>
					<View>
						<Ionicons style={styles.icon} name="list-outline" size={20} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Lists </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list}>
					<View>
						<FontAwesome style={styles.icon} name="bookmark-o" size={20} color="rgb(136, 153, 166)" />
						<Text onPress={() => navigation.navigate("Profile")} style={styles.text}>
							{" "}
							Bookmarks{" "}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.list,
						{
							borderBottomWidth: 0.3,
							borderBottomColor: "black",
						},
					]}
				>
					<View>
						<Ionicons style={styles.icon} name="md-analytics" size={20} color="rgb(136, 153, 166)" />
						<Text onPress={() => navigation.navigate("Profile")} style={styles.text}>
							{" "}
							Moments{" "}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list}>
					<View>
						<MaterialCommunityIcons style={styles.icon} name="arrow-top-right" size={20} color="rgb(136, 153, 166)" />
						<Text onPress={() => navigation.navigate("Profile")} style={styles.text}>
							{" "}
							Twitter Ads{" "}
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list}>
					<View>
						<Text
							onPress={() => navigation.navigate("Profile")}
							style={[
								styles.text,
								{
									left: 20,
								},
							]}
						>
							Settings and privacy
						</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list}>
					<View>
						<Text
							onPress={() => navigation.navigate("Profile")}
							style={[
								styles.text,
								{
									left: 20,
								},
							]}
						>
							Help Centre
						</Text>
					</View>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgb(27, 42, 51)",
		paddingTop: 10,
	},
	list: {
		padding: 10,
		height: 60,
		borderColor: "red",
		borderWidth: 0,
	},
	text: {
		position: "absolute",
		left: "24%",
		top: 10,
		color: "white",
		fontSize: 16,
	},
	top: {
		paddingBottom: 40,
		paddingLeft: 30,
		marginBottom: 10,
	},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: 15,
		marginTop: 20,
		marginBottom: 10,
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 50,
		marginTop: 20,
	},
	accountInfo: {
		fontSize: 18,
		color: "white",
		fontWeight: "bold",
	},
	userName: {
		marginTop: 15,
		color: "white",
		fontWeight: "bold",
	},
	userHandle: {
		marginTop: 5,
		color: "rgb(136, 153, 166)",
		fontWeight: "300",
	},
	followCountsContainer: {
		marginTop: 15,
	},
	followingCount: {
		color: "white",
		position: "absolute",
		left: 0,
		top: 10,
		fontWeight: "bold",
	},
	followingText: {
		color: "rgb(136, 153, 166)",
		fontWeight: "300",
	},
	followersCount: {
		color: "white",
		position: "absolute",
		right: 30,
		top: 10,
		fontWeight: "bold",
	},
	followersText: {
		color: "rgb(136, 153, 166)",
		fontWeight: "300",
	},
	firstList: {
		marginTop: 0,
		borderTopWidth: 0.3,
		borderTopColor: "black",
		height: 60,
		borderTopWidth: 0.3,
		borderTopColor: "black",
	},
	icon: {
		position: "absolute",
		left: 20,
		top: 10,
	},
});

export default DrawerContainer;
