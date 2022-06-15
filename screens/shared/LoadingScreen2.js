import { View, StyleSheet, ActivityIndicator } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { appColors } from "../../constants/colors";

const LoadingScreen2 = () => {
	return (
		<View style={styles.centered}>
			<View style={{ margin: 15 }}>
				<Entypo
					name={"twitter"}
					size={70}
					style={{
						alignSelf: "center",
						color: appColors.iconColor,
					}}
				/>
			</View>
			<View style={{ margin: 15 }}>
				<ActivityIndicator size="large" color={appColors.iconColor} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		backgroundColor: appColors.loginScreensBackground,
	},
	logo: {
		alignSelf: "center",
		color: appColors.iconColor,
	},
});

export default LoadingScreen2;
