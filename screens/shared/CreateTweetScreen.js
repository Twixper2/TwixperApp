import { StyleSheet, View, Image, TextInput } from "react-native";
import { useSelector } from "react-redux";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import { appColors } from "../../constants/colors";

//  TODO: opPress?

const CreateTweetScreen = (props) => {
	const { navigation } = props;

	const userEntityData = useSelector((state) => state.auth.userTwitterEntity);
	const { profileImageUrlHttps } = userEntityData;

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<View style={styles.imageContainer}>
					<Image onPress={() => navigation.navigate("DrawerToggle")} source={{ uri: profileImageUrlHttps }} style={styles.image} />
				</View>
				<View style={styles.inputContainer}>
					<TextInput
						multiline={true}
						numberOfLines={0}
						style={styles.textInput}
						underlineColorAndroid="transparent"
						placeholder="What's happening?"
						placeholderTextColor="rgb(136, 153, 166)"
					/>
				</View>
			</View>
			<View style={styles.bottomContainer}>
				<FontAwesome name={"photo"} color={appColors.iconColor} size={26} />

				<MaterialIcons name="gif" color={appColors.iconColor} size={20} style={styles.gifIcon} />

				<FontAwesome5 name={"poll-h"} color={appColors.iconColor} size={26} />

				<SimpleLineIcons name={"location-pin"} color={appColors.iconColor} size={26} />

				<Feather name={"circle"} color="gray" size={26} />

				<MaterialCommunityIcons name="plus-circle" color={appColors.iconColor} style={styles.plusIcon} size={26} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: appColors.screenBackgroundColor,
		borderColor: "red",
		borderWidth: 0,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	imageContainer: {
		flex: 0.2,
		borderColor: "red",
		borderWidth: 0,
		height: 100,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 50,
	},
	inputContainer: {
		flex: 0.8,
		borderColor: "red",
		borderWidth: 0,
		padding: 0,
		marginTop: 20,
	},
	textInput: {
		height: "auto",
		width: "100%",
		marginTop: 15,
		color: "white",
		borderColor: "red",
		borderWidth: 0,
	},
	bottomContainer: {
		padding: 10,
		width: "100%",
		alignSelf: "baseline",
		elevation: 8,
		backgroundColor: appColors.backgroundColor,
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignContent: "center",
		alignItems: "center",
	},
	gifIcon: {
		borderWidth: 1.5,
		borderColor: appColors.iconColor,
		padding: 2,
		borderRadius: 3,
	},
	plusIcon: {
		borderLeftColor: "black",
		borderLeftWidth: 0.8,
		paddingLeft: 15,
	},
});

export default CreateTweetScreen;
