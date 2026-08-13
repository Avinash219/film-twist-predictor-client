import Anthropic from '@anthropic-ai/sdk';
import { NextRequest } from "next/server";

const client = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'], // This is the default and can be omitted
});

export async function POST (_req : NextRequest) {
    const {filmInput} = await _req.json()
    try {
         const stream =  client.messages.stream({
    max_tokens: 1024,
    messages: [{ content: filmInput, role: 'user' }],
    model: 'claude-sonnet-4-6',
    stream : true,
    system : '"You are a film twist analyst. Given a film name or plot description, analyze the twist, explain why it works psychologically, and predict possible twists if not known."'
    });
    
    const readableStream = new ReadableStream({
        async start(controller) {
            for await (const event of stream) {
                if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
                    controller.enqueue(new TextEncoder().encode(event.delta.text))
                }
            }
            controller.close()
        }
    })

    return new Response(readableStream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })

   
    }
    catch(error) {
        console.error('Anthropic error:', error)
    }
    
}