import styled from "styled-components";

export const ContainerDiv = styled.div`
	margin-top: 20px;
	padding: 0 34px;
	max-height: 728px;
`;

export const FeedDiv = styled.div`
	padding-bottom: 24px;
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.text_03};
	position: relative;
`;

export const ProfileDiv = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}

	& > h3 {
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		color: ${({ theme: { colors } }) => colors.text_01};

		& > svg {
			margin-left: 4px;
		}
	}
`;

export const ContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;

	& > p {
		margin-top: 20px;
		font-size: 18px;
		color: ${({ theme: { colors } }) => colors.text_01};
		width: 1020px;
	}
`;

export const CommentDiv = styled.div`
	max-height: 322px;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const CommentInputDiv = styled.div`
	padding-top: 24px;
	display: flex;
	gap: 10px;

	& > img {
		width: 58px;
		height: 58px;
		border-radius: 50%;
		object-fit: cover;
	}
`;

export const CommentInputContentDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > h3 {
		font-size: 14px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		color: ${({ theme: { colors } }) => colors.text_01};
	}

	& > textarea {
		margin-top: 10px;
		height: 120px;
		resize: none;
		border: 1px solid ${({ theme: { colors } }) => colors.text_01};
		outline: none;
		border-radius: 10px;
		padding: 10px 18px;
		font-family: Inter;
		font-size: 12px;
		color: ${({ theme: { colors } }) => colors.text_03};
	}

	& > button {
		margin-top: 20px;
		align-self: flex-end;
		width: 132px;
		height: 40px;
		background-color: ${({ theme: { colors } }) => colors.primary};
		color: ${({ theme: { colors } }) => colors.white};
		text-align: center;
		font-size: 14px;
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		border-radius: 5px;
		cursor: pointer;
	}
`;
