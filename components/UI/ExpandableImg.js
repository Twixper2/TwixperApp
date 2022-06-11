import { TouchableOpacity, Image, Dimensions } from "react-native";

const ExpandableImg = ({ onPress, mediaData, pixelMedia }) => {
	const { media_url_https, sizes } = mediaData;

	const urlParams = new URLSearchParams(media_url_https);

	const imageSize = urlParams.get("name");

	const imageStyle = {
		height: sizes[imageSize].h,
		width: sizes[imageSize].w,
		// resizeMode: sizes[imageSize].resize,
		resizeMode: "center",
	};

	return (
		<TouchableOpacity onPress={onPress}>
			<Image style={imageStyle} source={{ uri: media_url_https }} blurRadius={pixelMedia ? 7 : undefined} />
		</TouchableOpacity>
	);
};

export default ExpandableImg;
