export const getGroupScheduleSummary = (req, res, ctx) => {
	const groupId = Number(req.params.group_id);
	if (!groupId) {
		return res(
			ctx.status(400),
			ctx.json({ error: "형식에 맞지 않는 데이터입니다." }),
		);
	}

	if (groupId < 1) {
		return res(
			ctx.status(404),
			ctx.json({ error: "그룹을 찾을 수 없습니다." }),
		);
	}

	const startDateTime = req.url.searchParams.get("startDateTime");
	const endDateTime = new Date(
		new Date(startDateTime).setHours(23, 59, 59, 999),
	).toISOString();
	// groupId가 1인 그룹은 공유된 일정이 있지만, 나버지는 공유된 일정이 없어 빈 일정이라 가정.
	return res(
		ctx.status(200),
		ctx.json({
			accessLevel: "owner",
			schedules:
				groupId === 1
					? [
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
							{
								id: 2,
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
					  ]
					: [],
		}),
	);
};

export const getScheduleProposalsList = (req, res, ctx) => {
	// 일단은 빈 것
	return res(ctx.status(200), ctx.json([]));
};

export const getGroupSchedule = (req, res, ctx) => {
	const groupId = Number(req.params.group_id);
	if (!groupId) {
		return res(
			ctx.status(400),
			ctx.json({ error: "형식에 맞지 않는 데이터입니다." }),
		);
	}

	if (groupId < 1) {
		return res(
			ctx.status(404),
			ctx.json({ error: "그룹을 찾을 수 없습니다." }),
		);
	}

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

export const getSingleGroupSchedule = (req, res, ctx) => {
	const groupId = Number(req.params.group_id);
	if (!groupId) {
		return res(
			ctx.status(400),
			ctx.json({ error: "형식에 맞지 않는 데이터입니다." }),
		);
	}

	if (groupId < 1) {
		return res(
			ctx.status(404),
			ctx.json({ error: "그룹을 찾을 수 없습니다." }),
		);
	}

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

export const deleteGroupSchedule = (req, res, ctx) => {
	const groupId = Number(req.params.group_id);
	if (!groupId) {
		return res(
			ctx.status(400),
			ctx.json({ error: "형식에 맞지 않는 데이터입니다." }),
		);
	}

	if (groupId < 1) {
		return res(
			ctx.status(404),
			ctx.json({ error: "그룹을 찾을 수 없습니다." }),
		);
	}

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
