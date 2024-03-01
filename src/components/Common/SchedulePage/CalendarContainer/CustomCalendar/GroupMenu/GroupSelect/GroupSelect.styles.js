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
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
	z-index: 2;
	left: 0;
	top: calc(100% + 7px);
	padding: 8px 8px;
	display: flex;
	background-color: ${({ theme: { colors } }) => colors.white};
	width: 100%;
	max-height: 200px;

	overflow-y: auto;
	-ms-overflow-style: none; /* Internet Explorer 10+ */
	scrollbar-width: none; /* Firefox */
	&::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

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
		min-height: 33px;
		padding: 0 4px;
		display: flex;
		align-items: center;
		gap: 8px;

		&:not(:last-child) {
			border-bottom: 0.5px solid
				${({ theme: { colors } }) => colors.disabled_text};
		}

		&.selected {
			background-color: ${({ theme: { colors } }) => colors.primary};
			color: ${({ theme: { colors } }) => colors.white};
			border-radius: 5px;
		}

		& > img {
			border-radius: 50%;
			background-color: ${({ theme: { colors } }) => colors.bg_01};
		}

		& > span {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
`;
