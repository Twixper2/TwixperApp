import { useEffect } from "react";
import { StatusBar, View, StyleSheet } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { appColors } from "../../constants/colors";

const LoadingScreen = (props) => {
	// useEffect(() => {
	// 	setTimeout(() => {
	// 		props.navigation.navigate("App");
	// 	}, 500); /** Navigate to App Screen in 0.5s **/
	// });

	return (
		<View style={styles.container}>
			{/* <StatusBar barStyle="default" color={appColors.screenBackgroundColor} /> */}
			<Entypo name={"twitter"} size={70} style={styles.logo} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: appColors.screenBackgroundColor,
	},
	logo: {
		alignSelf: "center",
		color: appColors.iconColor,
	},
});

export default LoadingScreen;
