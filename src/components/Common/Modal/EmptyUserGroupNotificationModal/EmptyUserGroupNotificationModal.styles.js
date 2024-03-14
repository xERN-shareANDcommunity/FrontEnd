import styled from "styled-components";

export const NotificationModalWrapperDiv = styled.div`
	margin: 19px 23px 1px;
	gap: 48px;
	font-family: "Inter", sans-serif;

	&,
	& > p {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	& > h2 {
		font-size: 18px;
		font-weight: ${({
			theme: {
				typography: { weight },
			},
		}) => weight.semibold};
	}

	& > p > span {
		font-size: ${({
			theme: {
				typography: { size },
			},
		}) => size.s2};
		font-weight: ${({
			theme: {
				typography: { weight },
			},
		}) => weight.medium};
		color: ${({ theme: { colors } }) => colors.disabled_text};
	}

	& > button {
		border-radius: 5px;
		background-color: ${({ theme: { colors } }) => colors.btn_01};
		min-width: 323px;
		height: 48px;
		line-height: 48px;
		text-align: center;
		font-size: 15px;
		color: ${({ theme: { colors } }) => colors.white};
		cursor: pointer;
	}
`;
