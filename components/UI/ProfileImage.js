import { TouchableOpacity, Image } from "react-native";

const ProfileImage = ({ onPress, imageStyle, imageUri }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Image style={imageStyle} source={{ uri: imageUri }} />
		</TouchableOpacity>
	);
};

export default ProfileImage;
