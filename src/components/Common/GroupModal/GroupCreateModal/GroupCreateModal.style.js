import styled from "styled-components";

export const TopDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 14px 0 10px;

	& > label {
		margin-top: 20px;
		cursor: pointer;
	}

	& > input {
		display: none !important;
	}

	& > img {
		width: 95px;
		height: 95px;
		border-radius: 50%;
		object-fit: cover;
		margin-top: 20px;
	}
`;

export const TitleH2 = styled.h2`
	color: ${({ theme: { colors } }) => colors.text_01};
	font-family: Inter;
	font-size: 20px;
	font-weight: 600;
`;

export const GroupNameLabel = styled.label`
	color: ${({ theme: { colors } }) => colors.text_01};
	font-size: 13px;
	font-family: Inter;
	font-weight: 500;

	& > span {
		margin-left: 6px;
		font-size: 8px;
		color: ${({ theme: { colors } }) => colors.disabled_text};
	}
`;

export const GroupNameTextarea = styled.textarea`
	box-sizing: border-box;
	width: 550px;
	height: 45px;
	margin-top: 8px;
	padding: 10px;
	border: none;
	outline: none;
	color: ${({ theme: { colors } }) => colors.text_03};
	background-color: ${({ theme: { colors } }) => colors.bg_01};
	font-family: Inter;
	font-size: 16px;
	line-height: 24px;
	resize: none;
`;

export const GroupDescriptionLabel = styled(GroupNameLabel)`
	margin-top: 28px;
`;

export const GroupDescriptionTextarea = styled(GroupNameTextarea)`
	height: 88px;
`;

export const ButtonWrapDiv = styled.div`
	display: flex;
	justify-content: flex-end;
	margin: 12px 0 2px;
`;

export const GroupCreateButton = styled.button`
	cursor: pointer;
	padding: 12px 40px;
	border-radius: 5px;
	background-color: ${({ theme: { colors } }) => colors.primary};
	color: ${({ theme: { colors } }) => colors.white};
	font-family: Inter;
	font-size: 14px;
	font-weight: 600;
	line-height: normal;

	&:disabled {
		cursor: not-allowed;
		background-color: ${({ theme: { colors } }) => colors.btn_02};
	}
`;
