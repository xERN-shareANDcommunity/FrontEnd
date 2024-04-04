import styled from "styled-components";

export const RelativeDiv = styled.div`
	position: relative;

	& > button {
		width: 250px;
		height: 33px;
		background: ${({ theme: { colors } }) => colors.bg_01};
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
		text-align: center;
		cursor: pointer;
		font-family: inherit;
	}

	& > div {
		position: absolute;
		height: 262px;
		z-index: 101;
		bottom: calc(100% + 7px);
		background: ${({ theme: { colors } }) => colors.white};
		position: absolute;
		width: 198px;
		height: 262px;
		padding: 7px 16px;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		-webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		background-color: ${({ theme: { colors } }) => colors.white};

		& > div:first-child {
			margin-bottom: 20px;
			display: flex;
			gap: 8px;
			height: 199px;

			& > div {
				flex: 1;
				width: 50px;
				height: 100%;
				overflow: auto;
				display: flex;
				flex-direction: column;
				gap: 8.5px;
				overflow-y: scroll;
				-ms-overflow-style: none; /* Internet Explorer 10+ */
				scrollbar-width: none; /* Firefox */

				&::-webkit-scrollbar {
					display: none; /* Safari and Chrome */
				}

				& > button {
					width: 100%;
					height: 33px;
					min-height: 33px;
				}
			}
		}

		& > div:last-child {
			width: 100%;
			height: 28px;
			display: flex;
			justify-content: flex-end;

			& > button {
				width: 73px;
				height: 28px;
			}
		}

		& button {
			cursor: pointer;
			text-align: center;
			border-radius: 5px;
			font-size: ${({
				theme: {
					typography: { size },
				},
			}) => size.s2};

			&.selected,
			&.confirm {
				background-color: ${({ theme: { colors } }) => colors.primary};
				color: ${({ theme: { colors } }) => colors.white};
			}

			&:disabled {
				cursor: not-allowed;
				color: ${({ theme: { colors } }) => colors.disabled_text};
			}
		}
	}
`;
