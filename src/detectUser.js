const models = require('./models');
const {User} = models;
const TimestampNow = () => Math.floor(Date.now() / 1000)


/*

CHAT:  { id: 63410639,
  first_name: 'Konstantin',
  username: 'Konstantn',
  type: 'private' }
FROM:  { id: 63410639,
  is_bot: false,
  first_name: 'Konstantin',
  username: 'Konstantn',
  language_code: 'en' }

 */

const detectUser = async (ctx, next) => {
	let user = await User.findOne({where: {tg_user: ctx.chat.id}})
	let userData = ctx.chat;
	// console.log("CHAT: ", ctx.chat)
	// console.log("FROM: ", ctx.from)
	if (!user) {
		user = await User.build({
			username: userData.username || userData.first_name,
			language: ctx.from.language_code,
			tg_user: ctx.chat.id,
			data: {
				...userData,
				date: TimestampNow()
			}
		})
		await user.save()
	}

	ctx.state.user = user
	return next()
}





module.exports = detectUser

