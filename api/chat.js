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

  // Check environment variables
  if (!process.env.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  if (!process.env.OPENAI_ASSISTANT_ID) {
    console.error('OPENAI_ASSISTANT_ID is not set');
    return res.status(500).json({ error: 'Server configuration error: Assistant ID missing' });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const ASSISTANT_ID = process.env.OPENAI_ASSISTANT_ID;

  try {
    // Parse body - handle both string and object
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
      }
    }

    const { threadId, message, fileIds } = body || {};

    console.log('Received request body type:', typeof req.body);
    console.log('Received request body:', JSON.stringify(req.body));
    console.log('Parsed body:', JSON.stringify(body));
    console.log('Extracted values:', { threadId, message: message?.substring(0, 50), fileIds });

    if (!threadId) {
      return res.status(400).json({
        error: 'threadId is required',
        debug: {
          bodyType: typeof req.body,
          bodyKeys: body ? Object.keys(body) : null,
          rawBody: typeof req.body === 'string' ? req.body.substring(0, 200) : null
        }
      });
    }

    if (!message) {
      return res.status(400).json({ error: 'message is required' });
    }

    // Validate threadId format
    if (!threadId.startsWith('thread_')) {
      return res.status(400).json({ error: 'Invalid threadId format' });
    }

    // Prepare message content
    const messageContent = [{ type: 'text', text: message }];

    // Add file attachments if present
    const attachments = fileIds?.length > 0
      ? fileIds.map(fileId => ({ file_id: fileId, tools: [{ type: 'file_search' }] }))
      : [];

    // Add message to thread
    console.log('Adding message to thread:', threadId);
    await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: messageContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    // Run the assistant
    console.log('Creating run with assistant:', ASSISTANT_ID);
    const run = await openai.beta.threads.runs.create(threadId, {
      assistant_id: ASSISTANT_ID,
    });

    console.log('Run created:', { runId: run.id, threadId: threadId, status: run.status });

    // Poll for completion with timeout
    let runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
    let attempts = 0;
    const maxAttempts = 60; // 60 seconds timeout

    while (runStatus.status !== 'completed' && runStatus.status !== 'failed' && runStatus.status !== 'cancelled') {
      if (attempts >= maxAttempts) {
        throw new Error('Request timeout - assistant took too long to respond');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      runStatus = await openai.beta.threads.runs.retrieve(threadId, run.id);
      attempts++;

      console.log('Run status:', runStatus.status, 'attempt:', attempts);

      if (runStatus.status === 'requires_action') {
        console.log('Run requires action:', runStatus.required_action);
      }
    }

    if (runStatus.status === 'failed') {
      console.error('Run failed:', runStatus.last_error);
      throw new Error(`Assistant run failed: ${runStatus.last_error?.message || 'Unknown error'}`);
    }

    if (runStatus.status === 'cancelled') {
      throw new Error('Assistant run was cancelled');
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

    console.log('Response generated successfully');

    return res.status(200).json({
      message: textContent,
      messageId: assistantMessage.id,
    });
  } catch (error) {
    console.error('Error in chat:', error.message, error.stack);
    return res.status(500).json({
      error: 'Failed to process message',
      details: error.message
    });
  }
}
