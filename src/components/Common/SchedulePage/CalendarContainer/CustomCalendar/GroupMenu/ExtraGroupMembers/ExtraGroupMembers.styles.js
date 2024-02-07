import styled from "styled-components";

export const RelativeWrapperDiv = styled.div`
	position: relative;

	& > button {
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background-color: ${({ theme: { colors } }) => colors.disabled_text};
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;

		&.activated > svg > path:first-child {
			display: none;
		}

		&:hover {
			opacity: 0.8;
		}
	}

	& > div.dropdown {
		position: absolute;
		z-index: 2;
		top: calc(100% + 7px);
		max-height: 170px;
		overflow-y: auto;

		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
		&::-webkit-scrollbar {
			display: none; /* Safari and Chrome */
		}

		width: 146px;
		border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
		background-color: ${({ theme: { colors } }) => colors.white};
		padding: 8px;
		& > ul {
			& > li {
				padding: 5px;
				display: flex;
				align-items: center;
				gap: 8px;
				font-size: 10px;
				color: ${({ theme: { colors } }) => colors.text_03};
				word-break: break-all;

				&:not(:last-child) {
					border-bottom: 1px solid
						${({ theme: { colors } }) => colors.disabled_text};
				}

				& > img {
					border-radius: 50%;
				}
			}
		}
	}
`;

/* border: 1px solid ${{ theme }}; */
