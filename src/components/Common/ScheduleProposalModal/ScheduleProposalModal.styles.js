import styled from "styled-components";

export const ProposalParamsWrapperDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 18px;

	& > .durationAndSubmit {
		display: flex;
		justify-content: space-between;
		& > button {
			width: 184px;
			height: 33px;
			border-radius: 5px;
			background-color: ${({ theme: { colors } }) => colors.primary_light};
			text-align: center;
			font-size: ${({
				theme: {
					typography: { size },
				},
			}) => size.s2};
			color: ${({ theme: { colors } }) => colors.white};
			cursor: pointer;

			&:disabled {
				background-color: ${({ theme: { colors } }) => colors.btn_02};
			}
		}
	}
`;

export const RecommendedProposalsDiv = styled.div`
	padding-inline: 14px;
	width: 100%;

	& > div {
		margin-bottom: 6px;
		&:last-child {
			margin-bottom: 12px;
		}
		height: 35px;
		border: 1px solid ${({ theme: { colors } }) => colors.primary};
		padding-left: 20px;
		padding-right: 10px;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		& > div {
			display: flex;
			gap: 26px;

			& > button {
				cursor: pointer;
				border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
				border-radius: 50%;
				width: 20px;
				height: 20px;
				display: flex;
				justify-content: center;
				align-items: center;

				& > div {
					width: 12px;
					height: 12px;
					background-color: ${({ theme: { colors } }) => colors.text_01};
					border-radius: 50%;
				}
			}

			& > span {
				line-height: 20px;
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
			}
		}

		& > button {
			min-width: 38px;
			height: 17px;
			background-color: ${({ theme: { colors } }) => colors.primary};
			border-radius: 10px;
			color: ${({ theme: { colors } }) => colors.white};
			text-align: center;
			font-size: 10px;
			line-height: 17px;
		}
	}
`;
