import { StyleSheet, Text, View } from "react-native";

import PressableText from "../../components/UI/PressableText";

const FollowersScreen = (props) => {
	const { navigation } = props;

	const onPressFollowers = () => {
		navigation.goBack();
	};

	return (
		<View>
			<Text>This is FollowersScreen !!</Text>
			<PressableText onPress={onPressFollowers} textContainer={styles.textContainer} textStyle={styles.textStyle}>
				Pressable Text!
			</PressableText>
		</View>
	);
};

const styles = StyleSheet.create({
	textContainer: {
		// flex: 1,
		// justifyContent: "center",
		alignItems: "baseline",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
	},
});

export default FollowersScreen;
