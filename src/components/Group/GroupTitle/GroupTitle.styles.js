import styled from "styled-components";

export const TitleDiv = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 34px;
	margin-bottom: 14px;

	& > h2 {
		font-size: ${({ theme: { typography } }) => typography.size.m1};
		color: ${({ theme: { colors } }) => colors.text_01};
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
	}

	& > ul {
		display: flex;
		gap: 18px;
	}
`;

export const Button = styled.button`
	color: ${({ disabled, theme: { colors } }) =>
		disabled ? colors.text_01 : colors.disabled_text};
	font-size: ${({ theme: { typography } }) => typography.size.s2};
	font-weight: ${({ theme: { typography } }) => typography.weight.medium};
	cursor: pointer;
`;
