import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
const basePromptPrefix = `Write me a detailed about a topic with the title below.
Title:
`;
const generateAction = async (req, res) => {
 
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt=
  `  Take the details and title of the topic  below and generate a brief explanation about it.Further explain it well in cat way and Also use "Meow" wherever required.
  
  Title: ${req.body.userInput}
  Table of Contents:${basePromptOutput.text}
  Story:
`
  const secondCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.85,
    max_tokens: 1250,
  });

  const secondPromptOutput = secondCompletion.data.choices.pop();
  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;