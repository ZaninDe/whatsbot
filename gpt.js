const OpenAI =  require("openai");

const openai = new OpenAI({apiKey: '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'});

async function askToGPT(question) {
    console.log(question)
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: question }],
    model: "gpt-3.5-turbo",
    max_tokens: 20,
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

askToGPT('quem é você?')