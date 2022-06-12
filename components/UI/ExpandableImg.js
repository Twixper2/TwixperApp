import { TouchableOpacity, Image, Dimensions } from "react-native";
import { useState } from "react";

const ExpandableImg = ({ onPress, mediaData, pixelMedia }) => {
	const { media_url_https, sizes } = mediaData;

	const urlParams = new URLSearchParams(media_url_https);
	const imageSize = urlParams.get("name");

	const normalImgSize = {
		height: sizes[imageSize].h,
		width: sizes[imageSize].w,
		// resizeMode: sizes[imageSize].resize,
		resizeMode: "center",
	};

	const explantedImgSize = {
		height: Dimensions.get("window").height,
		width: Dimensions.get("window").width,
		// resizeMode: sizes[imageSize].resize,
		resizeMode: "cover",
	};

	const normalContainerStyle = {
		flex: 1,
	};

	const explantedContainerStyle = {
		flex: 1,
		height: "100%",
		width: "100%",
		alignItems: "stretch",
	};

	const [imageStyle, setImageStyle] = useState(normalImgSize);
	const [containerStyle, setContainerStyle] = useState(normalContainerStyle);
	const [isExpanded, setIsExpanded] = useState(false);

	const onImagePressHandler = () => {
		if (isExpanded) {
			setImageStyle(normalImgSize);
			setContainerStyle(normalContainerStyle);
			setIsExpanded(false);
		} else {
			setImageStyle(explantedImgSize);
			setContainerStyle(explantedContainerStyle);
			setIsExpanded(true);
		}
	};

	// const imageStyle = {
	// 	height: sizes[imageSize].h,
	// 	width: sizes[imageSize].w,
	// 	// resizeMode: sizes[imageSize].resize,
	// 	resizeMode: "center",
	// };

	return (
		<TouchableOpacity onPress={onImagePressHandler} style={containerStyle}>
			<Image style={imageStyle} source={{ uri: media_url_https }} blurRadius={pixelMedia ? 7 : undefined} />
		</TouchableOpacity>
	);
};

export default ExpandableImg;
