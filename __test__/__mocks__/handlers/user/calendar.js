export const getUserPersonalScheduleSummary = (req, res, ctx) => {
	const startDateTime = req.url.searchParams.get("startDateTime");
	const endDateTime = new Date(
		new Date(startDateTime).setHours(23, 59, 59, 999),
	).toISOString();
	return res(
		ctx.status(200),
		ctx.json({
			schedules: [
				{
					id: 1,
					userId: 1,
					startDateTime,
					endDateTime,
					recurrence: 0,
					freq: null,
					interval: null,
					byweekday: null,
					until: null,
					isGroup: 0,
				},
			],
		}),
	);
};

export const getUserPersonalSchedule = (req, res, ctx) => {
	const startDateTime = req.url.searchParams.get("startDateTime");
	const endDateTime = new Date(
		new Date(startDateTime).setHours(23, 59, 59, 999),
	).toISOString();
	return res(
		ctx.status(200),
		ctx.json({
			schedules: [
				{
					id: 1,
					userId: 1,
					title: "오늘오늘",
					content: "오늘 끝",
					startDateTime,
					endDateTime,
					recurrence: 0,
					freq: null,
					interval: null,
					byweekday: null,
					until: null,
					isGroup: 0,
				},
			],
		}),
	);
};

export const postPersonalSchedule = (req, res, ctx) => {
	// default: 반복 일정이 아닌 '오늘' 일정의 경우
	try {
		const {
			title,
			content,
			startDateTime,
			endDateTime,
			recurrence,
			freq,
			interval,
			byweekday,
			until,
		} = req.body;

		if (
			!title ||
			!content ||
			!startDateTime ||
			!endDateTime ||
			recurrence ||
			freq ||
			interval ||
			byweekday ||
			until
		)
			return res(
				ctx.status(401),
				ctx.json({ error: "형식에 맞지 않는 데이터" }),
			);

		return res(
			ctx.status(201),
			ctx.json({
				scheduleSummary: {
					id: 2,
					userId: 1,
					startDateTime,
					endDateTime,
					recurrence,
					freq,
					interval,
					byweekday,
					until,
				},
				todaySchedules: [
					{
						id: 2,
						userId: 1,
						title,
						content,
						startDateTime,
						endDateTime,
						recurrence,
						freq,
						interval,
						byweekday,
						until,
					},
				],
				schedulesForTheWeek: [],
			}),
		);
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};

export const getSingleUserSchedule = (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json({
			id: Number(req.params.id),
			userId: 1,
			title: "오늘오늘",
			content: "오늘 끝",
			startDateTime: "2023-12-14T01:55:00.000Z",
			endDateTime: "2023-12-14T05:55:00.000Z",
			recurrence: 0,
			freq: null,
			interval: null,
			byweekday: null,
			until: null,
		}),
	);
};

export const putPersonalSchedule = (req, res, ctx) => {
	// default: 반복 일정이 아닌 '오늘' 일정의 경우
	try {
		const {
			title,
			content,
			startDateTime,
			endDateTime,
			recurrence,
			freq,
			interval,
			byweekday,
			until,
		} = req.body;

		if (
			!title ||
			!content ||
			!startDateTime ||
			!endDateTime ||
			recurrence ||
			freq ||
			interval ||
			byweekday ||
			until
		)
			return res(
				ctx.status(401),
				ctx.json({ error: "형식에 맞지 않는 데이터" }),
			);

		return res(
			ctx.status(201),
			ctx.json({
				scheduleSummary: {
					id: Number(req.params.id),
					userId: 1,
					startDateTime,
					endDateTime,
					recurrence,
					freq,
					interval,
					byweekday,
					until,
				},
				todaySchedules: [
					{
						id: Number(req.params.id),
						userId: 1,
						title,
						content,
						startDateTime,
						endDateTime,
						recurrence,
						freq,
						interval,
						byweekday,
						until,
					},
				],
				schedulesForTheWeek: [],
			}),
		);
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};

export const deletePersonalSchedule = (req, res, ctx) => {
	try {
		const scheduleId = Number(req.params.id);
		if (!scheduleId)
			return res(
				ctx.status(400),
				ctx.json({ error: "지원하지 않는 형식의 데이터입니다." }),
			);
		// 삭제할 일정이 무조건 id가 1이라는 가정 하에
		if (scheduleId !== 1)
			return res(
				ctx.status(404),
				ctx.json({ error: "일정을 찾을 수 없습니다." }),
			);
		return res(ctx.status(204));
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
