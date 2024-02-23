import styled from "styled-components";

export const ScheduleModalLayoutDiv = styled.div`
	width: 550px;
	display: flex;
	flex-direction: column;
	font-family: "Inter", sans-serif;
	font-size: ${({ theme }) => theme.typography.size.s3};

	& > h2 {
		margin-bottom: 36px;
		font-weight: ${({
			theme: {
				typography: { weight },
			},
		}) => weight.semibold};
		font-size: ${({
			theme: {
				typography: { size },
			},
		}) => size.m1};
		color: ${({ theme: { colors } }) => colors.text_01};
	}

	& input,
	& textarea {
		&:focus {
			outline: none;
		}
		color: ${({ theme }) => theme.colors.text_03};
		&,
		&::placeholder {
			font-family: "Inter", sans-serif;
			font-weight: ${({ theme }) => theme.typography.weight.medium};
		}
		&::placeholder {
			color: ${({ theme }) => theme.colors.disabled_text};
		}
	}
`;
