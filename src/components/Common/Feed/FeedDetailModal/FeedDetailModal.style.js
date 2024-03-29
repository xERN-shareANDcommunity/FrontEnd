import styled from "styled-components";

export const ContainerDiv = styled.div`
	margin-top: 56px;
	padding: 0 34px;
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
