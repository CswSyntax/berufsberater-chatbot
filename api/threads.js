import OpenAI from 'openai';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);
    return res.status(200).json({ threadId: thread.id });
  } catch (error) {
    console.error('Error creating thread:', error.message);
    return res.status(500).json({ error: 'Failed to create thread', details: error.message });
  }
}
