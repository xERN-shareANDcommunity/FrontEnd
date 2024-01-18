import styled from "styled-components";

import BaseCard from "@/components/UI/BaseCard/BaseCard";

export const ScheduleItemLi = styled.li`
	width: 100%;
	cursor: pointer;
`;

export const CardDiv = styled(BaseCard)`
	display: flex;
	align-items: center;
	gap: 16px;
	width: 100%;
	padding: 0 15px;
`;

export const ColoredCircleDiv = styled.div`
	border-radius: 50%;
	border: 1px solid ${({ theme: { colors } }) => colors.disabled_text};
	background-color: ${(props) => props.bgColor};
	width: 24px;
	height: 24px;
`;

export const ScheduleItemContentDiv = styled.div`
	flex: 1;
	display: flex;
	gap: 4px;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	padding: 15px 0;
	color: ${({ theme: { colors } }) => colors.text_03};
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
	& > div {
		display: flex;
		align-items: center;
		& > .recur {
			background-color: ${({ theme: { colors } }) => colors.primary};
			width: 39px;
			height: 17px;
			line-height: 17px;
			text-align: center;
			border-radius: 10px;
			color: ${({ theme: { colors } }) => colors.white};
			font-size: 10px;
		}
	}
`;

export const ScheduleItemRightButtonsDiv = styled.div`
	display: flex;

	& > button {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		cursor: pointer;

		&:hover {
			background-color: ${({ theme: { colors } }) => colors.bg_02};
			border-radius: 50%;
		}
	}
`;
