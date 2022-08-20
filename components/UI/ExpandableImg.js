import { useState } from "react";
import { Image } from "react-native";

import Lightbox from "react-native-lightbox";

import { appColors } from "../../constants/colors";

const ExpandableImg = ({ onPress, mediaData, pixelMedia }) => {
	const { media_url_https, sizes } = mediaData;

	const normalImgSize = {
		flex: 1,
		height: sizes["small"].h * 0.5,
		width: sizes["small"].w * 0.5,
	};

	const [imageStyle, setImageStyle] = useState(normalImgSize);

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
