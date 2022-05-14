import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { DrawerActions } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

//  TODO: onPress => Navigate
const DrawerContainer = (props) => {
	const { navigation, userData } = props;

	const navigateToProfile = () => {
		navigation.navigate("Profile");
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.headerContainer}>
					<Text style={styles.accountInfo}>Account info</Text>
					<Ionicons name="close" size={23} color="white" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
				</View>

				<TouchableOpacity onPress={navigateToProfile} style={[styles.photoContainer, styles.photo]}>
					<Image source={{ uri: userData.profile_image_url_https }} style={styles.photo} />
				</TouchableOpacity>

				<TouchableOpacity onPress={navigateToProfile}>
					<Text style={styles.userName}>{userData.name}</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={navigateToProfile}>
					<Text style={styles.userHandle}>@{userData.screen_name}</Text>
				</TouchableOpacity>

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
				<TouchableOpacity style={styles.list}>
					<View>
						<Ionicons style={styles.icon} name="settings-outline" size={24} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Settings and privacy</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list}>
					<View>
						<MaterialCommunityIcons style={styles.icon} name="help-circle-outline" size={24} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Help Center</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.list, styles.firstList]}>
					<View>
						<Text style={[styles.text, { left: 20 }]}> Log out</Text>
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
	bottomText: {
		left: 20,
	},
	headerContainer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginRight: 15,
		marginTop: 20,
		marginBottom: 10,
	},
	photoContainer: {
		marginTop: 20,
	},
	photo: {
		width: 50,
		height: 50,
		borderRadius: 50,
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
		marginTop: 10,
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
		height: 60,
		marginTop: 0,
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
