const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const axios = require('axios');

async function createTask(name) {
  const listId = '174903119';
  try {
    const response = await axios.post(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      {
        name: `Contato Whatsapp ${name}`,
        description: 'Novo contato via Whatsapp',
        markdown_description: 'Novo contato via Whatsapp',
        assignees: [183],
        tags: ['tag name 1'],
        status: 'Open',
        priority: 3,
        due_date: 1508369194377,
        due_date_time: false,
        time_estimate: 8640000,
        start_date: 1567780450202,
        start_date_time: false,
        notify_all: true,
        parent: null,
        links_to: null,
        check_required_custom_fields: true
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'pk_43083189_YASPV3P82VGIFOZM5A48TVGORJYTP708'
        }
      }
    );
  
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response);
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

    if (message.body === 'Olá Adbat, quero saber mais.') {
        await client.sendMessage(message.from, `Olá ${name}! 👋 Estamos empolgados em compartilhar as últimas inovações em soluções tecnológicas que podem transformar o seu negócio. 💻✨ Descubra como podemos impulsionar a eficiência, aumentar a produtividade e melhorar a experiência do usuário. 🚀 Vamos começar?`);
        await createTask(name)
    }
});

client.initialize();
