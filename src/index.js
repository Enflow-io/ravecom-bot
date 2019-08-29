const Telegraf = require('telegraf')
const DEV_TOKEN = '959269873:AAGy9cYKLD8sBrb770Gq3pq-Rp0-TphdwoQ';
import detectUser from './detectUser'
const geolib = require('geolib');
// const Stage = require('telegraf/stage')
const session = require('telegraf/session')

const bot = new Telegraf(DEV_TOKEN)
// const registrationStage = new Stage([
// 	welcomeScene
// ])

bot.use(session())
bot.use(detectUser)

// bot.command('start', (ctx) => ctx.scene.enter('welcomeScene'))

bot.on('location', async (ctx) => {
	// console.log(ctx.editedMessage.location)
	const user = ctx.state.user
	if (!user.visitedAt) {

		// const { latitude, longitude } = ctx.editedMessage.location;
		const { latitude, longitude } = ctx.update.message.location;

		// 55.753192, 37.666378
		// 55.753372, 37.667365
		// 55.752893, 37.667685
		// 55.752849, 37.666545
		const isInPlace = geolib.isPointInPolygon({ latitude, longitude: longitude }, [
			{ latitude: 55.753192, longitude: 37.666378 },
			{ latitude: 55.753372, longitude: 37.667365 },
			{ latitude: 55.752893, longitude: 37.667685 },
			{ latitude: 55.752849, longitude: 37.666545 },
		]);
		if(isInPlace){
			user.update({visitedAt: new Date().getTime()})
			// await ctx.reply(`Ваши координаты: ${ctx.editedMessage.location.latitude} ${ctx.editedMessage.location.longitude}`)
			await ctx.reply(`
		Отлично! Ты в игре 😈 \n
Твой уникальный номер: ${user.id}\n

Вся информация о конкурсе, призовом фонде, временем розыгрыша и порядке получения призов на кнопке [РОЗЫГРЫШ]\n

Желаем удачи и приятного просмотра!😏`);
		}else{
			ctx.reply('Подойди ближе к месту и зайди внутрь')
		}

	}else{
		const visitedAt = new Date(user.visitedAt).getTime();
		const timeNow = new Date().getTime();
		// console.log(visitedAt -  timeNow)

		if(!user.isMessaged){
			await ctx.reply(`Ты уже участвуешь! Твой номер #${user.id}. Можешь оставить трансляцию!!`)
		}
		await user.update({isMessaged: true})
	}

})

// bot.on('location', async (ctx) => {
// 	console.log(ctx.update.message)
// 	const user = ctx.state.user
// 	if (!user.visitedAt) {
// 		await ctx.reply('Ожидаем живую локацию')
// 	}
// })


// const welcomeScene = new Scene('welcomeScene');
const lotteryStr = '💰Розыгрыш'
const contactsStr = '📞Контакты'
const startStr = 'ℹ️Info'
const buttons = [
	[lotteryStr, contactsStr],
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


	/*
	reply_markup: {
			keyboard: buttons,
			resize_keyboard: true
		},

		parse_mode: 'HTML'
	 */

	// Markup.keyboard(buttons).resize().extra()

}
bot.start(onStart)

bot.command('reset', async ctx=>{
	const user = ctx.state.user
	await user.destroy()
	await ctx.reply('Пользователь сброшен.')
})

bot.hears(startStr, onStart)

bot.hears(lotteryStr, async ctx => {
	await ctx.reply(`🎁Призовой фонд:

1️⃣. Сет 15 минут каталки с обучением на WakeSurf в любой день от WakeTime
2️⃣. Сет 15 минут каталки с обучением на WakeSurf в любой день от WakeTime
3️⃣️. Сертификат на скидку 20% в WakeTime
4️⃣. Сертификат на скидку 20% в WakeTime
5️⃣. Сертификат на скидку 20% в WakeTime

✋ Пять️ призовых мест❗️💥💥💥💥💥

Розыгрыш будет произведен случайным выбором нескольких гостей среди зарегистрировавшихся в розыгрыше.`, {
		reply_markup: {
			keyboard: buttons,
			resize_keyboard: true
		},

		parse_mode: 'HTML'
	})
})

bot.hears(contactsStr, async ctx => {
	await ctx.reply(`Хочешь связаться с нами?!

Контакты Rave Community:

<a href="https://www.facebook.com/weareravecom/">Facebook</a>

<a href="https://instagram.com/rave_com">Instagram</a>

Тел: +7 962 956 50 00 Успен
Тел: +7 916 414 97 59 Сокол

@RavecomSPB - наш чат
`, {
		reply_markup: {
			keyboard: buttons,
			resize_keyboard: true
		},
		parse_mode: 'HTML'
	})
})


bot.launch().then(data => {
	console.log("bot started")
})
