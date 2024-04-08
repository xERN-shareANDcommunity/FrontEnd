import styled from "styled-components";

export const UploadSection = styled.section`
	border-radius: 10px;
	border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	margin-bottom: 72px;
	padding: 24px 24px 18px 18px;
	font-family: Inter;
`;

export const TopDiv = styled.div`
	display: flex;
	gap: 16px;
	position: relative;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}

	& > input {
		display: none;
	}

	& > textarea {
		resize: none;
		font-family: Inter;
		border: none;
		outline: none;
		padding: 12px;
		width: 100%;
		min-height: 100px;
		border-radius: 4px;
		background-color: ${({ theme: { colors } }) => colors.bg_01};
		box-sizing: border-box;
		font-size: 14px;

		&::placeholder {
			color: ${({ theme: { colors } }) => colors.disabled_text};
			font-size: 14px;
		}
	}
`;

export const ImgAddDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	position: absolute;
	left: 74px;
	bottom: -24px;
	cursor: pointer;

	& > p {
		font-size: 10px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
	}
`;

export const UploadButton = styled.button`
	margin-top: 12px;
	float: right;
	width: 132px;
	height: 40px;
	text-align: center;
	border-radius: 5px;
	background-color: ${({ theme: { colors } }) => colors.btn_02};
	color: ${({ theme: { colors } }) => colors.white};
	font-size: ${({ theme: { typography } }) => typography.size.s2};
	font-weight: ${({ theme: { typography } }) => typography.weight.medium};
`;
