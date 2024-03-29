import express, { response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import getOpenAiInstance from "./openAi.js";
const server = express();

import { errorHandler } from "./middleware/errorHandler.js";
import activityRoutes from "./routes/activityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
server.use(cors());
server.use(express.json());

server.use("/api/v1/activities", activityRoutes);
server.use("/api/v1/users", userRoutes);

server.post("/api/message", async (req, res) => {
  const openai = getOpenAiInstance();
  try {
    const userMessage = req.body.message;

    res.setHeader("Content-Type", "text/plain");

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: `reply with info how the activity ${userMessage} is useful to the society and the community`,
        },
        { role: "user", content: userMessage },
      ],
      // stream: true,
      // flush_interval: 1000,
    });

    for (const chunk of response.stream) {
      res.write(chunk.choices[0].message.content);
    }

    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// from pini

server.post("/generate-stream-text", async (req, res) => {
  const openai = getOpenAiInstance();
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      max_tokens: 100,
      messages: [
        {
          role: "system",
          content: `reply with info how the activity ${req.body.prompt} is useful to the society and the community`,
        },
        { role: "user", content: req.body.prompt },
      ],
      stream: false,
    });

    res.header("Content-Type", "text/plain");
    // for await (const chunk of stream) {
    //   const content = chunk.choices[0]?.delta?.content || "";
    //   res.write(content);
    // }
    // res.end();
    res.send(stream.choices[0].message.content);
  } catch (e) {
    res.status(500).send("Error generating stream text");
  }
});

server.use(errorHandler);

const PORT = process.env.PORT || 6000;

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server online at port ${PORT}`);
  });
});
