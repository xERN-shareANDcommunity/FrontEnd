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
