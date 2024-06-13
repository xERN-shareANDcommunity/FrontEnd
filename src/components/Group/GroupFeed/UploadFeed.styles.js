import styled from "styled-components";

export const UploadSection = styled.section`
	border-radius: 10px;
	border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	background-color: #fff;
	padding: 24px 24px 18px 18px;
`;

export const TopDiv = styled.div`
	display: flex;
	position: relative;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
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
		margin-left: 14px;

		&::placeholder {
			color: ${({ theme: { colors } }) => colors.disabled_text};
			font-size: 14px;
		}
	}
`;

export const BottomDiv = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 72px;
	margin-top: 12px;
`;

export const ImgButtonDiv = styled.div`
	& > input {
		display: none;
	}
`;

export const ImgAddDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;

	& > p {
		font-size: 10px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};

		& > span {
			color: ${({ theme: { colors } }) => colors.disabled_text};
		}
	}
`;

export const ImgBoxDiv = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 12px;
`;

export const ImgPreviewDiv = styled.div`
	display: flex;
	gap: 20px;
`;

export const ImgDiv = styled.div`
	width: 90px;
	height: 60px;
	position: relative;
	background-color: ${({ theme: { colors } }) => colors.disabled_text};
	display: flex;
	align-items: center;
	justify-content: center;

	& > img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	& > svg {
		position: absolute;
		top: -6px;
		right: -6px;
		cursor: pointer;
	}
`;

export const UploadButton = styled.button`
	align-self: flex-end;
	width: 132px;
	height: 40px;
	text-align: center;
	border-radius: 5px;
	background-color: ${({ theme: { colors } }) => colors.primary};
	color: ${({ theme: { colors } }) => colors.white};
	font-size: ${({ theme: { typography } }) => typography.size.s2};
	font-weight: ${({ theme: { typography } }) => typography.weight.medium};
	cursor: pointer;

	&:disabled {
		background-color: ${({ theme: { colors } }) => colors.btn_02};
		color: ${({ theme: { colors } }) => colors.white};
	}
`;
