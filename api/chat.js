import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

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

  try {
    const { threadId, message, fileIds } = req.body;

    if (!threadId || !message) {
      return res.status(400).json({ error: 'threadId and message are required' });
    }

    // Prepare message content
    const messageContent = [{ type: 'text', text: message }];

    // Add file attachments if present
    const attachments = fileIds?.length > 0
      ? fileIds.map(fileId => ({ file_id: fileId, tools: [{ type: 'file_search' }] }))
      : [];

    // Add message to thread
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: messageContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Run the assistant
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    // Poll for completion
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

    while (runStatus.status !== 'completed' && runStatus.status !== 'failed') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);

      if (runStatus.status === 'failed') {
        throw new Error('Assistant run failed');
      }
    }

    // Get the assistant's response
    const messages = await openai.beta.threads.messages.list(threadId, {
      order: 'desc',
      limit: 1,
    });

    const assistantMessage = messages.data[0];

    if (!assistantMessage || assistantMessage.role !== 'assistant') {
      throw new Error('No assistant response found');
    }

    // Extract text content
    const textContent = assistantMessage.content
      .filter(c => c.type === 'text')
      .map(c => c.text.value)
      .join('\n');

    return res.status(200).json({
      message: textContent,
      messageId: assistantMessage.id,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    return res.status(500).json({ error: 'Failed to process message' });
  }
}
