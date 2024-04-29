import styled from "styled-components";

export const FeedArticle = styled.article`
	display: flex;
	flex-direction: column;
	border-radius: 10px;
	border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	padding: 24px 18px;
	position: relative;
	cursor: pointer;
`;

export const OptionDiv = styled.div`
	position: absolute;
	right: 12px;
	top: 12px;
	cursor: pointer;
`;

export const OptionMenuDiv = styled.div`
	position: absolute;
	z-index: 2;
	right: 0;

	& > ul > li {
		width: 60px;
		height: 30px;
		border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: ${({ theme: { colors } }) => colors.white};
		color: ${({ theme: { colors } }) => colors.sunday};
		font-size: ${({ theme: { typography } }) => typography.size.s1};

		&:first-of-type {
			border-bottom: none;
			color: ${({ theme: { colors } }) => colors.text_01};
		}

		& > button {
			width: 100%;
			height: 100%;
			text-align: center;
		}
	}
`;

export const TopDiv = styled.div`
	display: flex;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

export const InfoDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 14px;

	& > h3 {
		color: ${({ theme: { colors } }) => colors.text_01};
		font-size: ${({ theme: { typography } }) => typography.size.s2};
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};

		> svg {
			margin-left: 4px;
		}
	}

	& > h4 {
		color: ${({ theme: { colors } }) => colors.text_02};
		font-size: ${({ theme: { typography } }) => typography.size.s1};
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		margin-top: 5px;
	}
`;

export const BottomDiv = styled.div`
	margin-left: 72px;
	display: flex;
	flex-direction: column;
	gap: 12px;
`;

export const ContentDiv = styled.div`
	& > p {
		color: ${({ theme: { colors } }) => colors.text_03};
		font-size: 15px;
		line-height: normal;
	}
`;

export const CarouselDiv = styled.div`
	width: 500px;
	height: 250px;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme: { colors } }) => colors.disabled_text};
	overflow: hidden;
	position: relative;
`;

export const CarouselBoxDiv = styled.div`
	display: flex;
	overflow: hidden;
`;

export const CarouselItemDiv = styled.div`
	display: flex;

	& > img {
		width: 500px;
		height: 250px;
		object-fit: contain;
	}
`;

export const ArrowButton = styled.button`
	position: absolute;
	top: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	transform: translateY(-50%);

	&.prevButton {
		left: 0;
	}

	&.nextButton {
		right: 0;
	}
`;

export const IconDiv = styled.div`
	display: flex;
	gap: 26px;
`;

export const IconItemButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 6px;
	cursor: pointer;

	& > span {
		font-size: 10px;
	}

	& > svg {
		padding: 2px;
	}

	&:hover {
		color: ${({ theme: { colors } }) => colors.primary};

		& > svg {
			background-color: ${({ theme: { colors } }) => colors.bg_01};
			border-radius: 50%;

			& > g > path {
				stroke: ${({ theme: { colors } }) => colors.primary};
			}
		}
	}
`;
