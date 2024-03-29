import styled from "styled-components";

export const CommentDiv = styled.div`
	padding: 24px 0;
	display: flex;
	gap: 10px;
	border-bottom: 1px solid #d9d9d9;
	position: relative;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

export const CommentContentDiv = styled.div`
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
