import { StyleSheet, Text, View, Pressable } from "react-native";

const PressableText = (props) => {
	const { onPress, textStyle } = props;

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => {
				pressed && styles.pressed;
			}}
		>
			{({ pressed }) => (
				<View style={pressed && styles.pressed}>
					<Text style={textStyle}>{props.children}</Text>
				</View>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	pressed: {
		opacity: 0.5,
	},
});

export default PressableText;
