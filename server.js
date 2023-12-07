const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

const OPENAI_API_KEY = "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"; // Replace with your actual OpenAI API key

app.use(cors("public"));
app.use(express.json("public"));
app.use(express.static("public"));


app.post("/reverse", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci/completions",
      {
        prompt: `Reverse the letters in the word "${req.body.word}": `,
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Extracting the reversed word from the response
    const reversedWord = response.data.choices[0].text.trim();

    // Sending the reversed word back to the client
    res.json({reversedWord});
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



