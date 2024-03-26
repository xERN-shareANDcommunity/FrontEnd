import styled from "styled-components";

export const RadiosDiv = styled.div`
	margin-bottom: 20px;
	height: 22px;
	display: flex;
	gap: 22px;
	align-items: center;

	& > label {
		display: flex;
		align-items: center;
		gap: 8px;
		cursor: pointer;

		& > input[type="radio"] {
			margin: 0;
			width: 22px;
			height: 22px;
			accent-color: ${({ theme: { colors } }) => colors.text_01};
			font-size: ${({
				theme: {
					typography: { size },
				},
			}) => size.s2};
			line-height: 22px;
			font-weight: ${({
				theme: {
					typography: { weight },
				},
			}) => weight.medium};
		}
	}
`;

export const ProposalParamsWrapperDiv = styled.div`
	height: 33px;
	display: flex;
	justify-content: space-between;
	align-items: stretch;

	& > .content {
		display: flex;
		align-items: stretch;
		gap: 18px;

		& > h3 {
			line-height: 33px;
			font-size: ${({
				theme: {
					typography: { size },
				},
			}) => size.s2};
			color: ${({ theme: { colors } }) => colors.text_01};
		}

		& > button {
			background-color: ${({ theme: { colors } }) => colors.bg_01};
			text-align: center;
			font-size: ${({
				theme: {
					typography: { size },
				},
			}) => size.s1};
			color: ${({ theme: { colors } }) => colors.text_02};

			&:first-of-type {
				width: 188px;
			}

			&:last-of-type {
				width: 107px;
			}
		}
	}

	& > button {
		width: 96px;
		border-radius: 5px;
		background-color: ${({ theme: { colors } }) => colors.primary_light};
		text-align: center;
		font-size: ${({
			theme: {
				typography: { size },
			},
		}) => size.s2};
		color: ${({ theme: { colors } }) => colors.white};

		&:disabled {
			background-color: ${({ theme: { colors } }) => colors.btn_02};
		}
	}
`;
