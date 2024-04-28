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

export const TitleInput = styled.input`
	all: unset;
	width: 100%;
	height: 35px;
	margin-bottom: 24px;
	border-bottom: 1px solid ${({ theme }) => theme.colors.text_01};

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const DetailTextarea = styled.textarea`
	all: unset;
	resize: none;
	width: 100%;
	height: 109px;
	background-color: ${({ theme }) => theme.colors.bg_01};
	display: block;
	font-size: 16px;
	padding: 14px;
	margin-bottom: ${({ theme }) => theme.spacing.padding.medium}px;

	&::placeholder {
		color: ${({ theme }) => theme.colors.disabled_text};
	}

	&:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
`;

export const LabelH3 = styled.h3`
	color: ${({ theme: { colors } }) => colors.text_01};
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
	line-height: 17px;
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.medium};
	margin-bottom: 12px;
`;

export const LabelH4 = styled.h4`
	color: ${({ theme: { colors } }) => colors.text_01};
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s1};
	line-height: 17px;
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.medium};
	margin-bottom: 12px;
`;

// date and time
export const DateContainerDiv = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
`;
export const DateDiv = styled.div`
	display: flex;
	gap: 15px;
	width: 45%;

	&:last-child {
		justify-content: flex-end;
	}
`;

export const SubmitButton = styled.button`
	display: block;
	cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
	background-color: ${({ disabled, theme: { colors } }) =>
		disabled ? colors.btn_02 : colors.btn_01};

	&:not(:disabled) {
		&:hover {
			box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		}
		&:active {
			box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.25);
		}
	}

	border-radius: 5px;
	color: white;
	width: 132px;
	height: 40px;
	text-align: center;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.semibold};
	transition: box-shadow 0.3s;
`;
