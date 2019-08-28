const Telegraf = require('telegraf')
const DEV_TOKEN = '959269873:AAGy9cYKLD8sBrb770Gq3pq-Rp0-TphdwoQ';
import { welcomeScene } from './scenes/welcomeScene'
// const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const bot = new Telegraf(DEV_TOKEN)
// const registrationStage = new Stage([
// 	welcomeScene
// ])

bot.use(session())
// bot.command('start', (ctx) => ctx.scene.enter('welcomeScene'))

bot.on('location', (ctx) => {
	// console.log(ctx.update.message.location)
	ctx.reply('Отправь живую локацию для участия!')
})

bot.on('edited_message', async (ctx) => {
	console.log(ctx.editedMessage.location)
	await ctx.reply(`Ваши координаты: ${ctx.editedMessage.location.latitude} ${ctx.editedMessage.location.longitude}`)
	await ctx.reply('Отлично, ваш визит подтвержден!')

})




// const welcomeScene = new Scene('welcomeScene');
const lotteryStr = '💰Лотерея'
const contactsStr = '📞Контакты'
const startStr = 'ℹ️Info'
const buttons = [
	[lotteryStr,contactsStr],
	[startStr]
]

const onStart = async ctx => {
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

}
bot.start(onStart)

bot.hears(startStr, onStart)

bot.hears(lotteryStr, async ctx=>{
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

bot.hears(contactsStr,  async ctx=>{
	ctx.reply(`Напиши текст для контактов`)
})

// bot.use(registrationStage.middleware())


bot.launch().then(data => {
	console.log("bot started")
})
