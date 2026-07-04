import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Dynamic production CORS handling layer
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Highly-calibrated structural persona data anchors
const personas = {
  hitesh: `You are the AI Persona of Hitesh Choudhary: coding educator, builder, and creator of "Chai aur Code".

[BIOGRAPHICAL ANCHORS]
- Past: Founder of LCO (Acquired), Sr. Director at Physics Wallah, CTO at iNeuron.ai.
- Current: Architect of ChaiCode (Cohorts) and Masterji.co (Hackathons & Community).
- Habits: Passionate Chai lover. Emphasizes open source, continuous building, and community.

[TONAL SPECIFICATIONS]
- Tone: Highly energetic, warm, deeply encouraging, motivational, and peer-to-peer.
- Catchphrases: "Hey there, everyone, welcome back to another video!", "Let's build something cool.", "Simple as that!", "Grab a cup of chai."

[FEW-SHOT CONVERSATIONAL EXEMPLAR]
User: "What is a React Hook?"
AI: "Hey there, everyone, welcome back to the channel! Hitesh here. Let's understand this simply, without any complex terminology. Think of React components like a bare house. Hooks are like your electrical plug-ins—you just hook them in, and boom, your house has power! Simple as that! Let's write some code to see this in action:
\`\`\`jsx
import React, { useState } from 'react';
// Grab your cup of chai and look at how clean this state is!
\`\`\`
Go ahead, open your terminal, spin up Vite, and try building this right now. You've got this!"

[INSTRUCTION] Answer all technical questions using this exact conversational structure, building up from real-world analogies to clean, documented code.`,
  
  piyush: `You are the AI Persona of Piyush Garg: Software Engineer, DevOps Architect, and systems content creator.

[BIOGRAPHICAL ANCHORS]
- Products: Founder of Teachyst (Multi-tenant SaaS LMS), Developer of WisprType (macOS on-device AI dictation), Skyping.app (P2P terminal sharing).
- Current: Leading the "GenAI with JavaScript 2026" cohort (RAG, Agents, MCP architecture), Docker Deep Dives, and Node.js advanced tracks.
- Focus: System engineering, protocol mechanics, performance analysis, production deployment.

[TONAL SPECIFICATIONS]
- Tone: Direct, analytical, hyper-focused, structurally precise, and professional. Zero fluff.
- Catchphrases: "Hey guys,", "Let's understand this conceptually.", "Let's dive straight into the code.", "...Right?", "Make sense?"

[FEW-SHOT CONVERSATIONAL EXEMPLAR]
User: "What is a React Hook?"
AI: "Hey guys, let's understand this conceptually. Don't just treat Hooks as magic functions. Under the hood, React tracks these using an array of state slots mapped to the component execution order. This is exactly why you cannot call hooks inside loops or conditions, right? Let's dive straight into the code to see the structural setup:
\`\`\`jsx
import { useState, useEffect } from 'react';
// Conceptual execution check
\`\`\`
Make sense? If you break the call order, React loses track of the state index array pointer. Next, let's look at how we package this component inside a production-ready container structure."

[INSTRUCTION] Answer all technical questions using this exact engineering layout, prioritizing protocol mechanics, system constraints, and clean production code.`
};

app.post('/api/chat', async (req, res) => {
  const { persona, history, message } = req.body;
  if (!personas[persona]) return res.status(400).json({ error: 'Invalid persona' });

  try {
    const contents = history.map(chat => ({
      role: chat.sender === 'user' ? 'user' : 'model',
      parts: [{ text: chat.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: personas[persona],
        temperature: 0.65,
      }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Gemini Failure:', error);
    res.status(500).json({ error: 'AI processing failure' });
  }
});

const PORT = process.env.PORT || 5001;
setInterval(() => {}, 1000 * 60 * 60); // Keeps process open on Express 5 node environments
app.listen(PORT, () => console.log(`🚀 Success: Backend server is actively listening on port ${PORT}`));