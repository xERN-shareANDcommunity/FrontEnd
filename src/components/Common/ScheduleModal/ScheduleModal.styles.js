import styled from "styled-components";

export const InputLabel = styled.label`
	color: ${({ theme: { colors } }) => colors.text_01};
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s2};
	line-height: 17px;
	font-weight: ${({
		theme: {
			typography: { weight },
		},
	}) => weight.medium};
	margin-bottom: 12px;
`;

export const DateContainerDiv = styled.div`
	position: relative;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 12px;
`;

export const DateDiv = styled.div`
	display: flex;
	gap: 15px;
	width: 45%;
`;
export const DateInput = styled.input`
	display: block;
	border: 1px solid #ced4da;
	background: #f4f6fc;
	font-size: 16px;
	width: 100%;
	height: 40px;
	border-radius: 4px;
	padding: 0 10px;
	font-family: "Inter", sans-serif;

	&::placeholder {
		font-family: "Inter", sans-serif;
	}

	&:focus {
		outline: none;
	}
`;

const DatePickerDiv = styled.div`
	// 필요없는 타이틀 제거
	& .react-datepicker__aria-live {
		display: none;
	}
	// datePicker 레이아웃
	& .react-datepicker {
		margin: 7px 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 264px;
		height: 260px;
		background-color: white;
		border: 1px solid ${({ theme: { colors } }) => colors.btn_02};
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		-webkit-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		-moz-box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
		& .react-datepicker__day-names {
			margin-bottom: 11px;
			width: 100%;
			height: 12px;
			display: flex;
			justify-content: space-around;
			font-size: 10px;
			color: ${({ theme: { colors } }) => colors.disabled_text};
			& > div {
				&:first-child {
					color: ${({ theme: { colors } }) => colors.sunday};
				}
				&:last-child {
					color: ${({ theme: { colors } }) => colors.saturday};
				}
			}
		}
		& .react-datepicker__month {
			display: flex;
			flex-direction: column;
			gap: 8px;
			font-size: 9px;
			color: ${({ theme: { colors } }) => colors.text_01};
			& > .react-datepicker__week {
				display: flex;
				justify-content: space-around;
				& > div {
					width: 15px;
					height: 15px;
					line-height: 15px;
					text-align: center;
					cursor: pointer;
					&.react-datepicker__day--outside-month,
					&.react-datepicker__day--disabled {
						color: ${({ theme: { colors } }) => colors.disabled_text};
					}
					&.react-datepicker__day--disabled {
						cursor: not-allowed;
					}
					&.react-datepicker__day--selected {
						background-color: ${({ theme: { colors } }) => colors.primary};
						border-radius: 50%;
						color: ${({ theme: { colors } }) => colors.white};
					}
				}
			}
		}
		& > .react-datepicker__children-container > footer {
			margin-bottom: 13px;
			padding: 0 14px;
			display: flex;
			justify-content: flex-end;
			& > button {
				width: 73px;
				height: 28px;
				border-radius: 5px;
				text-align: center;
				line-height: 28px;
				font-size: ${({
					theme: {
						typography: { size },
					},
				}) => size.s1};
				font-weight: ${({
					theme: {
						typography: { weight },
					},
				}) => weight.medium};
				cursor: pointer;
				&:first-child {
					color: ${({ theme: { colors } }) => colors.disabled_text};
				}
				&:last-child {
					color: ${({ theme: { colors } }) => colors.white};
					background-color: ${({ theme: { colors } }) => colors.primary};
				}
			}
		}
	}
`;

const TImePickerWrapperDiv = styled.div`
	position: relative;
`;

const CustomInputButton = styled.button`
	position: relative;
	border: none;
	display: block;
	background: ${({ theme: { colors } }) => colors.bg_01};
	height: 33px;
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
	width: ${({ isTime }) => (isTime ? 107 : 127)}px;
	font-family: inherit;
`;

const CustomTimePicker = styled.div`
	position: absolute;
	z-index: 101;
	bottom: calc(100% + 7px);
	left: ${({ isModalPositionTopLeft }) =>
		isModalPositionTopLeft ? 0 : undefined};
	right: ${({ isModalPositionTopLeft }) =>
		!isModalPositionTopLeft ? 0 : undefined};
	display: ${({ isOpen }) => !isOpen && "none"};
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
`;

const CustomHeader = styled.header`
	display: flex;
	padding: 17px 14px 0 14px;
	margin-bottom: 15px;
	& > .spacer {
		flex: 1;
	}
	& > button {
		height: fit-content;
		cursor: pointer;
		&:disabled {
			display: none;
		}
		&.prev {
			margin-right: 20px;
		}
		& > span {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 12px;
			height: 12px;
		}
	}
`;

export const CustomDatePickerComponents = {
	DatePickerDiv,
	CustomInputButton,
	CustomHeader,
};

export const CustomTimePickerComponents = {
	CustomInputButton,
	CustomTimePicker,
	TImePickerWrapperDiv,
};

export const AllDayCheckBoxDiv = styled.div`
	margin-bottom: 12px;
	display: flex;
	justify-content: flex-end;
	& > label {
		height: 100%;
		display: flex;
		align-items: center;
		gap: 4px;
		font-size: ${({
			theme: {
				typography: { size },
			},
		}) => size.s1};
		cursor: pointer;
		& > input {
			accent-color: ${({ theme: { colors } }) => colors.primary};
			cursor: pointer;
		}
	}
`;

export const RepeatContainerDiv = styled.div`
	display: flex;
	gap: 20px;
	flex-direction: column;
	margin-bottom: 24px;
	& > div {
		display: flex;
		gap: 15px;
		&:first-child > div {
			display: flex;
			flex-direction: column;
		}
		&:last-child > .interval_N {
			display: flex;
			gap: 6px;
			align-items: center;
			& > input[type="number"] {
				all: unset;
				border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
				width: 98px;
				height: 100%;
				padding: 8px 10px;
				color: ${({ theme: { colors } }) => colors.disabled_text};
				/* Chrome, Safari, Edge, Opera */
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				appearance: textfield;
			}
			& > span {
				color: ${({ theme: { colors } }) => colors.text_03};
			}
		}
	}
`;

export const WeeklyDatePickerDiv = styled.div`
	bottom: -100%;
	display: flex;
	justify-content: space-between;
	width: 196px;
	font-size: ${({
		theme: {
			typography: { size },
		},
	}) => size.s1};
	& > label {
		&,
		& > input {
			cursor: pointer;
		}
		display: flex;
		gap: 15px;
		&:first-child > div {
			display: flex;
			flex-direction: column;
		}
		&:last-child > .interval_N {
			display: flex;
			gap: 6px;
			align-items: center;
			& > input[type="number"] {
				all: unset;
				border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
				width: 98px;
				height: 100%;
				padding: 8px 10px;
				color: ${({ theme: { colors } }) => colors.disabled_text};
				/* Chrome, Safari, Edge, Opera */
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					-webkit-appearance: none;
					margin: 0;
				}
				appearance: textfield;
			}
			& > span {
				color: ${({ theme: { colors } }) => colors.text_03};
			}
		}
	}
`;

export const FooterDiv = styled.div`
	display: flex;
	flex-direction: row-reverse;
	justify-content: space-between;
	align-items: flex-end;

	& > button {
		cursor: pointer;
	}
`;
