const express = require("express");
const router = express.Router();
const axios = require("axios");

console.log("ENV DEBUG_NO_OPENAI =", process.env.DEBUG_NO_OPENAI, "OPENAI_API_KEY present =", !!process.env.OPENAI_API_KEY);

// quick ping to verify mount
router.get("/ping", (req, res) => {
  res.json({ ok: true, route: "/api/parse/ping" });
});

router.post("/", async (req, res) => {
  try {

    const { transcript } = req.body;
    if (!transcript || typeof transcript !== "string" || !transcript.trim()) {
      return res.status(400).json({ error: "transcript is required" });
    }

    // log whether API key is present (do NOT log the key)
    const hasKey = !!process.env.OPENAI_API_KEY;

    // debug bypass to avoid calling OpenAI while testing
    if (process.env.DEBUG_NO_OPENAI === "1") {
      const mock = {
        title: transcript.slice(0, 50),
        description: transcript,
        priority: null,
        status: "todo",
        dueDate: null,
      };
      return res.json(mock);
    }

    if (!hasKey) {
      console.error("OPENAI_API_KEY is not set");
      return res.status(500).json({ error: "Server misconfiguration: missing OPENAI_API_KEY" });
    }

    const prompt = `
      You are a JSON extractor. Extract task details from the sentence below and output ONLY a single valid JSON object with fields:
      title (string|null), description (string|null), priority (one of ["low","medium","high"] or null), status (one of ["todo","in-progress","done"] or null), dueDate (ISO date string or null).
      If a field is missing, set it to null. Do not add any commentary or surrounding text.

      Sentence: "${transcript}"
    `;


    // wrap OpenAI call to log axios errors with details
    let response;
    try {
      response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          timeout: 60000,
        }
      );
    } catch (axiosErr) {
      // log full error for debugging (do NOT log your api key)
      console.error("OpenAI request failed:", {
        message: axiosErr.message,
        code: axiosErr.code,
        status: axiosErr.response?.status,
        responseData: axiosErr.response?.data,
      });

      const providerData = axiosErr.response?.data;
      // choose an appropriate status
      let outStatus = 502; // default upstream failure
      if (axiosErr.response?.status) outStatus = axiosErr.response.status;
      if (providerData?.error?.type === "insufficient_quota") outStatus = 402; // payment required / quota

      return res.status(outStatus).json({
        error: "OpenAI request failed",
        details: providerData ?? axiosErr.message,
      });
    }

    const choice = response.data?.choices?.[0];
    const raw = choice?.message?.content ?? choice?.text;
    if (!raw) {
      console.error("OpenAI returned no content:", response.data);
      return res.status(502).json({ error: "No content from language model" });
    }

    // Try strict JSON.parse first, then fall back to extracting JSON-like substring.
    let parsed = null;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      const cleaned = raw.replace(/```json|```/g, "").trim();
      try {
        parsed = JSON.parse(cleaned);
      } catch (err2) {
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          try {
            parsed = JSON.parse(jsonMatch[0]);
          } catch (err3) {
            console.error("Failed to parse extracted JSON block:", err3);
          }
        }
      }
    }

    if (!parsed) {
      console.error("Failed to parse model output. Raw output:", raw);
      return res.status(502).json({ error: "Model returned unparsable output", raw });
    }

    const normalize = (obj) => ({
      title: obj.title ?? null,
      description: obj.description ?? null,
      priority: obj.priority ?? null,
      status: obj.status ?? null,
      dueDate: obj.dueDate ?? null,
    });

    res.json(normalize(parsed));
  } catch (err) {
    console.error("Parse route error:", err.response?.data ?? err.stack ?? err.message ?? err);
    res.status(500).json({ error: "Parsing failed" });
  }
});

module.exports = router;