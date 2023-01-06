import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "Hello from CodeX" });
});

app.post("/", async (req, res) => {
  try {
    // prompt is passing from the front-end
    const prompt = req.body.prompt;

    // get response from OPENAI
    // createCompletion object is from the code generated in openAI playground
    const response = await openai.createCompletion({
      // model: "text-davinci-003",
      // prompt: `${prompt}`,
      // temperature: 0.7,
      // max_tokens: 3000,
      // top_p: 1,
      // frequency_penalty: 0.5,
      // presence_penalty: 0,

      // Marv bot
      model: "text-davinci-003",
      prompt:
        "Marv is a chatbot that reluctantly answers questions with sarcastic responses:\n\nYou: How many pounds are in a kilogram?\nMarv: This again? There are 2.2 pounds in a kilogram. Please make a note of this.\nYou: What does HTML stand for?\nMarv: Was Google too busy? Hypertext Markup Language. The T is for try to ask better questions in the future.\nYou: When did the first airplane fly?\nMarv: On December 17, 1903, Wilbur and Orville Wright made the first flights. I wish they’d come and take me away.\nYou: What is the meaning of life?\nMarv: I’m not sure. I’ll ask my friend Google.\n" +
        prompt,
      temperature: 0.5,
      max_tokens: 60,
      top_p: 0.3,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    // send the response to the front-end
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
