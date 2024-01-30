import styled from "styled-components";

export const GroupSelectWrapperDiv = styled.div`
	position: relative;
`;

export const SelectButton = styled.button`
	width: 137px;
	height: 33px;
	border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
	padding: 8px 12px;
	display: flex;
	align-items: center;

	& > span {
		flex: 1;
	}

	& > svg {
		transition: transform 0.3s;
	}

	&.activated > svg {
		transform: rotate(0.5turn);
	}

	cursor: pointer;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.medium};
`;

export const PickerDiv = styled.div`
	position: absolute;
	left: 0;
	bottom: calc(100% + 7px);
	padding: 8px 8px;
	display: flex;
	background-color: ${({ theme: { colors } }) => colors.white};
	width: 100%;
	flex-direction: column;
	box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.1);
	-webkit-box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.1);
	-moz-box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.1);
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s1};
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.regular};

	& > button {
		cursor: pointer;
		height: 33px;
		padding: 0 4px;

		&:not(:last-child) {
			border-bottom: 0.5px solid
				${({ theme: { colors } }) => colors.disabled_text};
		}

		&.selected {
			background-color: ${({ theme: { colors } }) => colors.primary};
			color: ${({ theme: { colors } }) => colors.white};
			border-radius: 5px;
		}
	}
`;
