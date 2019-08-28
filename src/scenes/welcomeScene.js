const Markup = require('telegraf/markup')
const Scene = require('telegraf/scenes/base')
const Extra = require('telegraf/extra')

const welcomeScene = new Scene('welcomeScene');
const lotteryStr = '💰Лотерея'
const contactsStr = '📞Контакты'
const startStr = 'ℹ️Info'
const buttons = [
	[lotteryStr,contactsStr],
	[startStr]
]

welcomeScene.enter(async ctx => {
	// const user = ctx.state.user

	await ctx.reply(`✅ Теперь ты являешься официальным участником кинопоказа "The Endless Summer" от Rave Community.
👽👽👽 \n\n✅А это значит, что ты можешь принять участие в розыгрыше классных призов от наших хороших друзей @WAKETIME. 🏆\n\n✅Для участия тебе нужно поделиться своей живой геопозицией 📍 и вступить в официальный чат 💬Ravecom. \n\n@RavecomSPB`, {
		reply_markup: {
			keyboard: buttons,
			resize_keyboard: true
		},

		parse_mode: 'HTML'
	})


	// Markup.keyboard(buttons).resize().extra()

})

welcomeScene.hears(lotteryStr, async ctx=>{
	ctx.reply(`🎁Призовой фонд:

1️⃣. Сет 15 минут каталки с обучением на WakeSurf в любой день от WakeTime
2️⃣. Сет 15 минут каталки с обучением на WakeSurf в любой день от WakeTime
3️⃣️. Сертификат на скидку 20% в WakeTime
4️⃣. Сертификат на скидку 20% в WakeTime
5️⃣. Сертификат на скидку 20% в WakeTime

5️⃣ ‼️Призовых мест❗️💥💥💥💥💥

Розыгрыш будет произведен случайным выбором нескольких гостей среди зарегистрировавшихся в розыгрыше.`, {
		reply_markup: {
			keyboard: buttons,
			resize_keyboard: true
		},

		parse_mode: 'HTML'
	})
})

welcomeScene.hears(contactsStr,  async ctx=>{
	ctx.reply(`Напиши текст для контактов`)
})

module.exports = {
	welcomeScene
}
