export const getMyGroupList = (req, res, ctx) => {
	return res(
		ctx.status(200),
		ctx.json([
			{
				groupId: 1,
				name: "그룹 이름 1",
				description: "그룹 소개",
				member: 1,
				image:
					"https://selody-images2.s3.ap-northeast-2.amazonaws.com/group/group.png",
			},
		]),
	);
};

export const postGroup = (req, res, ctx) => {
	try {
		const { name, description, profileImg } = req.body;

		if (!name) {
			return res(
				ctx.status(400),
				ctx.json({ error: "형식에 맞지 않는 데이터" }),
			);
		}

		return res(
			ctx.status(201),
			ctx.json({
				name,
				description,
				profileImg,
			}),
		);
	} catch (error) {
		return res(ctx.status(500), ctx.json({ error: "Internal Server Error" }));
	}
};
