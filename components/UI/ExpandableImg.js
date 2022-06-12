import { useState } from "react";
import { Image } from "react-native";

import Lightbox from "react-native-lightbox";

import { appColors } from "../../constants/colors";

const ExpandableImg = ({ onPress, mediaData, pixelMedia }) => {
	const { media_url_https, sizes } = mediaData;

	const urlParams = new URLSearchParams(media_url_https);
	const imageSize = urlParams.get("name");

	const normalImgSize = {
		flex: 1,
		height: sizes[imageSize].h * 0.5,
		width: sizes[imageSize].w * 0.5,
	};

	const [imageStyle, setImageStyle] = useState(normalImgSize);

	// const imageStyle = {
	// 	height: sizes[imageSize].h,
	// 	width: sizes[imageSize].w,
	// 	// resizeMode: sizes[imageSize].resize,
	// 	resizeMode: "center",
	// };

	return (
		<Lightbox underlayColor={appColors.screenBackgroundColor} navigator={false}>
			<Image
				style={imageStyle}
				resizeMode="contain"
				source={{ uri: media_url_https }}
				blurRadius={pixelMedia ? 7 : undefined}
			/>
		</Lightbox>
	);
};

export default ExpandableImg;
