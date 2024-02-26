const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const OpenAI =  require("openai");

const openai = new OpenAI({apiKey: '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'});

async function askToGPT(question) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: question }],
    model: "gpt-3.5-turbo",
    max_tokens: 30,
    temperature: 0.5
  });

  const response = completion.choices[0].message.content

  if(response) {
    console.log(response)
    return response;
  } else {
    return 'erro ao enviar mensagem.'
  }
}

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', async (message) => {
    const contact = message.getContact()
    const name = (await contact).pushname
    const number = (await contact).number

    if(number === '5512992504013') {
        const response = await askToGPT(message.body)
        await client.sendMessage(message.from, `GPT: ${response}`);
    }

    // if (message.body === 'Olá Adbat, quero saber mais.') {
    //     await client.sendMessage(message.from, `Olá ${name}! 👋 Estamos empolgados em compartilhar as últimas inovações em soluções tecnológicas que podem transformar o seu negócio. 💻✨ Descubra como podemos impulsionar a eficiência, aumentar a produtividade e melhorar a experiência do usuário. 🚀 Vamos começar?`);
    // }
});

client.initialize();
