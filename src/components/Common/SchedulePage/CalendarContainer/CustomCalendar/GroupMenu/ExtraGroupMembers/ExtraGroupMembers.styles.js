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
		& > svg,
		ul {
			position: absolute;
			z-index: 2;
		}

		& > svg {
			top: calc(100% + 3px);
			left: -23px;
		}

		& > ul {
			top: calc(100% + 17px + 3px); /* arrow + top_padding */
			left: calc(-23px + 12px); /* bubble_position + left_padding */
			width: 122px;
			height: calc(156px - 2 * 3px); /* bubble_height - 2 * top_padding */
			overflow-y: auto;

			-ms-overflow-style: none; /* Internet Explorer 10+ */
			scrollbar-width: none; /* Firefox */
			&::-webkit-scrollbar {
				display: none; /* Safari and Chrome */
			}

			& > li {
				padding: 5px 10px;
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
					background-color: ${({ theme: { colors } }) => colors.bg_01};
				}
			}
		}
	}
`;

/* border: 1px solid ${{ theme }}; */
