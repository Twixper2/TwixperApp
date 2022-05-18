import { SvgXml } from "react-native-svg";

const rankSvg = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.0278 8.31725L13.5802 6.58192L11.8702 1.43608C11.7895 1.19304 11.5615 1.02917 11.3066 1.02917C11.0517 1.02917 10.8237 1.19304 10.7429 1.43529L9.03292 6.58112L4.58375 8.31646C4.35654 8.40512 4.20612 8.62521 4.20612 8.87062C4.20612 9.11604 4.35654 9.33375 4.58454 9.42321L9.03371 11.1585L10.7437 16.3044C10.8245 16.5466 11.0525 16.7105 11.3074 16.7105C11.5623 16.7105 11.7903 16.5466 11.871 16.3044L13.581 11.1585L18.0302 9.42321C18.2574 9.33454 18.4078 9.11446 18.4078 8.86904C18.4078 8.62362 18.2574 8.40592 18.0294 8.31725H18.0278ZM12.8899 10.1539C12.7252 10.2172 12.597 10.3518 12.5416 10.5181L11.3066 14.235L10.0716 10.5197C10.0162 10.3534 9.8895 10.2188 9.72483 10.1539L6.43546 8.87142L9.72404 7.58733C9.88871 7.524 10.017 7.38942 10.0724 7.22158L11.3074 3.50629L12.5424 7.22237C12.5978 7.39021 12.7245 7.52479 12.8891 7.58892L16.1785 8.87142L12.8891 10.1555L12.8899 10.1539ZM5.27487 3.01783H3.78654V1.62292C3.78654 1.29517 3.51975 1.02917 3.19279 1.02917C2.86583 1.02917 2.59904 1.29517 2.59904 1.62292V3.01783H1.1875C0.85975 3.01783 0.59375 3.28383 0.59375 3.61158C0.59375 3.93933 0.85975 4.20533 1.1875 4.20533H2.59825V5.60025C2.59825 5.928 2.86425 6.194 3.192 6.194C3.51975 6.194 3.78575 5.928 3.78575 5.60025V4.20533H5.27408C5.60262 4.20533 5.86783 3.93933 5.86783 3.61158C5.86783 3.28383 5.60262 3.01783 5.27408 3.01783H5.27487ZM7.28175 15.3852H6.41092V14.5809C6.41092 14.2532 6.14571 13.9872 5.81717 13.9872C5.48862 13.9872 5.22342 14.2532 5.22342 14.5809V15.3852H4.40958C4.08183 15.3852 3.81583 15.6512 3.81583 15.979C3.81583 16.3067 4.08183 16.5727 4.40958 16.5727H5.225V17.3771C5.225 17.7048 5.49021 17.9708 5.81875 17.9708C6.14729 17.9708 6.4125 17.7048 6.4125 17.3771V16.5727H7.28175C7.6095 16.5727 7.8755 16.3067 7.8755 15.979C7.8755 15.6512 7.6095 15.3852 7.28175 15.3852V15.3852Z" fill="rgb(239, 243, 244)"/></svg>`;

const AlgoRankingSvg = (style) => {
	return (
		<SvgXml
			xml={rankSvg}
			{...style}
			onPress={() => {
				console.log("Pressed");
			}}
		/>
	);
};

export default AlgoRankingSvg;
