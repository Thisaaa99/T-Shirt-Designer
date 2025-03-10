const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const axios = require("axios");
// require("dotenv").config(); // Load API key from .env file

// const app = express();
// const port = 5000;

const path = require("path");
require("dotenv").config(); // Load API key from .env file

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve "main.html" at root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "main.html"));
});

// ✅ Serve "aiPage.html" at "/aiPage"
app.get("/aiPage", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "aiPage.html"));
});


app.use(cors());
app.use(bodyParser.json());

app.post("/generate-image", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }

        const response = await axios.post("https://api.deepai.org/api/text2img", {
            text: prompt
        }, {
            headers: { "Api-Key": process.env.DEEPAI_API_KEY }
        });

        res.json({ imageUrl: response.data.output_url });

    } catch (error) {
        console.error("Error generating image:", error.message);
        res.status(500).json({ error: "Failed to generate image", details: error.message });
    }
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
