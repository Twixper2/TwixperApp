import { SvgXml } from "react-native-svg";

import { svgMap } from "../../constants/svgMap";

const SvgIcon = ({ style, name }) => {
	if (!(name in svgMap)) {
		return;
	}

	return (
		<SvgXml
			xml={svgMap[name]}
			{...style}
			onPress={() => {
				console.log("Pressed");
			}}
		/>
	);
};

export default SvgIcon;
