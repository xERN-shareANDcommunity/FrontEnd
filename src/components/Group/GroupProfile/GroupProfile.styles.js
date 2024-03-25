import styled from "styled-components";

export const ContainerDiv = styled.div`
	min-width: 380px;
	height: 100%;
	border-radius: 10px;
	border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	font-family: Inter;
`;

export const TopDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 60px 0;

	& > img {
		width: 110px;
		height: 110px;
		border-radius: 50%;
		object-fit: cover;
	}

	& > h3 {
		font-size: ${({ theme: { typography } }) => typography.size.m2};
		font-weight: ${({ theme: { typography } }) => typography.weight.semibold};
		margin-top: 24px;
		color: ${({ theme: { colors } }) => colors.text_01};
		max-width: 214px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	& > p {
		color: ${({ theme: { colors } }) => colors.text_02};
		font-size: ${({ theme: { typography } }) => typography.size.s2};
		margin-top: 16px;
		text-align: center;
		line-height: normal;
		max-width: 214px;
		overflow: hidden;
		text-overflow: ellipsis;
		word-break: break-word;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
`;

export const MiddleDiv = styled.div`
	border-top: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.btn_02};
	display: flex;
	width: 100%;
	padding: 34px 0;
`;

export const MiddleInnerDiv = styled.div`
	width: 50%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;

	&::after {
		content: "";
		width: 1px;
		height: 70px;
		background-color: ${({ theme: { colors } }) => colors.btn_02};
		position: absolute;
		right: 0;
	}

	&:last-of-type::after {
		content: none;
	}

	& > h3 {
		font-size: 22px;
		font-weight: ${({ theme: { typography } }) => typography.weight.semibold};
		color: ${({ theme: { colors } }) => colors.text_01};
	}

	& > h4 {
		font-size: ${({ theme: { typography } }) => typography.size.s3};
		font-weight: ${({ theme: { typography } }) => typography.weight.medium};
		color: ${({ theme: { colors } }) => colors.text_02};
		margin-top: 8px;
	}
`;

export const ProfileButtonDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 12px;
	padding: 26px 0;
	position: relative;
`;

export const ProfileButton = styled.button`
	border: 1px solid ${({ theme: { colors } }) => colors.primary};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme: { colors } }) => colors.primary};
	width: 282px;
	height: 48px;
	color: ${({ theme: { colors } }) => colors.white};
	font-weight: ${({ theme: { typography } }) => typography.weight.medium};
	font-size: 18px;
	position: relative;
	cursor: pointer;

	&.grayButton {
		background-color: ${({ theme: { colors } }) => colors.btn_02};
		border: none;
		cursor: default;

		&:hover {
			background-color: ${({ theme: { colors } }) => colors.btn_02};
		}
	}

	&:hover {
		background-color: ${({ theme: { colors } }) => colors.btn_04};
	}
`;

export const ProfileWhiteButton = styled(ProfileButton)`
	background-color: ${({ theme: { colors } }) => colors.white};
	color: ${({ theme: { colors } }) => colors.primary};

	&:hover {
		background-color: ${({ theme: { colors } }) => colors.bg_02};
	}
`;
