export const getRecommendedProposals = (req, res, ctx) => {
	try {
		const groupId = Number(req.params.group_id);

		const startDateTime = req.url.searchParams.get("startDateTime");
		const endDateTime = req.url.searchParams.get("endDateTime");
		const duration = req.url.searchParams.get("duration");

		if (!groupId || !startDateTime || !endDateTime || !duration) {
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
				proposals: [
					{
						startDateTime,
						endDateTime,
						duration: new Date(startDateTime) - new Date(endDateTime),
					},
				],
			}),
		);
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
