const inviteCode = "123456789012";

export const getInviteLink = (req, res, ctx) => {
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
		// 임의의 12자리 code 생성
		return res(ctx.status(200), ctx.json({ inviteCode }));
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
export const postInviteLink = (req, res, ctx) => {
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
		// 임의의 12자리 code 생성
		return res(ctx.status(200), ctx.json({ inviteCode }));
	} catch (error) {
		console.log(error);
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
