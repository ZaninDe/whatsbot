const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

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

    async function firstQuestion() {
        await client.sendMessage(message.from, 'Para direcionarmos melhor nossas soluções tecnológicas às suas necessidades, por favor, escolha o número que mais se aproxima do seu nicho de atuação:');
        await client.sendMessage(message.from, `
        1. Tecnologia da Informação 
        2. Saúde 
        3. Educação 
        4. Finanças 
        5. Comércio Eletrônico 
        6. Manufatura 
        7. Serviços Profissionais`);
    }

    if (message.body === 'Olá Adbat, quero saber mais.') {
        await client.sendMessage(message.from, `Olá ${name}! 👋 Estamos empolgados em compartilhar as últimas inovações em soluções tecnológicas que podem transformar o seu negócio. 💻✨ Descubra como podemos impulsionar a eficiência, aumentar a produtividade e melhorar a experiência do usuário. 🚀 Vamos começar?`);

        await new Promise(resolve => setTimeout(resolve, 2000));
        await firstQuestion()
    }

    if (message.body === '2') {
        await client.sendMessage(message.from, `Certo ${name}! Sobre a área da saúde, qual dor seu produto/serviço resolve para seus clientes?`);
    }
});

client.initialize();
