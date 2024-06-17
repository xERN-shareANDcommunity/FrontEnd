import styled from "styled-components";

export const RelativeDiv = styled.div`
	& > button {
		border-radius: 5px;
		width: 98px;
		background-color: ${({ theme: { colors } }) => colors.primary};
		text-align: center;
		line-height: 33px;
		color: ${({ theme: { colors } }) => colors.white};
		font-size: ${({
			theme: {
				typography: { size },
			},
		}) => size.s2};
		cursor: pointer;
	}
`;
