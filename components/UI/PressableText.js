import { StyleSheet, Text, View, Pressable } from "react-native";

const PressableText = (props) => {
	const { onPress, textStyle } = props;

	return (
		<Pressable onPress={onPress}>
			{({ pressed }) => (
				<View>
					<Text style={[textStyle, pressed && styles.pressed]}>{props.children}</Text>
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
