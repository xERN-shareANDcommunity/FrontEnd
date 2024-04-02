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
		font-size: ${({ theme: { typography } }) => typography.size.s1};
		line-height: normal;
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
