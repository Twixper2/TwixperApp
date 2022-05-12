import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { getHeaderTitle, getDefaultHeaderHeight } from "@react-navigation/elements";

const CustomHeader = ({ navigation, route, options, layout, imageUri }) => {
	const title = getHeaderTitle(options, route.name);

	console.log("***********************\n\n");
	console.log(navigation);
	console.log(route);
	console.log(options);
	console.log(layout);
	console.log(imageUri);
	console.log(title);

	return (
		<View style={[options.headerStyle, { display: "flex", flexDirection: "row", alignItems: "center", height: 75, paddingHorizontal: 15, paddingTop: 10 }]}>
			<TouchableOpacity onPress={() => navigation.openDrawer()}>
				<Image style={{ width: 35, height: 35, borderRadius: 50 }} source={{ uri: imageUri }} />
			</TouchableOpacity>
			<View style={{ marginLeft: 15 }}>
				<Text style={{ color: options.headerTintColor, fontSize: 16, fontWeight: "bold" }}>{title}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({});

export default CustomHeader;
