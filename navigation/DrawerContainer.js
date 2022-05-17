import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import PressableText from "../components/UI/PressableText";

//  TODO: Logout
const DrawerContainer = (props) => {
	const { navigation, userData } = props;

	const navigateTo = (screen) => {
		navigation.navigate(screen);
	};

	return (
		<View style={styles.container}>
			<View style={styles.top}>
				<View style={styles.headerContainer}>
					<Text style={styles.accountInfo}>Account info</Text>
					<Ionicons name="close" size={23} color="white" onPress={() => navigation.closeDrawer()} />
				</View>

				<TouchableOpacity onPress={navigateTo.bind(this, "Profile")} style={[styles.photoContainer, styles.photo]}>
					<Image source={{ uri: userData.profileImageUrlHttps }} style={styles.photo} />
				</TouchableOpacity>

				<View style={styles.usernameContainer}>
					<PressableText onPress={navigateTo.bind(this, "Profile")} textStyle={styles.userName}>
						{userData.name}
					</PressableText>
					<PressableText onPress={navigateTo.bind(this, "Profile")} textStyle={styles.userHandle}>
						@{userData.screenName}
					</PressableText>
				</View>

				<View style={styles.followContainer}>
					<PressableText onPress={navigateTo.bind(this, "Following")} textStyle={styles.followText}>
						{userData.friendsCount} <Text style={styles.followLightText}> Following</Text>
					</PressableText>

					<PressableText onPress={navigateTo.bind(this, "Followers")} textStyle={styles.followText}>
						{userData.followersCount} <Text style={styles.followLightText}> Followers</Text>
					</PressableText>
				</View>
			</View>

			<ScrollView>
				<TouchableOpacity onPress={navigateTo.bind(this, "Profile")} style={[styles.list, styles.firstList]}>
					<View>
						<FontAwesome style={styles.icon} name="user-o" size={20} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Profile </Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list} disabled={true}>
					<View style={{ opacity: 0.5 }}>
						<Ionicons style={styles.icon} name="settings-outline" size={24} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Settings and privacy</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={styles.list} disabled={true}>
					<View style={{ opacity: 0.5 }}>
						<MaterialCommunityIcons style={styles.icon} name="help-circle-outline" size={24} color="rgb(136, 153, 166)" />
						<Text style={styles.text}> Help Center</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Alert.alert("TODO", "Implement Logout", [{ text: "Okay" }]);
					}}
					style={[styles.list, styles.firstList]}
				>
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
		paddingBottom: 20,
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
	usernameContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "baseline",
		justifyContent: "space-between",
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
	followContainer: {
		display: "flex",
		flexDirection: "row",
		alignContent: "flex-start",
		justifyContent: "space-between",
		marginRight: 10,
		marginTop: 15,
	},
	followText: {
		color: "white",
		fontWeight: "bold",
	},
	followLightText: {
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
