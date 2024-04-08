import styled from "styled-components";

export const CommentDiv = styled.div`
	padding: 24px 0;
	display: flex;
	gap: 10px;
	border-bottom: 1px solid #d9d9d9;
	position: relative;

	&:last-of-type {
		border-bottom: none;
	}

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

export const CommentContentDiv = styled.div`
	/* width: calc(100% - 100px); */
	width: 100%;

	& > h3 {
		font-size: 14px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		color: ${({ theme: { colors } }) => colors.text_01};
	}

	& > h4 {
		font-size: 12px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		color: ${({ theme: { colors } }) => colors.text_02};
		margin-top: 6px;
	}

	& > p {
		font-size: 12px;
		color: ${({ theme: { colors } }) => colors.text_03};
		margin-top: 12px;
	}
`;

export const EditContentDiv = styled.div`
	display: flex;
	flex-direction: column;

	& > textarea {
		margin-top: 10px;
		height: 80px;
		resize: none;
		border: 1px solid ${({ theme: { colors } }) => colors.text_01};
		outline: none;
		border-radius: 10px;
		padding: 10px 18px;
		font-family: Inter;
		font-size: 12px;
		color: ${({ theme: { colors } }) => colors.text_03};
		width: 100%;
	}
`;

export const ButtonDiv = styled.div`
	display: flex;
	gap: 10px;
	align-self: flex-end;

	& > button {
		margin-top: 20px;
		align-self: flex-end;
		width: 102px;
		height: 40px;
		background-color: ${({ theme: { colors } }) => colors.primary};
		color: ${({ theme: { colors } }) => colors.white};
		text-align: center;
		font-size: 14px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		border-radius: 5px;
		cursor: pointer;

		&.cancelBtn {
			background-color: ${({ theme: { colors } }) => colors.white};
			color: ${({ theme: { colors } }) => colors.primary};
			border: 1px solid ${({ theme: { colors } }) => colors.primary_light};
		}
	}
`;
